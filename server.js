const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database(':memory:'); // In-memory database for simplicity

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Create a simple table
db.serialize(() => {
    db.run('CREATE TABLE users (name TEXT, age INTEGER, task TEXT)');
});

// Endpoint to add a new user
app.post('/api/users', (req, res) => {
    const { name, age, task } = req.body;
    db.run('INSERT INTO users (name, age, task) VALUES (?, ?, ?)', [name, age, task], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User added successfully!', id: this.lastID });
    });
});

// Endpoint to retrieve a user
app.get('/api/users', (req, res) => {
    const { name, age } = req.query;
    db.get('SELECT * FROM users WHERE name = ? AND age = ?', [name, age], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(row);
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
