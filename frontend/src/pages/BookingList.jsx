import React, { useState, useEffect, useContext } from 'react';
import { Container, Table } from 'reactstrap';
import './BookingList.css';
import { Link } from 'react-router-dom';
import BookingDetails from './BookingDetails'; 

import useFetch from '../hooks/userFetch'
import { BASE_URL } from '../utils/config'

import { AuthContext } from '../context/AuthContext'



const BookingList = () => {

  const { user } = useContext(AuthContext)
  const [bookings, setBookings] = useState([]);
   
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:7007/api/booking', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data.data); 
        console.log('Data received from the API:', data);
      } catch (error) {
        console.log('Error fetching bookings:', error);
      }
    };

  
    fetchBookings();
  }, []);



  // Calculate bookingCounts
  const bookingCounts = bookings.reduce((counts, booking) => {
    counts[booking.tourName] = (counts[booking.tourName] || 0) + 1;
    return counts;
  }, {});

  return (
    <Container>
      <h2 className="mt-4 mb-4">All Booking Lists</h2>
      {
        user && user.role === 'admin' ? (
          <Table className='table-class' striped>
        <thead>
          <tr>
            <th className='table-header'>Tour Name</th>
            <th className='table-header'>Total No. of Bookings</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(bookingCounts).map(([tourName, totalBookings]) => (
            <tr key={tourName}>
              
              <td className='table-cell'>
              <Link  to={`/booking-details/${tourName}`} className="btn btn-link tour-btn" style={{ textDecoration: 'none', fontWeight:'bold' }}>{tourName}</Link>
              </td>
              <td className='table-cell'>{totalBookings}</td>
            </tr>
          ))}
        </tbody>
      </Table>
        ): "User can't get all tour bookings information!"
      }
      
      
    </Container>
  );
};

export default BookingList;
