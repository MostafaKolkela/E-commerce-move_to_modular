const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "user"
    },
    sellerId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "user"
    },

    items: [
        {
            productId: { type: mongoose.Schema.ObjectId, ref: "Product" },
            quantity: { type: Number, default: 1 },
            price: { type: Number }
        }
    ],

    totalPrice: { type: Number },

    shippingAddress: {
        street: String,
        city: String,
        phone: String
    },

    orderDate: { type: Date, default: Date.now },

    paymentMethod: {
        type: String,
        enum: ['card', 'cash'],
        default: 'cash'
    },

    paymentStatus: { type: String, default: 'Pending' },

    deliveredAt: { type: Date }
})

// Check if the model exists before creating a new one
module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema)