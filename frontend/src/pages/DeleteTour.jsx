import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'reactstrap';
import Newsletter from '../shared/Newsletter';
import { useParams, useNavigate } from 'react-router-dom'; 
import { BASE_URL } from '../utils/config';

const DeleteTour = () => {
 
  const { id } = useParams();

 
  const navigate = useNavigate();

  
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch(`${BASE_URL}/tours/${id}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
      
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

  
    fetchData();
  }, [id]);

  
  const handleDelete = async () => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this tour? This action cannot be undone!'
    );

    if (!shouldDelete) {
    
      return;
    }
    try {
    
      const response = await fetch(`${BASE_URL}/tours/deleteTour/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        
        navigate('/tours'); 
      } else {
        console.error('Error deleting tour:', response.statusText);
      }
    } catch (err) {
      console.error('An error occurred:', err);
    }
  };

  
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
                  
                  </Form>
               
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
     
      <Newsletter />
    </>
  );
};

export default DeleteTour;



