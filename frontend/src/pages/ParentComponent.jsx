// ParentComponent.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingDetails from './BookingDetails';

function ParentComponent() {
  const { tourName } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bookings data for the specific tourName
    fetch(`http://localhost:7007/api/booking/by-tour/${tourName}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Response Data', data)
        setBookings(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  }, [tourName]);

  //console.log('tourName', tourName);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <BookingDetails bookings={bookings} setBookings={setBookings} tourName={tourName} />

      )}
    </div>
  );
}

export default ParentComponent;
