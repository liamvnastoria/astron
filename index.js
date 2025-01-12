// Importation des modules nécessaires
const { Client, Intents } = require('discord.js'); // Client Discord
const express = require('express');               // Serveur web Express
const dotenv = require('dotenv');                // Gestion des variables d'environnement

// Chargement des variables d'environnement à partir du fichier .env
dotenv.config();

// Initialisation du client Discord
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS, // Pour gérer les serveurs Discord
        Intents.FLAGS.GUILD_MESSAGES, // Pour lire les messages
        Intents.FLAGS.DIRECT_MESSAGES, // Pour gérer les messages directs
    ],
});

// Initialisation du serveur Express
const app = express();

// Définir le port d'écoute pour le serveur Express
const port = process.env.PORT || 3000; // Utiliser le port défini dans .env ou 3000 par défaut

// Route simple pour tester que le serveur fonctionne
app.get('/', (req, res) => {
    res.send('Astron Bot is running!');
});

// Lancer le serveur Express
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// Événement déclenché lorsque le bot se connecte avec succès à Discord
client.once('ready', () => {
    console.log('Astron Bot is online and ready!');
});

// Gérer les messages envoyés dans les serveurs
client.on('messageCreate', (message) => {
    if (message.content === '!ping') {
        message.channel.send('Pong!');
    }
});

// Connexion à Discord avec votre token
client.login(process.env.DISCORD_TOKEN)
    .then(() => {
        console.log('Connected to Discord!');
    })
    .catch((err) => {
        console.error('Failed to connect to Discord:', err);
    });