const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
require('dotenv').config();
const cors = require("cors");
const { Product, User, Review } = require("./mongoosemodel.js")

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
            let theProduct = productsArray[0];
            id = theProduct.id + 1;
        }
        else {
            id = 1;
        }
        const product = new Product({
            id: id,
            name: req.body.name,
            about:req.body.about,
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

//api for adding review

app.post("/addreview", async (req,res)=>{
    const review = new Review({
        
        name: req.body.name,
        reviewText:req.body.reviewText,
        email:req.body.email,
        rating:req.body.rating,
        productId:req.body.productId
    })

    const savedReview = await review.save()
    res.send(savedReview)
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




// Middleware to verify token and get user ID
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ success: false, message: "Access denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.user.id; // Attach user ID to request
        next();
    } catch (error) {
        res.status(400).json({ success: false, message: "Invalid token" });
    }
};

app.post("/add-to-cart", verifyToken, async (req, res) => {
    try {
        const { itemId } = req.body; // Get productId from request

        console.log(itemId)

        if (!itemId) {
            return res.status(400).json({ success: false, message: "Missing productId" });
        }

        const user = await User.findById(req.userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Ensure cartData exists
        if (!user.cartData) {
            user.cartData = {};
        }

        // Increase the quantity or set it to 1 if not present
        user.cartData[itemId] = (user.cartData[itemId] || 0) + 1;

        try {
            user.markModified("cartData");
            const result = await user.save();
            
        } catch (error) {
            console.error("Error saving user:", error);
        }
        res.status(200).json({ success: true, message: "Product added to cart", cartData: user.cartData });

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

app.post('/remove-from-cart', verifyToken, async(req,res)=>{

    const { itemId } = req.body;
    const user = await User.findById(req.userId);
    if (user.cartData[itemId]>0) {
        user.cartData[itemId]  -= 1;
    }
    

        try {
            user.markModified("cartData");
            const result = await user.save();
        }
        catch(error){
            console.error("Error saving user:", error);
        }
        res.status(200).json({ success: true, message: "Product removed from cart", cartData: user.cartData });
})

app.post('/get-cartData',verifyToken, async (req,res)=>{
    console.log(req.userId)
    const user =  await User.findById(req.userId)
    res.json({ success: true, cartData: user.cartData });
    console.log(user.cartData)
})