const express = require('express');

const port = 8000;
const env = process.env.NODE_ENV || 'development';
const app = express();
app.use(express.json());

const db = [

];

app.get('/', (request, response) => {
    response.send({msg: "Test"})
});

app.post('/recipes', (req, res) => {
    const {ingredient, prepTime} = req.body;
    // const {title, author} = req.body;
    const recipe = {ingredient, prepTime};
    db.push(recipe);
    res.status(201).send(recipe);
})

app.get('/recipes', (req, res) => {
    res.send(db);
});

app.listen(port, '127.0.0.1', () => {
    console.log(`Server is listening on http://127.0.0.1:${port} in ${env} mode`)
});
