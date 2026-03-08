require('dotenv').config();

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

/* ===============================
   MongoDB Connection
================================ */

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((error) => {
    console.log("❌ MongoDB Connection Error:", error);
});


/* ===============================
   JWT Authentication Middleware
================================ */

const authenticationToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Access Denied" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {

        if (err) {
            return res.status(403).json({ message: "Invalid Token" });
        }

        req.user = user;
        next();

    });

};


/* ===============================
   User Model
================================ */

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String
});

const UserModel = mongoose.model("User", userSchema);


/* ===============================
   User Signup
================================ */

app.post("/signup", async (req, res) => {

    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "Server Error" });

    }

});


/* ===============================
   User Login
================================ */

app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login Successful",
            token
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "Server Error" });

    }

});


/* ===============================
   Admin Login
================================ */

app.post("/admin/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        const admin = await AdminAccount.findOne({ username, password });

        if (!admin) {
            return res.status(401).json({ message: "Invalid Username or Password" });
        }

        res.json({ message: "Admin Login Successful" });

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "Server Error" });

    }

});


/* ===============================
   Admin Info
================================ */

app.get("/admin", async (req, res) => {

    try {

        const admin = await AdminAccount.findOne({});
        res.json(admin);

    } catch (error) {

        res.status(500).json(error);

    }

});


app.put("/admin", async (req, res) => {

    try {

        const admin = await AdminAccount.findOneAndUpdate(
            {},
            req.body,
            { new: true }
        );

        res.json(admin);

    } catch (error) {

        res.status(500).json(error);

    }

});


/* ===============================
   Products API
================================ */

app.get("/products", async (req, res) => {

    try {

        const products = await ProductModel.find({});
        res.json(products);

    } catch (error) {

        res.status(400).json(error);

    }

});


app.get("/products/:id", async (req, res) => {

    try {

        const product = await ProductModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);

    } catch (error) {

        res.status(400).json(error);

    }

});


app.post("/CreateProducts", async (req, res) => {

    try {

        const product = await ProductModel.create(req.body);
        res.json(product);

    } catch (error) {

        res.status(400).json(error);

    }

});


app.put("/UpdateProducts/:id", async (req, res) => {

    try {

        const product = await ProductModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(product);

    } catch (error) {

        res.status(400).json(error);

    }

});


app.delete("/products/:id", async (req, res) => {

    try {

        await ProductModel.findByIdAndDelete(req.params.id);

        res.json({ message: "Product deleted" });

    } catch (error) {

        res.status(400).json(error);

    }

});


/* ===============================
   Orders API
================================ */

app.post("/orders", async (req, res) => {

    try {

        const order = await OrderModel.create(req.body);
        res.json(order);

    } catch (error) {

        res.status(400).json(error);

    }

});


app.get("/orders", async (req, res) => {

    try {

        const orders = await OrderModel.find({});
        res.json(orders);

    } catch (error) {

        res.status(400).json(error);

    }

});


/* ===============================
   Server
================================ */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);

});