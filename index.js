const express = require('express');

const port = 8000;
const env = process.env.NODE_ENV || 'development';
const app = express();

app.get('/', (request, response) => {
    response.send({msg: "Test"})
});

app.listen(port, '127.0.0.1', () => {
    console.log(`Server is listening on http://127.0.0.1:${port} in ${env} mode`)
});
