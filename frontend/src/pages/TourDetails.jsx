import React, { useEffect, useRef, useState, useContext } from 'react'
import '../styles/tour-details.css'
import { Container, Row, Col, Form, ListGroup } from 'reactstrap'
import { useParams } from 'react-router-dom'
//import tourData from '../assets/data/tours'
import calculateAvgRating from '../utils/avgRating'
import avatar from '../assets/images/avatar.jpg'
import Booking from '../components/Booking/Booking'
import Newsletter from '../shared/Newsletter'
import useFetch from '../hooks/userFetch'
import { BASE_URL } from '../utils/config'

import { AuthContext } from '../context/AuthContext'

const TourDetails = () => {
  
  const { id } = useParams()
  const reviewMsgRef = useRef('')
  const [tourRating, setTourRating] = useState(null)
  const { user } = useContext(AuthContext)
 

 
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`)

  //console.log('tour', tour.length)
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tour])

  if (tour.length > 0) {
    const [
      { 
        photo,
        title,
        desc,
        price,
        address,
        reviews,
        city,
        distance,
        maxGroupSize,
      },
    ] = tour

    // console.log('tour is', tour)
    // console.log('photo', photo)

    const { totalRating, avgRating } = calculateAvgRating(reviews)

    const options = { day: 'numeric', month: 'long', year: 'numeric' }

    //submit request to the server
    const submitHandler = async (e) => {
      e.preventDefault()
      const reviewText = reviewMsgRef.current.value

      try {
        if (!user || user == undefined || user == null) {
          alert('Please sign in')
        }

        const reviewObj = {
          username: user?.username,
          reviewText,
          rating: tourRating,
        }

        console.log('review obj', reviewObj)

        const res = await fetch(`${BASE_URL}/review/${id}`, {
          method: 'post',
          headers: {
            'content-type':'application/json'
          },

          credentials: 'include',
          body: JSON.stringify(reviewObj),
        })

     
        const result = await res.json()
        console.log('result is here', result)

        if (!res.ok) {
          return alert(result.message)
        }

        alert(result.message)
      } catch (err) {
        alert(err.message)
      }
    }

    return (
      <>
        <section>
          <Container>
            {loading && <h4 className="text-center pt-5">Loading.........</h4>}
            {error && <h4 className="text-center pt-5">{error}</h4>}
            {!loading && !error && tour && (
              <Row>
                <Col lg="8">
                  <div className="tour__content">
                    {tour && photo && photo.length >= 0 ? (
                      <img
                        src={`http://localhost:7007/${photo[0].filePath}`}
                        alt=""
                      />
                    ) : (
                      <h2>Loading...</h2>
                    )}

                    <div className="tour__info">
                      <h2>{title}</h2>
                      <div className="d-flex align-items-center gap-5">
                        <span className="tour__rating d-flex align-items-center gap-1">
                          <i
                            className="ri-star-fill"
                            style={{ color: 'var(--secondary-color)' }}
                          ></i>
                          {avgRating == 0 ? null : avgRating}{' '}
                          {totalRating == 0 ? (
                            'Not rated'
                          ) : (
                            <span>({reviews?.length})</span>
                          )}
                        </span>

                        <span>
                          <i className="ri-map-pin-user-fill"></i> {address}
                        </span>
                      </div>
                      <div className="tour__extra-details">
                        <span>
                          <i className="ri-map-pin-2-line"></i> {city}
                        </span>
                        <span>
                          <i className="ri-money-dollar-circle-line"></i> $
                          {price} / per person
                        </span>
                         <span>
                          <i className="ri-map-pin-time-line"></i> {distance}{' '}
                          k/m
                        </span> 
                        <span>
                          <i className="ri-group-line"></i> {maxGroupSize}{' '}
                          people
                        </span>
                      </div>
                      <h5>Description</h5>
                      <p>{desc}</p>
                    </div>

                    <div className="tour__reviews mt-4">
                      <h4>Reviews ({reviews?.length}reviews)</h4>
                      <Form onSubmit={submitHandler}>
                        <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                          <span onClick={() => setTourRating(1)}>
                            1 <i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setTourRating(2)}>
                            2 <i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setTourRating(3)}>
                            3 <i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setTourRating(4)}>
                            4 <i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setTourRating(5)}>
                            5 <i className="ri-star-s-fill"></i>
                          </span>
                        </div>
                        <div className="review__input">
                          <input
                            type="text"
                            ref={reviewMsgRef}
                            placeholder="share your thoughts"
                            required
                          />
                          <button
                            className="btn primary__btn text-white"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </Form>
                      <ListGroup className="user__reviews">
                        {reviews?.map((review) => (
                          <div className="review__item">
                            <img src={avatar} alt="" />

                            <div className="w-100">
                              <div className="d-flex align-items-center justify-content-between">
                                <div>
                                  <h5>{review.username}</h5>
                                  <p>
                                    {new Date(
                                      review.createdAt,
                                    ).toLocaleDateString('en-US', options)}
                                  </p>
                                </div>
                                {user && user.role === 'user' ? (
                                  <span className="d-flex align-items-center">
                                    {review.rating}
                                    <i className="ri-star-s-fill"></i>
                                  </span>
                                ) : null}
                              </div>
                              {user && user.role === 'user' ? (
                                <h6>{review.reviewText}</h6>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </ListGroup>
                    </div>
                  </div>
                </Col>
                <Col lg="4">
                  <Booking tour={tour} avgRating={avgRating} reviews={reviews} />
                </Col>
              </Row>
            )}
          </Container>
        </section>
        <Newsletter />
      </>
    )
  }
  return (
    <>
      <div>Loading</div>
    </>
  )
}

export default TourDetails
