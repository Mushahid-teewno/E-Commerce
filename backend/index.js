const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
require('dotenv').config();
const cors = require("cors");
const { Product, User } = require("./mongoosemodel.js")

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://mushahidhussain:Kyw7Hf23QA7yYu15@cluster0.arpmi.mongodb.net/ECOMMERCE")

const storage = multer.diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
        return cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.use("/images", express.static('images'));

// api for adding the product

app.post("/addproduct", async (req, res) => {
    try {
        const products = await Product.find({});

        if (products.length > 0) {
            productsArray = products.slice(-1);
            theProduct = productsArray[0];
            id = theProduct.id + 1;
        }
        else {
            id = 1;
        }
        const product = new Product({
            id: id,
            name: req.body.name,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
            image: req.body.image,
        })
        // console.log(product);
        const savedProduct = await product.save()

        res.status(201).json({
            success: true,
            message: "Product added successfully!",
            product: savedProduct,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to add product",
            err: err.message,
        });
    }

})

//  api for removing product

app.post("/removeproduct", async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id })
    res.send("deleted")
})

//api for getting all the products

app.get("/showproducts", async (req, res) => {
    allProducts = await Product.find({});
    res.send(allProducts)
})

app.post("/upload", upload.single('file'), (req, res) => {
    res.json({
        success: 1,
        imgurl: `http://localhost:3000/images/${req.file.filename}`
    })
})

app.listen(3000, () => {
    console.log("listening on port 3000")
})

//api for signup

app.post('/signup', async (req, res) => {



    try {
        const { email, name, password } = req.body;

        let existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(401).json({ success: false, message: 'Email is already in use' })
        }
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        const user = new User({ email, name, password, cartData: cart });
        await user.save()

        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ success: true,message:"Signed up successfully" , token })

    } catch (err) {
        console.error(err)
        res.status(500).json({success:false,message:"server error"})
    }
});

//  api for signin

app.post('/signin', async (req, res) => {


    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success: false, message: "user does not exist" });
        }
        // const pass = req.body.password === user.password

        if ( req.body.password !== user.password) {
            return res.status(400).json({ success: false, message: "incorect password" });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        res.json({ success: true,message:"logged in successfully" , token })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
})