import React from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment"

export default function BookingScreen(match) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState();
    const { roomId, fromDate, toDate } = useParams();
    var fromDate_ = moment(fromDate, 'DD-MM-YYYY');
    var toDate_ = moment(toDate, 'DD-MM-YYYY');
    const totalDays = toDate_.diff(fromDate_, 'days')+1;
    const [totalAmount, setTotalAmount] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: response } = await axios.post('/api/rooms/getroombyid', { roomId: roomId });
                setData(response);
                setLoading(false);
                setTotalAmount(response.rent * totalDays);
            } catch (error) {
                setError(true);
                console.error(error.message);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    async function bookRoom(){
        const bookingDetails = {
            room: data.name,
            roomId,
            userId: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromDate,
            toDate,
            totalAmount,
            totalDays
        }
        try{
            const result = await axios.post('/api/bookings/bookroom', bookingDetails);
        } catch(error){
            console.log(error);
        }
    }

    return (
        <div className="m-5">
            {loading ? (<Loader />) : data ? (
                <div className="row justify-content-center mt-5 bs">
                    <div className="col-md-6">
                        <h1>{data.name}</h1>
                        <img src={data.imageUrls[0]} className="big-img" />
                    </div>
                    <div className="col-md-6">
                        <div style={{textAlign: "right"}}>
                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                <p>From: {fromDate}</p>
                                <p>To: {toDate}</p>
                                <p>Max Count: {data.maxCount}</p>
                            </b>
                        </div>
                        <div style={{textAlign: "right"}}>
                            <h1>Amount</h1>
                            <hr />
                            <b>
                                <p>Rent per day: {data.rent}</p>
                                <p>Total days: {totalDays}</p>
                                <p>Total Amount: {totalAmount}</p>
                            </b>
                        </div>
                        <div style={{float: "right"}}>
                            <button className="btn btn-primary" onClick={bookRoom}>Pay Now</button>
                        </div>
                    </div>
                </div>) : (<Error/>)}
        </div>
    )
}