CREATE TABLE IF NOT EXISTS villains (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    power TEXT NOT NULL,
    damage INTEGER NOT NULL,
    level INTEGER NOT NULL,
    hp INTEGER NOT NULL
);


CREATE TABLE IF NOT EXISTS battles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    villain1_id INTEGER NOT NULL,
    villain2_id INTEGER NOT NULL,
    winner_id INTEGER NOT NULL,
    FOREIGN KEY (villain1_id) REFERENCES villains(id),
    FOREIGN KEY (villain2_id) REFERENCES villains(id),
    FOREIGN KEY (winner_id) REFERENCES villains(id)
);    