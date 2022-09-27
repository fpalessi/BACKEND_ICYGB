// const Cart = require("../models/Cart");

// // CREATE CART
// // Any user can create its own cart
// const createCart = async (req, res) => {
//   const newCart = new Cart(req.body);

//   try {
//     const savedCart = await newCart.save();
//     res.status(200).json(savedCart);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
// // UPDATE CART, NEED MIDDLEWARE AUTH BECAUSE I CAN ONLY UPDATE MY OWN CART
// const updateCart = async (req, res) => {
//   try {
//     const updatedCart = await Cart.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     res.status(200).json(updatedCart);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// // DELETE CART, NEED MIDDLEWARE BC I CAN ONLY DELETE MY OWN CART
// const deleteCart = async (req, res) => {
//   try {
//     await Cart.findByIdAndDelete(req.params.id);
//     res.status(200).json("El producto se ha eliminado");
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// // GET SPECIFIC USER CART
// const getUserCart = async (req, res) => {
//   try {
//     // .findOne() bc every user has just one Cart
//     const cart = await Cart.findOne({ userId: req.params.userId });
//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// module.exports = {
//   createCart,
//   updateCart,
//   deleteCart,
//   getUserCart,
// };
