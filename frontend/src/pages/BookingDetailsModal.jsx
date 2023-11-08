import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

const BookingDetailsModal = ({ booking, isOpen, toggle }) => {
  if (!booking) {
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Booking Details</ModalHeader>
        <ModalBody>
          <p>Loading booking details...</p>
        </ModalBody>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Booking Details</ModalHeader>
      <ModalBody>
        <p>Tour Name: {booking.tourName || 'N/A'}</p>
        <p>City: {booking.city || 'N/A'}</p>
        <p>Guest Size: {booking.guestSize || 'N/A'}</p>
        <p>Total Amount: ${booking.totalAmount || 'N/A'}</p>
        <p>Booking Date: {formatDate(booking.bookAt) || 'N/A'}</p>
      </ModalBody>
    </Modal>
  );
};

export default BookingDetailsModal;
