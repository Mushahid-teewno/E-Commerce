const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const Product = require("./mongoosemodel.js")

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
        id:id,
        name: req.body.name,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        image: req.body.image,
    })
    console.log(product);
    await product.save().then(
        res.send("saved")
    )
})

//  api for removing product

app.post("/removeproduct", async(req, res)=>{
    await Product.findOneAndDelete({id: req.body.id})
        res.send("deleted")
})

app.post("/upload", upload.single('file'), (req, res) => {
    res.json({
        success: 1,
        imgurl: `http://localhost:300/images/${req.file.filename}`
    })
})

app.listen(3000, () => {
    console.log("listening on port 3000")
})