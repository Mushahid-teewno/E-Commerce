const mongoose = require("mongoose");

productSchema= new mongoose.Schema({
  
    id:{
        type:Number,
        required: true,
    },
    name:{
        type:String,
        required: true,
    },
    image:{
        type:String,
        required: true,
    },
    category:{
        type:String,
        required: true,
    },
    new_price:{
        type:Number,
        required: true,
    },
    old_price:{
        type:Number,
        required: true,
    },
    date:{
        type:Date,
        default: Date.now
    },
    available:{
        type:Boolean,
        default:true
    },
})

userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cartData:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now
    }

    
})

const Product = mongoose.model("Product", productSchema)
const User = mongoose.model("User", userSchema)
 
module.exports = { Product, User };