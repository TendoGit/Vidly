const Joi = require('joi');
const express =  require('express');
const app = express();

app.use(express.json());

const genres = [
    {id: 1, name: "Thriller"},
    {id: 1, name: "Sci-Fi"},
    {id: 1, name: "Romance"},
    {id: 1, name: "Other"}
]

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find( g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    
    res.send(genre);
});

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening on port ${port}...`));