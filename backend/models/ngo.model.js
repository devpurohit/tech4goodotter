const mongoose = require('mongoose')

const ngoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        enum: ['health', 'skill', 'env', 'edu', 'tech', 'hunger', 'gender', 'human', 'women', 'child', 'disaster', 'employ'],
        required: true
    },
    techteam: {
        type: Boolean,
        required: true
    },
    toolsapplied: [{
        type: String,
    }],
    hwdeficit: {
        type: String,
        enum: ['loc', 'nowr', 'laptops', 'phone', 'none'],
        default: false
    },
    a12: {
        type: Boolean,
        default: false
    },
    g80: {
        type: Boolean,
        default: false
    },
    fcra: {
        type: Boolean,
        default: false
    },
    budget: {
        type: Boolean,
        default: false
    },
    benificiaries: {
        type: Number
    }

})

module.exports = mongoose.model('Ngo', ngoSchema)