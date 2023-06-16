const mongoose = require("mongoose")

const bookingSchema = mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        require:true
    },
    userId: {
        type: String,
        require:true
    },
    fromDate: {
        type: String,
        require:true
    },
    toDate: {
        type: String,
        require:true
    },
    totalAmount: {
        type: Number,
        require:true
    },
    totalDays: {
        type: Number,
        require:true
    },
    transactionId: {
        type: String,
        require:true
    },
    status: {
        type: String,
        require:true,
        default: 'booked'
    }
},{
    timestamps: true
}
)

const bookingModel = mongoose.model('bookings', bookingSchema);

module.exports = bookingModel;