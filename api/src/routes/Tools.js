const server = require("express").Router();
const e = require("express");
const { Tools, Category } = require("../db.js");

//**************************************
//|                T O O L S           |
//|                                    |
//**************************************
server.get("/", (req, res, next) => {
  Tools.findAll()
    .then((tools) => {
      res.send(tools);
    })
    .catch((err) => console.log(err));
});

server.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Tools.findOne({ where: { id } })
    .then((tool) => {
      res.send(tool);
    })
    .catch(next);
});

server.post("/insertTools", (req, res, next) => {
  console.log('a ver qu etool viene ',req.body)
  Tools.create(req.body).then((date) => {
    res.send(date);
  });
});

server.put("/update/:id", (req, res, next) => {
  const { name, description, stock, stocktotal, categoryId, orderId } = req.body;
  console.log(name, description, stock, categoryId, orderId)
  Tools.findOne({ where: { id: req.params.id } })
    .then((tools) => {
      tools.update({
        name,
        description,
        stocktotal,
        stock,
        categoryId,
        orderId
      });
      return tools;
    })
    .then((tools) => {
      res.send(tools);
    })
    .catch((err) => {
      console.log("este es el error", err);
      return err;
    });
});

server.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  Tools.destroy({ where: { id } })
    .then((result) => {
      //res.send(result)
      res.sendStatus(200);
    })
    .catch(() => res.status(404));
});

//**************************************
//|                CATEGORIES          |
//|                                    |
//**************************************
server.post("/insertCategory", (req, res, next) => {
  console.log(req.body);
  const { nameCategory } = req.body;

  Category.create({ name: nameCategory }).then((date) => {
    res.send(date);
  });
});

server.get("/category", (req, res, next) => {
  Category.findAll()
    .then((categorys) => {
      res.send(categorys);
    })
    .catch((err) => console.log(err));
});

module.exports = server;
