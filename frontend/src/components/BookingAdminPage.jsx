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
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BookingAdminPage.css';

const BookingDetailsModal = ({ booking, isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Booking Details</ModalHeader>
      <ModalBody>
        <p>Booking ID: {booking._id}</p>
        <p>Customer Name: {booking.fullName}</p>
        <p>Tour Name: {booking.tourName}</p>
        <p>Country: {booking.city}</p>
        <p>Status: {booking.status}</p>
        
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const BookingAdminPage = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(5);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [editBooking, setEditBooking] = useState(null);

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
      <td>
        <button onClick={() => handleViewDetails(_id)} className="icon-button">
          <FaEye />
        </button>
        <button onClick={() => handleEdit(_id)} className="icon-button">
          <FaEdit />
        </button>
        <button onClick={() => handleDelete(_id)} className="icon-button">
          <FaTrash />
        </button>
      </td>
    </tr>
  );

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleViewDetails = (bookingId) => {
    const booking = bookings.find((booking) => booking._id === bookingId);
    setSelectedBooking(booking);
    setDetailsModalOpen(true);
  };

  const handleEdit = (bookingId) => {
    const booking = bookings.find((booking) => booking._id === bookingId);
    setEditBooking(booking);
  };

  const handleDelete = (bookingId) => {
    const updatedBookings = bookings.filter((booking) => booking._id !== bookingId);
    setBookings(updatedBookings);
    console.log(`Delete Booking ID: ${bookingId}`);
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
        <tbody>{currentBookings.map(renderBookingRow)}</tbody>
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

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          isOpen={isDetailsModalOpen}
          toggle={() => setDetailsModalOpen(!isDetailsModalOpen)}
        />
      )}
    </div>
  );
};

export default BookingAdminPage;
 */

// BookingAdminPage.js
import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BookingAdminPage.css';
import EditBookingComponent from './EditBookingComponent'; // Import the EditBookingComponent

const BookingAdminPage = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(5);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editBooking, setEditBooking] = useState(null);

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
      <td>
        <button onClick={() => handleViewDetails(_id)} className="icon-button">
          <FaEye />
        </button>
        <button onClick={() => handleEdit(_id)} className="icon-button">
          <FaEdit />
        </button>
        <button onClick={() => handleDelete(_id)} className="icon-button">
          <FaTrash />
        </button>
      </td>
    </tr>
  );

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleViewDetails = (bookingId) => {
    const booking = bookings.find((booking) => booking._id === bookingId);
    setSelectedBooking(booking);
    setDetailsModalOpen(true);
  };

  const handleEdit = (bookingId) => {
    const booking = bookings.find((booking) => booking._id === bookingId);
    setEditBooking(booking);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (editedBooking) => {
   
    const updatedBookings = bookings.map((booking) =>
      booking._id === editedBooking._id ? editedBooking : booking
    );
    setBookings(updatedBookings);
    console.log('Edited Booking:', editedBooking);
    setEditModalOpen(false);
  };

  const handleDelete = async(bookingId) => {
    try {
     
      await fetch(`http://localhost:7007/api/booking/${bookingId}`, {
        method: 'DELETE',
      });
  
     
      const updatedBookings = bookings.filter((booking) => booking._id !== bookingId);
      setBookings(updatedBookings);
  
      console.log(`Delete Booking ID: ${bookingId}`);
    } catch (error) {
      console.error('Error deleting booking:', error);
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
        <tbody>{currentBookings.map(renderBookingRow)}</tbody>
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

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          isOpen={isDetailsModalOpen}
          toggle={() => setDetailsModalOpen(!isDetailsModalOpen)}
        />
      )}

      {editBooking && (
        <EditBookingComponent
          booking={editBooking}
          isOpen={isEditModalOpen}
          toggle={() => setEditModalOpen(!isEditModalOpen)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

const BookingDetailsModal = ({ booking, isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Booking Details</ModalHeader>
      <ModalBody>
        <p>Booking ID: {booking._id}</p>
        <p>Customer Name: {booking.fullName}</p>
        <p>Tour Name: {booking.tourName}</p>
        <p>Country: {booking.city}</p>
        <p>Status: {booking.status}</p>
        {/* Add other details as needed */}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default BookingAdminPage;
