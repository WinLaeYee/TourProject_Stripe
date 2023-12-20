/* import React, { useContext, useRef, useState, useEffect } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './Header.css';
import { AuthContext } from '../../context/AuthContext';

const nav__links = [
  {
    path: '/home',
    display: 'Home',
  },
  {
    path: '/tours',
    display: 'Tours',
  },

];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener('scroll', stickyHeaderFunc);
  }, []);

  const toggleMenu = () => {
    menuRef.current.classList.toggle('show__menu');
  };

  return (
    <>
      <header className="header" ref={headerRef}>
        <Container>
          <Row>
            <div className="nav__wrapper d-flex align-items-center justify-content-between">
              <div className="logo">
                <img src={logo} alt="" />
              </div>
              <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                <ul className="menu d-flex align-items-center gap-5">
                  {nav__links.map((item, index) => (
                    <li className="nav__item" key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? 'active__link' : ''
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}

                  
                  {user && user.role === 'admin' && (
                    <>
                      <li className="nav__item">
                        <NavLink to="/createTour">Create</NavLink>
                      </li>
                      <li className="nav__item">
                        <NavLink to="/booking">Bookings</NavLink>
                      </li>
                    </>
                  )}

                  {user && user.role === 'user' && (
                    <li className="nav__item">
                      <NavLink to="/my-bookings">My Bookings</NavLink>
                    </li>
                  )}
                </ul>
              </div>
              <div className="nav__right d-flex align-items-center gap-4">
                <div className="nav__btns d-flex align-items-center gap-4">
                  {user ? (
                    <>
                      <h5 className="mb-0">{user.username}</h5>
                      <Button className="btn btn-dark" onClick={logout}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="btn secondary__btn">
                        <Link to="/login">Login</Link>
                      </Button>
                      <Button className="btn primary__btn">
                        <Link to="/register">Register</Link>
                      </Button>
                    </>
                  )}
                </div>
                <span className="mobile__menu" onClick={toggleMenu}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </Row>
        </Container>
      </header>
    </>
  );
};

export default Header;
 */



import React, { useContext, useState } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/images/logo.png';
import BookingList from '../../pages/BookingList';
import './Header.css';

const Header = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [showBookingList, setShowBookingList] = useState(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    setShowBookingList(false); // Hide BookingList on logout
  };

  const handleAdminLogin = () => {
    setShowBookingList(true); // Show BookingList when admin logs in
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user ? (
                <>
                  <LinkContainer to="/home">
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/tours">
                    <Nav.Link>Tours</Nav.Link>
                  </LinkContainer>
                  <NavDropdown title={`${user.username}`} id="basic-nav-dropdown">
                    {user.role === 'admin' && (
                      <>
                        <LinkContainer to="/dashboard">
                          <NavDropdown.Item>Dashboard</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/createTour">
                          <NavDropdown.Item>Create Tour</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/booking">
                          <NavDropdown.Item onClick={handleAdminLogin}>
                            All Booking Lists
                          </NavDropdown.Item>
                        </LinkContainer>
                      </>
                    )}

                    <LinkContainer to="/my-bookings">
                      <NavDropdown.Item>My Bookings</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* {showBookingList && <BookingList />} */}
    </>
  );
};

export default Header;
