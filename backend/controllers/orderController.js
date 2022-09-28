const Order = require("../models/orderModel.js");

const createOrder = (body) => {
  const newOrder = new Order({
    orderItems: body.orderItems?.map((x) => ({ ...x, product: x._id })),
    id: body.id,
    name: body.name,
    email: body.email,
    address: body.address,
    phone: body.phone,
    sellerId: body.sellerId,
    itemsPrice: body.itemsPrice,
    taxPrice: body.taxPrice,
    totalPrice: body.totalPrice,
  });
  const order = newOrder.save();
  return order;
};

const ordersById = (id) => {
  const orders = Order.find({ id: id });
  return orders;
};

const orderById = (id) => {
  const orders = Order.findById(id);
  return orders;
};

const orderByIdMine = (id) => {
  const orders = Order.find({ sellerId: id });
  return orders;
};
module.exports = {
  createOrder,
  ordersById,
  orderById,
  orderByIdMine,
};