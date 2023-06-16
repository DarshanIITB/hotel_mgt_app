import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
//for datepicker
import { DatePicker, Space } from 'antd';
import moment from 'moment';

const Homesceen = () => {

  const { RangePicker } = DatePicker;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  // hooks for booking dates
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: response } = await axios.get('/api/rooms/getallrooms');
        setData(response);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  //filtering available rooms by date
  function filterByDate(dates) {
    setFromDate(dates[0].format('DD-MM-YYYY'));
    setToDate(dates[1].format('DD-MM-YYYY'));
    var tempData = []; // for storing filtered data

    // looping through all of the rooms
    for (const room of data) {
      var isAvailable = true; // to store availability of rooms

      // checking if there are some bookings
      if (room.currentBookings.length > 0) {
        // loop through all bookings to check availability
        for (const booking of room.currentBookings) {
          const bookingFromDate = moment(booking.fromDate, 'DD-MM-YYYY');
          const bookingToDate = moment(booking.toDate, 'DD-MM-YYYY');

          // checking availability
          if (
            (moment(dates[0]).isSameOrBefore(bookingToDate) && moment(dates[0]).isSameOrAfter(bookingFromDate)) ||
            (moment(dates[1]).isSameOrBefore(bookingToDate) && moment(dates[1]).isSameOrAfter(bookingFromDate))
          ) {
            isAvailable = false;
            break;
          }
        }
      }
      if (isAvailable) {
        tempData.push(room);
      }
    }

    setData(tempData);
  }


  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col-md-3'>
          <Space direction="vertical" size={12}>
            <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
          </Space>
        </div>
      </div>
      <div className='row justify-content-center mt-5'>
        {loading ? (
          <Loader />
        ) : data ? (
          (
            data.map((room) => {
              return (
                <div className='col-md-9 mt-2'>
                  <Room room={room} fromDate={fromDate} toDate={toDate} />
                </div>)
            }))
        ) : (<Error />)}
      </div>
    </div>
  )
}

export default Homesceen;