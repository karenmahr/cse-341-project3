const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "My API",
        description: 'Teams API',
    },
    host: 'https://project3-rmss.onrender.com',
    schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);