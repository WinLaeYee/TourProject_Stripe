import React, { useState, useContext } from 'react'
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../utils/config'

const Booking = ({ tour, avgRating, reviews }) => {
  const { price, title } = tour

  console.log('booking tour', tour)
  console.log('tour price is', tour[0].price)

  const navigate = useNavigate()

  const { user } = useContext(AuthContext)

  const initialState = {
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: tour[0].title,
    city: tour[0].city,
    fullName: '',
    phone: '',
    guestSize: '',
    totalAmount: '',
    bookAt: '',
  }

  const [booking, setBooking] = useState(initialState)

  const handleChange = (e) => {
    setBooking((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  console.log('booking', booking.totalAmount)

  const serviceFee = 50
  const totalPrice = Number(tour[0].price) * Number(booking.guestSize)
  const totalAmount = totalPrice + Number(serviceFee)

  //send data to the server
  const handleClick = async (e) => {
    e.preventDefault()

    // console.log(booking)
    try {
      if (!user || user == undefined || user == null) {
        return alert('Please sign in')
      }

      const res = await fetch('http://localhost:7007/api/booking/', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ...booking, status: 'pending', totalAmount }),
      })

      const result = await res.json()

      if (!res.ok) {
        return alert(result.message)
      }

      navigate('/waiting-approval')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${tour[0].price} <span>/ per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center ">
          <i className="ri-star-fill"></i>
          {avgRating == 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <input type="hidden" name="city" id="city" value={booking.city} />
          <input
            type="hidden"
            name="totalAmount"
            id="totalAmount"
            value={booking.totalAmount}
          />
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              id="fullName"
              value={booking.fullName}
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              name="phone"
              id="phone"
              value={booking.phone}
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              name="bookAt"
              id="bookAt"
              value={booking.bookAt}
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              name="guestSize"
              id="guestSize"
              value={booking.guestSize}
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${tour[0].price} <i className="ri-close-line"></i>
              {booking.guestSize}person
            </h5>
            <span>${totalPrice}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  )
}

export default Booking
