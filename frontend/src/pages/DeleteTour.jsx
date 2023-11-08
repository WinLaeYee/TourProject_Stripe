import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'reactstrap';
import Newsletter from '../shared/Newsletter';
import { useParams, useNavigate } from 'react-router-dom'; 
import { BASE_URL } from '../utils/config';

const DeleteTour = () => {
  // 1. Retrieve the tour ID from the URL using useParams
  const { id } = useParams();

  // 2. Initialize the useNavigate hook to enable navigation
  const navigate = useNavigate();

  // 3. Initialize the tourData state with default values
  const [tourData, setTourData] = useState({
    title: '',
    city: '',
    address: '',
    distance: '',
    photo: '',
    desc: '',
    price: '',
    maxGroupSize: '',
    featured: false,
  });

  // 4. Fetch the tour data from the server when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 5. Send a GET request to fetch tour data by ID
        const response = await fetch(`${BASE_URL}/tours/${id}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          // 6. If the response is successful, parse and set the tourData state
          const data = await response.json();
          const result = data?.data[0];
          setTourData(result);
        } else {
          console.log('Error fetching data:', response.statusText);
        }
      } catch (err) {
        console.log('An error occurred:', err);
      }
    };

    // 7. Call the fetchData function when the component mounts
    fetchData();
  }, [id]);

  // 8. Handle the tour deletion when the "Delete Tour" button is clicked
  const handleDelete = async () => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this tour? This action cannot be undone!'
    );

    if (!shouldDelete) {
      // If the user cancels, do nothing
      return;
    }
    try {
      // 9. Send a DELETE request to the server to delete the tour by ID
      const response = await fetch(`${BASE_URL}/tours/deleteTour/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        // 10. If deletion is successful, navigate to a success page or another route
        navigate('/tours'); // Use navigate to navigate to the desired route
      } else {
        console.error('Error deleting tour:', response.statusText);
      }
    } catch (err) {
      console.error('An error occurred:', err);
    }
  };

  // 11. Render the DeleteTour component
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8" className="m-auto">
              <div className="delete-tour__container">
                <div className="delete-tour__form">
                  <h2>Delete Tour</h2>
                  <Form>
                    {/* 12. Display tour information (similar to your update form) */}
                    <div className="form-group">
                      <label htmlFor="title">Title:</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={tourData.title || ''}
                        readOnly // Make the input read-only for deletion
                        className="form-control"
                      />
                    </div>
                    {/* Repeat similar code for other tour properties */}
                  </Form>
                  {/* 13. The "Delete Tour" button triggers the handleDelete function when clicked */}
                  <Button
                    className="btn secondary__btn auth__btn"
                    onClick={handleDelete}
                  >
                    Delete Tour
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* 14. Render the Newsletter component */}
      <Newsletter />
    </>
  );
};

export default DeleteTour;



