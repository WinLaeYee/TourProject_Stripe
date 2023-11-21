import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../pages/Home'
import Tours from '../pages/Tours'
import TourDetails from '../pages/TourDetails'
import Login from '../pages/Login'
import Register from '../pages/Register'
import SearchResultList from '../pages/SearchResultList'
import ThankYou from '../pages/ThankYou'
import CreateTour from '../pages/CreateTour'
import UpdateTour from '../pages/UpdateTour'
import DeleteTour from '../pages/DeleteTour.jsx'
import BookingList from '../pages/BookingList'
import BookingDetails from '../pages/BookingDetails'
import ParentComponent from '../pages/ParentComponent'
import UserBookingList from '../pages/UserBookingList'

import { AuthContext } from '../context/AuthContext.js'
import WaitingApproval from '../pages/WaitingApproval'
import CheckoutSuccess from '../pages/CheckoutSuccess'
// import Invoice from '../pages/Invoice'

const Routers = () => {
  const { user } = useContext(AuthContext)

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/tours/search" element={<SearchResultList />} />
      <Route path="/createTour" element={<CreateTour />} />
      <Route path="/updateTour/:id" element={<UpdateTour />} />
      <Route path="/deleteTour/:id" element={<DeleteTour />} />
      <Route path="/booking" element={<BookingList />} />
      <Route path="/checkout-success/:id/:userId" element={<CheckoutSuccess />} />
      <Route path="/booking-details/:tourName" element={<ParentComponent />} />
      <Route
        path="/my-bookings"
        element={
          user ? (
            <UserBookingList userId={user._id} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/waiting-approval" element={<WaitingApproval />} />
      {/* <Route path="/invoice" element={<Invoice />} /> */}


    </Routes>
  )
}

export default Routers
