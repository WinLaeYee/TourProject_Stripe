import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import '../styles/approve.css'

const WaitingApproval = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="pt-5 text-center">
            <div className="approve">
              <span>
                <i className="ri-checkbox-circle-line"></i>
              </span>
              <h1 className="mb-3 fw-semibold">Please wait for approval by admin</h1>
              <h3 className="mb-4">Your booking is pending approval. We'll notify you once it's approved</h3>
              

              <Button className="btn primary__btn w-25">
                <Link to="/my-bookings">Back to Bookings</Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default WaitingApproval

