/* import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const BookingAdminPage = () => {
  const [bookings, setBookings] = useState([]);
  console.log('bookings admin', bookings);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:7007/api/booking'); 
        const data = await response.json();
        setBookings(data.data || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Bookings</h2>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer Name</th>
            <th>Tour Name</th>
            <th>Country</th>
            <th>Status</th>

          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking._id}</td>
              <td>{booking.fullName}</td>
              <td>{booking.tourName}</td>
              <td>{booking.city}</td>
              <td>{booking.status}</td>
             
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BookingAdminPage; */

/* import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Pagination from './Pagination';

const BookingAdminPage = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(5);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:7007/api/booking');
        const data = await response.json();
        setBookings(data.data || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const totalPages = Math.ceil(bookings.length / bookingsPerPage);
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <h2>Bookings</h2>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer Name</th>
            <th>Tour Name</th>
            <th>Country</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentBookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking._id}</td>
              <td>{booking.fullName}</td>
              <td>{booking.tourName}</td>
              <td>{booking.city}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        data={bookings}
        RenderComponent={({ _id, fullName, tourName, city, status }) => (
          <tr key={_id}>
            <td>{_id}</td>
            <td>{fullName}</td>
            <td>{tourName}</td>
            <td>{city}</td>
            <td>{status}</td>
          </tr>
        )}
        title="Bookings"
        pageLimit={5}
        dataLimit={bookingsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default BookingAdminPage;
 */

/* import React, { useState, useEffect } from 'react';

import Pagination from './Pagination';

const BookingAdminPage = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(5);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:7007/api/booking');
        const data = await response.json();
        setBookings(data.data || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const totalPages = Math.ceil(bookings.length / bookingsPerPage);
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
  
      <Pagination
        data={bookings}
        RenderComponent={({ _id, fullName, tourName, city, status }) => (
          <tr key={_id}>
            <td>{_id}</td>
            <td>{fullName}</td>
            <td>{tourName}</td>
            <td>{city}</td>
            <td>{status}</td>
          </tr>
        )}
        title="Bookings"
        pageLimit={5}
        dataLimit={bookingsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default BookingAdminPage; */

import React, { useState, useEffect } from 'react';

const BookingAdminPage = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(5);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:7007/api/booking');
        const data = await response.json();
        setBookings(data.data || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const totalPages = Math.ceil(bookings.length / bookingsPerPage);
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const renderBookingRow = ({ _id, fullName, tourName, city, status }) => (
    <tr key={_id}>
      <td>{_id}</td>
      <td>{fullName}</td>
      <td>{tourName}</td>
      <td>{city}</td>
      <td>{status}</td>
    </tr>
  );

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <h2>Bookings</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer Name</th>
            <th>Tour Name</th>
            <th>Country</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentBookings.map(renderBookingRow)}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(bookings.length / bookingsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookingAdminPage;
