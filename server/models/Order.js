// models/Orders.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String,
  customerAddress: String,
  customerContact: String,
  customerQuantity: Number,
  productDelivery: String,
  pickupDate: Date,
  productName: String,
  productPrice: Number
});

const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel;
