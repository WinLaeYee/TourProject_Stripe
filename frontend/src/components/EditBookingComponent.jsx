// EditBookingComponent.js
import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const EditBookingComponent = ({ booking, isOpen, toggle, onSave }) => {
  const [editedBooking, setEditedBooking] = useState({ ...booking });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBooking((prevBooking) => ({ ...prevBooking, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedBooking);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Booking</ModalHeader>
      <ModalBody>
        <p>Booking ID: {editedBooking._id}</p>
        <label>Status:</label>
        <select name="status" value={editedBooking.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        {/* Add other editable fields here */}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditBookingComponent;
