const { MongoClient } = require('mongodb');

// PEGA TU CADENA DE MONGODB ATLAS AQUÍ DENTRO DE LAS COMILLAS
const uri = "mongodb+srv://karenmahr:mongo@cluster0.eh724ql.mongodb.net/project3?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("¡CONEXIÓN EXITOSA A MONGODB!");
    } catch (error) {
        console.error("Error al conectar:", error);
    } finally {
        await client.close();
    }
}
run();