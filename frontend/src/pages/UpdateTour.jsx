import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import Newsletter from '../shared/Newsletter'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../styles/createtour.css'

import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'

const UpdateTour = () => {
  const initialState = {
    title: '',
    city: '',
    address: '',
    distance: '',
    photo: [],
    desc: '',
    price: '',
    maxGroupSize: '',
  }

  const { id } = useParams()

  const navigate = useNavigate()

  const [tourData, setTourData] = useState(initialState)

  const handleChange = (e) => {
    if (e.target.name === 'photo') {
      return setTourData((prevState) => ({
        ...prevState,
        photo: e.target.files[0],
      }))
    }
    setTourData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  console.log('state data', tourData)
  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', tourData.title)
    formData.append('city', tourData.city)
    formData.append('address', tourData.address)
    formData.append('distance', tourData.distance)
    formData.append('photo', tourData.photo)
    formData.append('desc', tourData.desc)
    formData.append('price', tourData.price)
    formData.append('maxGroupSize', tourData.maxGroupSize)

    console.log('form data result', formData)
    try {
      const res = await fetch(`${BASE_URL}/tours/updateTour/${id}`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      })

      const result = await res.json()

      if (!res.ok) {
        alert(result.message)
      } else {
        // navigate(`/tours/${id}`)
        navigate('/tours')
        alert(result.message)
      }
    } catch (err) {
      alert('Failed to update tour, please try again')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tours/${id}`, {
          method: 'GET',
          credentials: 'include',
        })

        if (response.ok) {
          const data = await response.json()
          const result = data?.data[0]
          setTourData(result)
        } else {
          console.error('Error fetching data:', response.statusText)
        }
      } catch (err) {
        console.error('An error occurred:', err)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8" className="m-auto">
              <div className="create-tour__container">
                <div className="create-tour__form">
                  <h2>Update Tour</h2>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter Title"
                      value={tourData.title || ''}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="Enter City"
                      value={tourData.city || ''}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter Address"
                      value={tourData.address || ''}
                      onChange={handleChange}
                    />
                    <input
                      type="number"
                      name="distance"
                      placeholder="Enter Distance"
                      value={tourData.distance || ''}
                      onChange={handleChange}
                    />
                    <input
                      type="file"
                      name="photo"
                      placeholder="Select File"
                      onChange={handleChange}
                    />
                    <textarea
                      name="desc"
                      id="desc"
                      cols="10"
                      rows="5"
                      placeholder="Enter Description"
                      value={tourData.desc || ''}
                      onChange={handleChange}
                    ></textarea>
                    <input
                      type="number"
                      name="price"
                      placeholder="Enter Price"
                      value={tourData.price || ''}
                      onChange={handleChange}
                    />
                    <input
                      type="number"
                      name="maxGroupSize"
                      placeholder="Enter MaxGroupSize"
                      value={tourData.maxGroupSize || ''}
                      onChange={handleChange}
                    />
                    <label htmlFor="featured">Featured</label>
                    <input type="checkbox" id="featured" />
                    <button
                      className="btn secondary__btn auth__btn"
                      type="submit"
                    >
                      Update Tour
                    </button>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  )
}

export default UpdateTour
