const express = require( 'express');
const {
  createOrder,
  ordersById,
  orderById,
  orderByIdMine,
} = require( "../controllers/orderController.js");


const OrderRouter = express.Router();

//Create Order
OrderRouter.post('/', async (req, res) => {
    const order = await createOrder(req.body);
    res.status(201).send({ message: 'New Order Created', order });
});

//Get my orders
OrderRouter.get('/mine/:id', async(req, res) => {

    const orders = await ordersById(req.params.id);
    res.send(orders);

});

//Get my One Order
OrderRouter.get('/:id', async (req, res) => {
    const order = await orderById(req.params.id);
      if (order) {
        res.send(order);
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    }
); 

//Get my orders
OrderRouter.get('/userorders/:id', async(req, res) => {

  const orders = await orderByIdMine(req.params.id);
  res.send(orders);

});

module.exports = OrderRouter;