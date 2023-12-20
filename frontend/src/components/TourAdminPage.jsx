/* import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TourTableComponent = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('http://localhost:7007/api/tours');
        const data = await response.json();
        setTours(data.data);
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };

    fetchTours();
  }, []);

  const handleDeleteTour = async (tourId) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      try {
        const response = await fetch(`http://localhost:7007/api/tours/${tourId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
         
          fetchTours();
        } else {
          console.error('Failed to delete tour');
        }
      } catch (error) {
        console.error('Error deleting tour:', error);
      }
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
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <img
                  src={`http://localhost:7007/${tour.photo[0].filePath}`}
                  alt={tour.title}
                  style={{ width: '80px', height: '80px',borderRadius: '5%', display: 'block', margin: 'auto' }}
                />
              </td>
              <td>{tour.title}</td>
              <td>{tour.city}</td>
              <td>{tour.price}</td>
              <td>
                <Button onClick={() => handleDeleteTour(tour._id)}>Delete</Button>
                <Link to={`/edit-tour/${tour._id}`} className="btn btn-warning">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TourTableComponent;
 */


/* import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TourTableComponent = () => {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`http://localhost:7007/api/tours?page=${currentPage}`);
        const data = await response.json();
        setTours(data.data);
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };

    fetchTours();
  }, [currentPage]);

  const handleDeleteTour = async (tourId) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      try {
        const response = await fetch(`http://localhost:7007/api/tours/${tourId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchTours();
         
        } else {
          console.error('Failed to delete tour');
        }
      } catch (error) {
        console.error('Error deleting tour:', error);
      }
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
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
                <Button onClick={() => handleDeleteTour(tour._id)}>Delete</Button>
                <Link to={`/edit-tour/${tour._id}`} className="btn btn-warning">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={() => handlePageChange(currentPage - 1)} >
        Previous
      </Button>
      <Button onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
    </div>
  );
};

export default TourTableComponent;
 */


/* import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TourTableComponent = () => {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`http://localhost:7007/api/tours?page=${currentPage}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch tours. Status: ${response.status}`);
        }

        const data = await response.json();
        setTours(data.data);
      } catch (error) {
        console.error('Error fetching tours:', error.message);
      }
    };

    fetchTours();
  }, [currentPage]);

  const handleDeleteTour = async (tourId) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:7007/api/tours/deleteTour/${tourId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          await fetchTours();
        } else {
          console.error('Failed to delete tour. Status:', response.status);
        }
      } catch (error) {
        console.error('Error deleting tour:', error.message);
      }
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
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
                <Button onClick={() => handleDeleteTour(tour._id)}>Delete</Button>
                <Link to={`/edit-tour/${tour._id}`} className="btn btn-warning">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={() => handlePageChange(currentPage - 1)} >
        Previous
      </Button>
      <Button onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
    </div>
  );
};

export default TourTableComponent;
 */


// TourTableComponent.js

/* import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TourTableComponent = () => {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`http://localhost:7007/api/tours?page=${currentPage}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch tours. Status: ${response.status}`);
        }

        const data = await response.json();
        setTours(data.data);
      } catch (error) {
        console.error('Error fetching tours:', error.message);
      }
    };

    fetchTours();
  }, [currentPage]);

  const handleDeleteTour = async (tourId) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:7007/api/tours/deleteTour/${tourId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          await fetchTours();
        } else {
          console.error('Failed to delete tour. Status:', response.status);
        }
      } catch (error) {
        console.error('Error deleting tour:', error.message);
      }
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
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
                <Button onClick={() => handleDeleteTour(tour._id)}>Delete</Button>
                <Link to={`/edit-tour/${tour._id}`} className="btn btn-warning">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={() => handlePageChange(currentPage - 1)} >
        Previous
      </Button>
      <Button onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
    </div>
  );
};

export default TourTableComponent;
 */

/* import React, { useState, useEffect, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const fetchTours = async (currentPage, setTours) => {
  try {
    const response = await fetch(`http://localhost:7007/api/tours?page=${currentPage}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch tours. Status: ${response.status}`);
    }

    const data = await response.json();
    setTours(data.data);
  } catch (error) {
    console.error('Error fetching tours:', error.message);
  }
};

const TourTableComponent = () => {
  const { user } = useContext(AuthContext);

  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTours(currentPage, setTours);
  }, [currentPage]);

  const handleDeleteTour = async (tourId) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
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
          fetchTours(currentPage, setTours);
        } else {
          console.error('Failed to delete tour. Status:', response.status);
        }
      } catch (error) {
        console.error('Error deleting tour:', error.message);
      }
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
                <Button onClick={() => handleDeleteTour(tour._id)}>Delete</Button>
                <Link to={`/edit-tour/${tour._id}`} className="btn btn-warning">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={() => handlePageChange(currentPage - 1)} >
        Previous
      </Button>
      <Button onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
    </div>
  );
};

export default TourTableComponent;
 */


import React, { useState, useEffect, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const fetchTours = async (currentPage, setTours) => {
  try {
    const response = await fetch(`http://localhost:7007/api/tours?page=${currentPage}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch tours. Status: ${response.status}`);
    }

    const data = await response.json();
    setTours(data.data);
  } catch (error) {
    console.error('Error fetching tours:', error.message);
  }
};

const TourTableComponent = () => {
  const { user } = useContext(AuthContext);

  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTours(currentPage, setTours);
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
          fetchTours(currentPage, setTours);
        } else {
          console.error('Failed to delete tour. Status:', response.status);
        }
      } catch (error) {
        console.error('Error deleting tour:', error.message);
      }
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
      <Button onClick={() => handlePageChange(currentPage - 1)} >
        Previous
      </Button>
      <Button onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
    </div>
  );
};

export default TourTableComponent;
