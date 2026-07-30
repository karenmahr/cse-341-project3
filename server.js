require('dotenv').config();
const dns = require('node:dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const mongodb = require('./data/database.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', require('./routes/index.js'));
app.get('/', (req, res) => {
    res.send('Hello World');
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(PORT, () => {
            console.log(`Database is listening and node running on port ${PORT}`);
        });
    }
});