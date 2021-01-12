const server = require('express').Router();
const { Order, Client, Category } = require('../db.js');

//POST --> Generar o buscar una order

server.post('/', (req, res, next) => {
  console.log("Lo que me llega como body es: ", req.body)
  Order.create(req.body)
      .then(data => {
        res.send(data)
    })
    .catch(err => console.log(err))
  }
)

//GET --> Obtiene todas las ordenes existentes
server.get('/', (req, res, next) => {
  
  Order.findAll({ include: Client })
  
    .then(order => {
        res.send(order);
    })
    .catch(err => console.log(err))
});

//GET --> Obtener una orden por su ID de cliente
server.get('/:id', (req, res, next) => {
  Order.findAll({
    where: {
      clientId: req.params.id
    }
  })
  .then(order => {
    res.send(order)
  })
  .catch(next)
})

//GET --> Obtener una orden por su ID de tools
server.get('/tool/:id', (req, res, next) => {
  console.log(req.params.id)
  Order.findAll({
    where: {
      tool: req.params.id
    }
  })
  .then(order => {
    res.send(order)
  })
  .catch(next)
})

server.put('/update/', (req, res, next) => {
 console.log('este es el bodyyy linea 53 order', req.body)
  //console.log(name, description, stock, categoryId)
  Order.findOne({where: {id: req.body.id}})
  .then(order => {
  order.update(req.body).then(value => res.sendStatus(200))
})
  .catch(err => {
      res.send(err)
  })
});

server.delete("/delete/:id", (req, res) => {
  
  console.log('entro aca linea +65 order', req.params)
	const { id } = req.params;
	Order.destroy({ where: { id } })
		.then(result => {
			res.sendStatus(200);
		})
		.catch((err) => res.status(404).send(err))
});

module.exports = server;