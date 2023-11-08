import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import Newsletter from '../shared/Newsletter'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/createtour.css'

import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'

const CreateTour = () => {
  const [title, setTitle] = useState()
  const [city, setCity] = useState()
  const [address, setAddress] = useState()
  const [distance, setDistance] = useState()
  const [file, setFile] = useState()
  const [desc, setDesc] = useState()
  const [price, setPrice] = useState()
  const [maxGroupSize, setMaxGroupSize] = useState()
 

  const navigate = useNavigate()

  console.log('file data', file)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('city', city)
    formData.append('address', address)
    formData.append('distance', distance)
    formData.append('file', file)
    formData.append('desc', desc)
    formData.append('price', price)
    formData.append('maxGroupSize', maxGroupSize)
   
    try {
      const res = await fetch(`${BASE_URL}/tours/createTour`, {
        method: 'post',
       
        credentials: 'include',
        body: formData,
      })
      console.log(formData);
      const result = await res.json()

      if (!res.ok) {
        alert(result.message)
      } else {
        navigate('/tours')
      }
    } catch (err) {
      alert('Failed to create tour, please try again')
    }
  }

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8" className="m-auto">
              <div className="create-tour__container">
                <div className="create-tour__form">
                  <h2>Create a New Tour</h2>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Enter Title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Enter City"
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Enter Address"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Enter Distance"
                      onChange={(e) => setDistance(e.target.value)}
                    />
                   
                    <input
                      type="file"
                      placeholder="Select File"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <textarea
                      name="desc"
                      id="desc"
                      cols="10"
                      rows="5"
                      placeholder="Enter Description"
                      onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                    <input
                      type="number"
                      placeholder="Enter Price"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Enter MaxGroupSize"
                      onChange={(e) => setMaxGroupSize(e.target.value)}
                    />
                    <label htmlFor="featured">Featured</label>
                    <input type="checkbox"  />
                    <button
                      className="btn secondary__btn auth__btn"
                      type="submit"
                    >
                      Create Tour
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

export default CreateTour
