const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3333;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'villainsbt',
    password: 'ds564',
    port: 5432,
});

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Villains API' });
});

app.get('/villains', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM villains');
        res.status(200).json({
            total: result.rowCount,
            villains: result.rows,
        });
    } catch (error) {
        console.error("Cannot get villains", error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/villains/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM villains WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Villain not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error("Cannot get this villain", error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/villains/name/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const result = await pool.query('SELECT * FROM villains WHERE name = $1', [name]);
        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Villain not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error("Cannot get this villain", error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/villains', async (req, res) => {
        let { name, power, damage, level, hp } = req.body;
        name = name.toLowerCase();
        power = power.toLowerCase();
        const query = 'INSERT INTO villains (name, power, damage, level, hp) VALUES ($1, $2, $3, $4, $5)';
        const values = [name, power, damage, level, hp];
        try {
        if (!name || !power || !damage || !level || !hp) {
            res.status(400).json({ error: 'Please provide all the fields' });
        } 
        if (damage < 0 || level < 0 || hp < 0) {
            res.status(400).json({ error: 'Please provide positive values for damage, level and hp' });
        }
        if (typeof name !== 'string' || typeof power !== 'string') {
            res.status(400).json({ error: 'Please provide a string for name and power' });
        }
        if (typeof damage !== 'number' || typeof level !== 'number' || typeof hp !== 'number') {
            res.status(400).json({ error: 'Please provide a number for damage, level and hp' });
        } 
        if (await pool.query('SELECT * FROM villains WHERE name = $1', [name]).rowCount > 0) {
            res.status(400).json({ error: 'This villain already exists' });
        }
        else {
        const result = await pool.query(query, values);
        res.status(201).json({ message: 'Villain created successfully', villain: result.rows[0] });
        }
        
    } catch (error) {
        console.error("Cannot create this villain", error);
        res.status(500).json({ error: error.message });
    }
}
);

app.put('/villains/:id', async (req, res) => {
    const { id } = req.params;
    let { name, power, damage, level, hp } = req.body;
    name = name.toLowerCase();
    power = power.toLowerCase();
    const query = 'UPDATE villains SET name = $1, power = $2, damage = $3, level = $4, hp = $5 WHERE id = $6';
    const values = [name, power, damage, level, hp, id];

    try {
        if (!name || !power || !damage || !level || !hp) {
            res.status(400).json({ error: 'Please provide all the fields' });
        } 
        if (damage < 0 || level < 0 || hp < 0) {
            res.status(400).json({ error: 'Please provide positive values for damage, level and hp' });
        }
        if (typeof name !== 'string' || typeof power !== 'string') {
            res.status(400).json({ error: 'Please provide a string for name and power' });
        }
        if (typeof damage !== 'number' || typeof level !== 'number' || typeof hp !== 'number') {
            res.status(400).json({ error: 'Please provide a number for damage, level and hp' });
        } else {
            const result = await pool.query(query, values);
            res.status(200).json({ message: 'Villain updated successfully', villain: result.rows[0] });
        }
    } catch (error) {
        console.error("Cannot update this villain", error);
        res.status(500).json({ error: error.message });
    }
}
);

app.delete('/villains/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM villains WHERE id = $1';
    const values = [id];
    try {
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Villain not found' });
        } else {
            res.status(200).json({ message: 'Villain deleted successfully', villain: result.rows[0] });
        }
    } catch (error) {
        console.error("Cannot delete this villain", error);
        res.status(500).json({ error: error.message });
    }
}
);

// CREATE TABLE IF NOT EXISTS battles (
//     id SERIAL PRIMARY KEY,
//     villain1_id INTEGER NOT NULL,
//     villain2_id INTEGER NOT NULL,
//     winner_id INTEGER NOT NULL,
//     FOREIGN KEY (villain1_id) REFERENCES villains(id),
//     FOREIGN KEY (villain2_id) REFERENCES villains(id),
//     FOREIGN KEY (winner_id) REFERENCES villains(id)
// );

// to win a battle, he villain with the highest power and level wins. The villain inflicting the most damage wins. The villain with more remaining hit points. If all three are the same, the first villain wins.
// also store the historical data of the battles in the battles table like victories and defeats. winner_id is the id of the villain who won the battle.

const battle = async (villain1_id, villain2_id) => {
    const villain1 = await pool.query('SELECT * FROM villains WHERE id = $1', [villain1_id]);
    const villain2 = await pool.query('SELECT * FROM villains WHERE id = $1', [villain2_id]);
    const power1 = villain1.rows[0].power;
    const power2 = villain2.rows[0].power;
    const level1 = villain1.rows[0].level;
    const level2 = villain2.rows[0].level;
    const damage1 = villain1.rows[0].damage;
    const damage2 = villain2.rows[0].damage;
    const hp1 = villain1.rows[0].hp;
    const hp2 = villain2.rows[0].hp;

    if (power1 > power2 && level1 > level2 && damage1 > damage2 && hp1 > hp2) {
        return villain1_id;
    } else if (power1 < power2 && level1 < level2 && damage1 < damage2 && hp1 < hp2) {
        return villain2_id;
    } else if (power1 === power2 && level1 === level2 && damage1 === damage2 && hp1 === hp2) {
        return villain1_id;
    } else if (power1 === power2 && level1 === level2 && damage1 === damage2 && hp1 < hp2) {
        return villain2_id;
    } else if (power1 === power2 && level1 === level2 && damage1 === damage2 && hp1 > hp2) {
        return villain1_id;
    } else if (power1 === power2 && level1 === level2 && damage1 < damage2 && hp1 === hp2) {
        return villain2_id;
    } else if (power1 === power2 && level1 === level2 && damage1 > damage2 && hp1 === hp2) {
        return villain1_id;
    } else if (power1 === power2 && level1 < level2 && damage1 === damage2 && hp1 === hp2) {
        return villain2_id;
    } else if (power1 === power2 && level1 > level2 && damage1 === damage2 && hp1 === hp2) {
        return villain1_id;
    } else if (power1 < power2 && level1 === level2 && damage1 === damage2 && hp1 === hp2) {
        return villain2_id;
    } else if (power1 > power2 && level1 === level2 && damage1 === damage2 && hp1 === hp2) {
        return villain1_id;
    } else if (villain1_id === villain2_id) {
        console.error("Cannot battle the same villain");
    } else {
        return null;
    }
}

app.post('/battles', async (req, res) => {
    const { villain1_id, villain2_id } = req.body;
    const winner_id = await battle(villain1_id, villain2_id);
    if (winner_id) {
        const query = 'INSERT INTO battles (villain1_id, villain2_id, winner_id) VALUES ($1, $2, $3)';
        const values = [villain1_id, villain2_id, winner_id];
        try {
            const result = await pool.query(query, values);
            res.status(201).json({ message: 'Battle created successfully', battle: result.rows[0] });
        } catch (error) {
            console.error("Cannot create this battle", error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: 'Cannot battle these villains' });
    }
});





app.listen(port, () => {
    console.log(`👻 Server is running on http://localhost:${port}`);
});