const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ProductModel = require('./models/Products');
const OrderModel = require('./models/Order');
const AdminAccount = require('./models/AdminAccount');

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey';

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Connect to MongoDB
mongoose.connect('mongodb+srv://wazeem:Secret789@cluster0.x0ysh.mongodb.net/PetShop')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Middleware to verify JWT
const authenticationToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  jwt.verify(token.split(' ')[1], JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.user = user;
    next();
  });
};

// User Schema and Model
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});
const UserModel = mongoose.model('User', userSchema);

// User Signup API
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during signup:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// User Login API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, message: 'Login successful' });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin Login API
app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await AdminAccount.findOne({ username, password });
    if (admin) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Error finding admin:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Admin details
app.get('/admin', (req, res) => {
  AdminAccount.findOne({})
    .then((admin) => res.json(admin))
    .catch((err) => res.status(500).json(err));
});

// Update admin details
app.put('/admin', (req, res) => {
  AdminAccount.findOneAndUpdate({}, req.body, { new: true })
    .then((admin) => res.json(admin))
    .catch((err) => res.status(500).json(err));
});

// API to get a single product by ID
app.get('/products/:id', (req, res) => {
  ProductModel.findById(req.params.id)
    .then((product) => {
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    })
    .catch((err) => res.status(400).json(err));
});

// API to get all products
app.get('/products', (req, res) => {
  ProductModel.find({})
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json(err));
});

// API to create a new product
app.post('/CreateProducts', (req, res) => {
  ProductModel.create(req.body)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json(err));
});

// API to update a product
app.put('/UpdateProducts/:id', (req, res) => {
  ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json(err));
});

// API to delete a product
app.delete('/products/:id', (req, res) => {
  ProductModel.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Product deleted' }))
    .catch((err) => res.status(400).json(err));
});

// API to create a new order
app.post('/orders', (req, res) => {
  OrderModel.create(req.body)
    .then((order) => res.json(order))
    .catch((err) => res.status(400).json(err));
});

// API to get all orders
app.get('/orders', (req, res) => {
  OrderModel.find({})
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json(err));
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
