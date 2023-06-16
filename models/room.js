const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    maxCount: {
        type: Number,
        required: true
    },
    roomNumber: {
        type: Number,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    imageUrls: [],
    currentBookings: [],
    description: {
        type: String,
        required: true
    }
}, 
    {
        timestamps: true,
    }
);

const roomModel = mongoose.model('rooms', roomSchema);

module.exports = roomModel;