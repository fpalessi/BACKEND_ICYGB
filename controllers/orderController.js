// const Order = require("../models/Order");

// // CREATE ORDER
// // Any user can create its own order
// const createOrder = async (req, res) => {
//   const newOrder = new Order(req.body);

//   try {
//     const savedOrder = await newOrder.save();
//     res.status(200).json(savedOrder);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// // GET USER ORDERS
// // !user verification only
// const getUserOrders = async (req, res) => {
//   try {
//     // .findOne() bc every user has just one Cart
//     // in this case .find() bc user can have more than one order
//     const orders = await Cart.find({ userId: req.params.userId });
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// module.exports = {
//   createOrder,
//   getUserOrders,
// };
