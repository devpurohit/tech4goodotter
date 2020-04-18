const mongoose = require('mongoose');

const analyticsSchema = mongoose.Schema({
    ip: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Analytics', analyticsSchema);