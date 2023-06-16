const express = require("express")
const router = express.Router();
const Booking = require("../models/booking")
const Room = require("../models/room")

router.post('/bookroom', async (req, res) => {
    const {
        room,
        roomId,
        userId,
        fromDate,
        toDate,
        totalAmount,
        totalDays
    } = req.body;

    try {
        const newBooking = new Booking({
            room,
            roomId,
            userId,
            fromDate,
            toDate,
            totalAmount,
            totalDays,
            transactionId: '1234'
        })
        const booking = await newBooking.save();

        const roomTemp = await Room.findOne({ _id: roomId });
        roomTemp.currentBookings.push({ 
            bookingId: booking._id, 
            fromDate: fromDate, 
            toDate: toDate, 
            userId: userId, 
            status: booking.status});

        await roomTemp.save();

        res.send('Room booked successfully.');
    } catch (error) {
        return res.status(400).json({ error });
    }
})

module.exports = router;