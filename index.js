const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const fetch = require('node-fetch'); // Para consumir Instagram API
const app = express();

app.use(bodyParser.json());

// Base de datos
const db = new sqlite3.Database('petagram.db');

db.serialize(() => {
    // Tabla de likes
    db.run(`CREATE TABLE IF NOT EXISTS likes_instagram (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_foto_instagram TEXT NOT NULL,
        id_usuario_instagram TEXT NOT NULL,
        id_dispositivo TEXT NOT NULL
    )`);
});

// Endpoint para registrar un like
app.post('/registrar-like', async (req, res) => {
    const { id_foto_instagram, id_usuario_instagram, id_dispositivo, access_token } = req.body;

    if (!id_foto_instagram || !id_usuario_instagram || !id_dispositivo || !access_token){
        return res.status(400).json({error: 'Faltan parámetros'});
    }

    try {
        // 1️⃣ Dar like a la foto usando Instagram API
        const url = `https://api.instagram.com/v1/media/${id_foto_instagram}/likes?access_token=${access_token}`;
        const instaResponse = await fetch(url, { method: 'POST' });
        const instaData = await instaResponse.json();

        // 2️⃣ Guardar like en BD local
        const stmt = db.prepare("INSERT INTO likes_instagram (id_foto_instagram, id_usuario_instagram, id_dispositivo) VALUES (?, ?, ?)");
        stmt.run(id_foto_instagram, id_usuario_instagram, id_dispositivo);
        stmt.finalize();

        // 3️⃣ Enviar notificación FCM al dispositivo
        // (aquí se puede usar Firebase Admin SDK en Node.js)
        // Por simplicidad, solo mostramos mensaje
        console.log(`Enviar notificación a dispositivo ${id_dispositivo} de foto ${id_foto_instagram}`);

        res.json({success: true, instagram: instaData});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
