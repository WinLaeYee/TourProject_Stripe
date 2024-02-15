


import React, { useState, useEffect, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const TourTableComponent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const toursPerPage = 5; // Number of tours per page
  const [totalTours, setTotalTours] = useState(0);
  const fetchTours = async () => {
    try {
      const response = await fetch(`http://localhost:7007/api/tours?page=${currentPage}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch tours. Status: ${response.status}`);
      }

      const data = await response.json();
      setTours(data.data);
      setTotalTours(data.count); // Set the total count from the backend
     
      setTotalPages(Math.ceil(data.count / toursPerPage));
    } catch (error) {
      console.error('Error fetching tours:', error.message);
    }
  };

  useEffect(() => {
  

    fetchTours();
  }, [currentPage]);

  const handleDeleteTour = async (tourId) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      try {
        const token = localStorage.getItem('authToken');
        const userId = user?.id;

        console.log('Deleting tour. Tour ID:', tourId, 'User ID:', userId);

        const response = await fetch(`http://localhost:7007/api/tours/deleteTour/${tourId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'X-User-ID': userId,
          },
        });

        if (response.ok) {
          console.log('Tour deleted. Fetching updated tours...');
          fetchTours();
          navigate('/dashboard');
          
        } else {
          console.error('Failed to delete tour. Status:', response.status);
        }
      } catch (error) {
        console.error('Error deleting tour:', error.message);
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <h2>Tours</h2>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Tour</th>
            <th>Title</th>
            <th>City</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour._id}>
              <td>
                <img
                  src={`http://localhost:7007/${tour.photo[0].filePath}`}
                  alt={tour.title}
                  style={{ width: '80px', height: '80px', borderRadius: '5%', display: 'block', margin: 'auto' }}
                />
              </td>
              <td>{tour.title}</td>
              <td>{tour.city}</td>
              <td>{tour.price}</td>
              <td>
                <Link to={`/deleteTour/${tour._id}`} className="btn btn-danger">
                  Delete
                </Link>
                <Link to={`/edit-tour/${tour._id}`} className="btn btn-warning">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TourTableComponent;
