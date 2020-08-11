const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    category: {
        type: Number,
        default: 1
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    ingredient: {
        type: String,
    },
    storingMethod: {
        type: String,
    },
    expiration: {
        type: Number,
        default: 1
    },
    daysAvailable: {
        type: Number,
        default: 1
    },
    initialQuantity: {
        type: Number,
        default: 1
    },
    images: {
        type: Array,
        default: []
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

productSchema.index({
   title: 'text',
   description: 'text',
   ingredient: 'text'
}, {
    weights: {
        title: 10,
        description: 5,
        ingredient: 5
    }
})


const Product = mongoose.model('Product', productSchema);

module.exports = { Product }