const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(bodyParser.json());

// Crear base de datos SQLite (puede ser PostgreSQL/MySQL en producción)
const db = new sqlite3.Database('petagram.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS usuario_instagram (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_dispositivo TEXT NOT NULL,
        id_usuario_instagram TEXT NOT NULL
    )`);
});

// Endpoint para registrar usuario
app.post('/registrar-usuario', (req, res) => {
    const { id_dispositivo, id_usuario_instagram } = req.body;
    if(!id_dispositivo || !id_usuario_instagram){
        return res.status(400).json({error: 'Faltan parámetros'});
    }
    const stmt = db.prepare("INSERT INTO usuario_instagram (id_dispositivo, id_usuario_instagram) VALUES (?, ?)");
    stmt.run(id_dispositivo, id_usuario_instagram, function(err){
        if(err){
            return res.status(500).json({error: err.message});
        }
        res.json({success: true, id: this.lastID});
    });
    stmt.finalize();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
