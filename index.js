const express = require('express');
const api = require('./src/api');

const port = process.env.PORT || 8000;
const env = process.env.NODE_ENV || 'development';
const app = express();

app.use(express.json());
app.use('/api', api);

app.listen(port, '127.0.0.1', () => {
    console.log(`Server is listening on http://127.0.0.1:${port} in ${env} mode`)
});
