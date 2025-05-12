const mongoose = require('mongoose');
const slugify  = require('slugify');
const ProductSchema = new mongoose.Schema({

    name :{
        type : String,
        required : true,
        trim : true,
        maxlength : [40,"maximum length of product name is 40"],
        minlength : [5,"minimum length of product name is 5"]
    },
    slug : {type : String},

    price :{
        type : Number,
        required : true,
        min : 0
    },

    description : {
        type : String,
        required : true,
    },

    stock_quantity : {
        type : Number,
        required : true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
        },
    Subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
        required: true
        },
    img :[ 
        {
            type : String
        }
    ],
    discount:{
        type : Number
    },
    condition:{
        type : String,
        enum : ["used","new"],
        default : "new"
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    Brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },
    yourEarn:{
        type : Number
    },
    allowReturn:{
        type : Boolean,
        default : true,
    },
    colors: {
        type: [String],
        default: []
    },
    size: {
        type: [String],
        default: []
    },
    isNegotiable:{
        type : Boolean,
        default : true
    }
      

})

ProductSchema.pre('save',function(next){
    this.slug = slugify(this.name , {lower : true})

    if (this.price) {
        this.yourEarn = this.price * 0.99;
    }

    next();
})

module.exports = mongoose.model("Product" , ProductSchema);