const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const ind = require("./routes/index.js");
const session = require("express-session");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;

const { Client, Tools, User, Category, Order } = require("./db.js");

const db = require("./db.js");

passport.use(
  new Strategy(function (username, password, done, info) {
    db.User.findOne({ where: { username } })
      .then((user) => {
        if (!user) {
          console.log("NO ENCUENTRA EL USUARIO");
          return done(null, false);
        }
        if (user.password !== password) {
          console.log("NO PASA LA CONTRASEÑA");
          return done(null, false);
        }
        console.log("ENCUENTRA EL USUARIO", user.dataValues);
        return done(null, user.dataValues);
      })
      .catch((err) => {
        return done(err);
      });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findOne({ where: { id } })
    .then((user) => {
      done(null, user.dataValues);
    })
    .catch((err) => {
      return done(err);
    });
});

const server = express();

server.use(
  require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next) => {
  console.log("Session! ", req.session);
  console.log("User!", req.user);
  next();
});

server.use("/", ind);

server.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send(user);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.send(user);
    });
  })(req, res, next);
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send("0");
  }
}

server.get("/login", isAuthenticated, (req, res) => {
  res.send(req.user);
});

server.get("/logout", (req, res) => {
  req.logout();
  res.send("Usuario Desconectado");
});

//-------------------------------------------------------------------------------------------

///////// HARDCOD CLIENTES //////

server.post("/registerhd", (req, res) => {
  const client1 = {
    name: "Cesar",
    lastname: "Sanchez",
    dni: 38272939,
    email: "asd8@gmail.com",
  };

  Client.create(client1);

  const client2 = {
    name: "Facundo",
    lastname: "Sadava",
    dni: 38272939,
    email: "asd7@gmail.com",
  };

  Client.create(client2);

  const client3 = {
    name: "Alex",
    lastname: "Velazquez",
    dni: 38272939,
    email: "asd6@gmail.com",
  };

  Client.create(client3);

  const client4 = {
    name: "Leonel",
    lastname: "Messi",
    dni: 38272939,
    email: "asd5@gmail.com",
  };

  Client.create(client4);

  const client5 = {
    name: "Sergio",
    lastname: "Aguero",
    dni: 38272939,
    email: "asd4@gmail.com",
  };

  Client.create(client5);

  const client6 = {
    name: "Diego",
    lastname: "Acosta",
    dni: 38272939,
    email: "asd3@gmail.com",
  };

  Client.create(client6);

  const client7 = {
    name: "Andrea",
    lastname: "Anderson",
    dni: 38272939,
    email: "asd2@gmail.com",
  };

  Client.create(client7);

  const client8 = {
    name: "Carola",
    lastname: "Bianco",
    dni: 38272939,
    email: "asd1@gmail.com",
  };

  Client.create(client8);

  //////// carga CATEGORY //////

  Category.create({ name: "CARPINTERIA" });
  Category.create({ name: "HERRERIA" });
  Category.create({ name: "ALBAÑILERIA" });
  Category.create({ name: "ELECTRICIDAD" });
  Category.create({ name: "OBRAS VARIAS" });

  //////// carga Tools //////
  const tool1 = {
    name: "Martillo",
    stock: 43,
    stocktotal: 43,
    categoryId: 1,
  };
  Tools.create(tool1);

  const tool2 = {
    name: "Trompito",
    stock: 35,
    stocktotal: 35,
    categoryId: 2,
  };
  Tools.create(tool2);

  const tool3 = {
    name: "Andamios",
    stock: 82,
    stocktotal: 82,
    categoryId: 3,
  };
  Tools.create(tool3);

  const tool4 = {
    name: "Amoladora",
    stock: 10,
    stocktotal: 10,
    categoryId: 4,
  };
  Tools.create(tool4);

  const user1 = {
    username: "admin",
    password: "admin",
  };
  User.create(user1);

  //////// carga Orders //////
  const orders1 = {
    dateA: "2020-11-17",
    days: "10",
    tool: "Martillo",
    commentA: "marca X",
    price: "100",
    cant: "2",
    clientId: 1,
  };
  Order.create(orders1);

  const orders2 = {
    dateA: "2020-11-11",
    days: "15",
    tool: "Andamio",
    commentA: "marca X",
    price: "500",
    cant: "6",
    clientId: 3,
  };
  Order.create(orders2);

  res.send("Carga Ok! -> TOOLS, CLIENTS, CATEGORYS");
});

module.exports = server;
