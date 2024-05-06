const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'villainsbt',
    password: 'ds564',
    port: 5432,
});

app.get('/villains', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM villains');
        res.status(200).json({
            total: result.rowsCount,
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
        } else {
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
