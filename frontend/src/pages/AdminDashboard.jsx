import React from 'react'

import { Container, Nav, Tab, Col, Row } from "react-bootstrap";
import BookingAdminPage from '../components/BookingAdminPage';
import ReviewAdminPage from '../components/ReviewAdminPage';
import TourAdminPage from '../components/TourAdminPage';
import UserAdminPage from '../components/UserAdminPage';

const AdminDashboard = () => {
  return (
    <Container>
    <Tab.Container defaultActiveKey="tours">
        <Row>
            <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                        <Nav.Link eventKey="tours">Tours</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="bookings">Bookings</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="users">Users</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="reviews">Reviews</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Col>
            <Col sm={9}>
                <Tab.Content>
                    <Tab.Pane eventKey="tours">
                        <TourAdminPage />
                    </Tab.Pane>
                    <Tab.Pane eventKey="bookings">
                        <BookingAdminPage/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="users">
                        <UserAdminPage />
                    </Tab.Pane>
                    <Tab.Pane eventKey="reviews">
                        <ReviewAdminPage />
                    </Tab.Pane>
                </Tab.Content>
            </Col>
        </Row>
    </Tab.Container>
</Container>
  )
}

export default AdminDashboard