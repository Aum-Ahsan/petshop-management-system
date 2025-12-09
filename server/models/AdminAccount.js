
const mongoose = require('mongoose');

const AdminAccountSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});


const adminaccounts = mongoose.model('adminaccounts', AdminAccountSchema);

module.exports = adminaccounts;
