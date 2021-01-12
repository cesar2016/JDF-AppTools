const server = require('express').Router();
const { Category } = require('../db.js');

////////////////////////////
//    		/category	////
////////////////////////////

server.post('/', (req, res) => {
    Category.create(req.body)
    .then(cat => res.send(cat))
    .catch(err => console.log(err))
})

server.get('/', (req, res) => {
    Category.findAll()
    .then(cat => res.send(cat).status(200))
    .catch(err => console.log(err))
})

server.delete('/:id', (req, res) => {
    Category.findOne({
        where: {
            id: req.params.id
        }
    }).then(cat => {
        var aux = cat
        cat.destroy()
        res.send(aux)
    })
    .catch(err => console.log(err))
})

module.exports = server;