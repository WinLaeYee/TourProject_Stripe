// import axios from 'axios'
// import { useSelector } from "react-redux";
// import { url } from "../slices/api";

import { useEffect, useState } from 'react'

const PayButton = ({ booking }) => {
  console.log('booking',booking)

  if (booking.stripe_payment) {
    return <div>Payment Completed</div>;
  }

  // const [bookingId, setBookingId] = useState([])

  // useEffect(() => {
  //   const ids = userBookings.map(bookingData => bookingData._id);
  //   setBookingId(ids);
  // }, [userBookings]);
  

  const handleCheckout = async (e) => {
    console.log(e);
    try {
      const response = await fetch(
        `http://localhost:7007/api/stripe/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ booking: booking }),
        },
      )
      console.log('response', response)

      if (!response.ok) {
        const result = await response.json()
        return alert(result.message)
      }

      const result = await response.json()
      if (result.url) {
        window.location.href = result.url
      }
    } catch (error) {
      console.error('error', error)
      throw error
    }
  }

  return (
    <>
      <button onClick={() => handleCheckout(booking._id)} className="btn btn-info">
        Check out
      </button>
    </>
  )
}

export default PayButton
