import React, { useState, useEffect, useContext } from 'react'
import { Container, Table, Button } from 'reactstrap'
import { AuthContext } from '../context/AuthContext'
import { AiFillDelete } from 'react-icons/ai'

import BookingDetailsModal from './BookingDetailsModal'
import './UserBookingList.css'
import PayButton from '../components/PayButton'

function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const UserBookingList = ({ userId }) => {
  const { user } = useContext(AuthContext)
  const [userBookings, setUserBookings] = useState([])
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false)
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null)

  const handleViewDetails = (booking) => {
    setSelectedBookingDetails(booking)
    setDetailsModalOpen(true)
  }

  const handleCancelBooking = async (bookingId) => {
    const shouldCancel = window.confirm(
      'Are you sure you want to cancel this booking?',
    )
    if (!shouldCancel) {
      return
    }
    try {
      const response = await fetch(
        `http://localhost:7007/api/booking/${bookingId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      )
      if (!response.ok) {
        throw new Error('Failed to cancel booking')
      }

      setUserBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId),
      )
    } catch (error) {
      console.log('Error canceling booking:', error)
    }
  }

  useEffect(() => {
    //console.log('User Id:', user._id)
    const fetchUserBookings = async () => {
      try {
        const response = await fetch(
          `http://localhost:7007/api/booking/by-user/${user._id}`,
          {
            method: 'GET',
            credentials: 'include',
          },
        )

        if (!response.ok) {
          throw new Error('Failed to fetch user bookings')
        }

        const data = await response.json()
        setUserBookings(data.data)
        console.log('User Bookings:', data.data)
      } catch (error) {
        console.log('Error fetching user bookings:', error)
      }
    }

    fetchUserBookings()
  }, [userId])

  const handleCheckout = () => {}

  return (
    <Container>
      <h2 className="mt-4 mb-4">My Own Booking Lists</h2>
      {userBookings.length > 0 ? (
        <Table className="table-class" striped>
          <thead>
            <tr>
              <th className="table-header">Tour Name</th>
              <th className="table-header">City</th>
              <th className="table-header">Phone No</th>
              <th className="table-header">Booking Date</th>
              <th className="table-header">Guest Size</th>
              <th className="table-header">Total Amount</th>
              <th className="table-header">Status</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userBookings.map((booking) => (
              <tr key={booking._id}>
                <td className="table-cell">{booking.tourName}</td>
                <td className="table-cell">{booking.city}</td>
                <td className="table-cell">{booking.phone}</td>
                <td className="table-cell">{formatDate(booking.bookAt)}</td>
                <td className="table-cell">{booking.guestSize}</td>
                <td className="table-cell">${booking.totalAmount}</td>
                <td className="table-cell">{booking.status}</td>
                <td className="table-cell">
                  {booking.status === 'approved' ? (
                    <div>
                      <PayButton booking={booking} />
                      <Button
                        className="button-info"
                        onClick={() => handleViewDetails(booking)}
                      >
                        View Details
                      </Button>
                    </div>
                  ) : (
                    <AiFillDelete
                      className="button-delete"
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Cancel
                    </AiFillDelete>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        'You have no bookings yet.'
      )}

      {/* Booking Details Modal */}
      <BookingDetailsModal
        booking={selectedBookingDetails}
        isOpen={isDetailsModalOpen}
        toggle={() => setDetailsModalOpen(!isDetailsModalOpen)}
      />
    </Container>
  )
}
export default UserBookingList
