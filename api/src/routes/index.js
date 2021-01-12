const { Router } = require('express');
// import all routers;
const clientsRouter = require('./Clients.js');
const ordersRouter = require('./Order.js');
const toolsRouter = require('./Tools.js');
const categoryRouter = require('./Category.js');


const router = Router();


router.use('/clients', clientsRouter);
router.use('/orders', ordersRouter);
router.use('/tools', toolsRouter);
router.use('/category', categoryRouter);

module.exports = router;
