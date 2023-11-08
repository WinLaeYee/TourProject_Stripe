import React, { useContext } from 'react'
import { Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import calculateAvgRating from '../utils/avgRating'

import './tour-card.css'
// import tours from '../assets/data/tours'
import { AuthContext } from '../context/AuthContext'

const TourCard = ({ tour }) => {
  const { _id, title, photo, city, price, featured, reviews } = tour
  console.log('photo', photo[0].filePath)
  const { user } = useContext(AuthContext)
  console.log('user', user);

  const { totalRating, avgRating } = calculateAvgRating(reviews)

  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img
            src={`http://localhost:7007/${photo[0].filePath}`}
            alt="tour-img"
          />
          {featured && <span>Featured</span>}
        </div>
        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i className="ri-map-pin-line"></i>
              {city}
            </span>
            <span className="tour__rating d-flex align-items-center gap-1">
              <i className="ri-star-fill"></i>
              {avgRating == 0 ? null : avgRating}{' '}
              {totalRating == 0 ? 'Not rated' : <span>({reviews.length})</span>}
            </span>
          </div>
          <h5 className="tour__title">
            <Link to={`/tours/${_id}`}>{title}</Link>
          </h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              ${price} <span> /per person</span>
            </h5>
            <button className="btn booking__btn">
              <Link to={`/tours/${_id}`}>Booking</Link>
            </button>
            {user && user.role === 'admin' ? (
              <button className="btn booking__btn">
                <Link to={`/updateTour/${_id}`}>Update</Link>
              </button>
            ) : null}
            {user && user.role === 'admin' ? (
              <button className="btn booking__btn">
                <Link to={`/deleteTour/${_id}`}>Delete</Link>
              </button>
            ) : null}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default TourCard
