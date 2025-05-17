const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Fungsi untuk membaca data dari file JSON
const readData = () => {
    const data = fs.readFileSync('./data.json');
    return JSON.parse(data);
};

// Fungsi untuk menulis data ke file JSON
const writeData = (data) => {
    fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
};

// API untuk mendapatkan seluruh data
app.get('/api/users', (req, res) => {
    const users = readData();
    res.json(users);
});

// API untuk menambah data baru
app.post('/api/users', (req, res) => {
    const users = readData();
    const newUser = { id: Date.now(), ...req.body };
    users.push(newUser);
    writeData(users);
    res.status(201).json(newUser);
});

// API untuk menghapus data
app.delete('/api/users/:id', (req, res) => {
    const users = readData();
    const updatedUsers = users.filter(user => user.id !== parseInt(req.params.id));
    writeData(updatedUsers);
    res.status(204).send();
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
