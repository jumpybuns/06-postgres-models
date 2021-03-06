const express = require('express');
const Hamburger = require('./models/Hamburgers.js');
const app = express();

app.use(express.json());

app.post('/api/hamburger', (req, res) => {
  Hamburger
    .insert(req.body)
    .then(hamburger => res.send(hamburger));
});

app.get('/api/hamburger', (req, res) => {
  Hamburger
    .find()
    .then(hamburger => res.send(hamburger));
});

app.get('/api/hamburger/:id', (req, res) => {
  Hamburger
    .findById(req.params.id)
    .then(hamburger => res.send(hamburger));
});

app.put('/api/hamburger/:id', (req, res) => {
  Hamburger
    .update(req.params.id, req.body)
    .then(hamburger => res.send(hamburger));
});

app.delete('/api/hamburger/:id', (req, res) => {
  Hamburger
    .delete(req.params.id)
    .then(hamburger => res.send(hamburger));
});

module.exports = app ;
