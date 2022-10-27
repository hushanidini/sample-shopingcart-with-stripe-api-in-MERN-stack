const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    customerId: {type: String},
    paymentIntentId: {type: String},
    products: [
        {
            id: {type: Number},
            name: {type: String},
            desc: {type: String},
            price: {type: Number},
            image: {type: String},
            cartQuantity: {type: String},
        }
    ],
    subtotal: {type: Number, required: true},
    total: {type: Number, required: true},
    shipping: {type: Object, required: true},
    delivery_status: { type: String, default: "pending"},
    payment_status: {type: String, required: true}
},
{timestamps: true});

const Order = mongoose.model("Order", orderSchema);
exports.Order = Order;