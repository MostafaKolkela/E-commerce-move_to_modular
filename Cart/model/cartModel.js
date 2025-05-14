const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'user'
    },

    cartItem: [
        {
            productId: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true
            },
            sellerId: {
                type: mongoose.SchemaTypes.ObjectId,
                required: true,
                ref: 'user'
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: {
                type: Number,
                required: true
            },
            negotiationId: { // جديد: لو فيه تفاوض
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Negotiation',
                default: null
            }
        }
    ],

    totalPrice: {
        type: Number,
        min: 0,
        default: 0
    }
})

module.exports = mongoose.model('Cart', CartSchema)
