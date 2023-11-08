import React, { useState, useEffect } from 'react'
import { Container, Table } from 'reactstrap'

function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

function BookingDetails({ bookings, setBookings, tourName }) {
  const [loading, setLoading] = useState(false)

  const handleApprove = (bookingId) => {
    setLoading(true)
    fetch(`/api/booking/approve/${bookingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const updatedBookings = bookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: 'approved' }
              : booking,
          )
          setBookings(updatedBookings)
        } else {
          console.error('Error approving booking:', data.message)
        }
      })
      .catch((error) => {
        console.error('Error approving booking:', error)
      })
      .finally(() => setLoading(false))
  }

  const handleReject = (bookingId) => {
    setLoading(true)
    fetch(`/api/booking/reject/${bookingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const updatedBookings = bookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: 'rejected' }
              : booking,
          )
          setBookings(updatedBookings)
        } else {
          console.error('Error rejecting booking:', data.message)
        }
      })
      .catch((error) => {
        console.error('Error rejecting booking:', error)
      })
      .finally(() => setLoading(false))
  }

  return (
    <Container>
      <h2 className="mt-4 mb-4">Booking for {tourName} Package</h2>
      <Table className="table-class" striped>
        <thead>
          <tr>
            <th className='table-header'>Name</th>
            <th className='table-header'>Phone No</th>
            <th className='table-header'>Guest Size</th>
            <th className='table-header'>Booking Date</th>
            <th className='table-header'>Created Date</th>
            <th className='table-header'>Status</th>
            <th className='table-header'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings && Array.isArray(bookings) ? (
            bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.fullName}</td>
                <td>{booking.phone}</td>
                <td>{booking.guestSize}</td>
                <td>{formatDate(booking.bookAt)}</td>
                <td>{formatDate(booking.createdAt)}</td>
                <td>{booking.status}</td>
                <td>
                  {booking.status === 'pending' ? (
                    <>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleApprove(booking._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleReject(booking._id)}
                      >
                        Reject
                      </button>
                    </>
                  ) : booking.status === 'approved' ? (
                    <button
                      className="btn btn-success"
                      onClick={() => handleApprove(booking._id)}
                    >
                      Approved
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning"
                      onClick={() => handleReject(booking._id)}
                    >
                      Rejected
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No bookings available for {tourName}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  )
}

export default BookingDetails
