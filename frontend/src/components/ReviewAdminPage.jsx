/* 
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const ReviewTableComponent = () => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('http://localhost:7007/api/review/allreviews');
                const data = await response.json();
                setReviews(data.data);

            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError('Failed to fetch reviews. Please try again later.');
            }
        };

        fetchReviews();
    }, []);

 
    return (
      <div>
          {error ? (
              <p style={{ color: 'red' }}>{error}</p>
          ) : (
              <>
                  <h2>All Reviews</h2>
                  <Table responsive striped bordered hover>
                      <thead>
                          <tr>
                              <th>User</th>
                              <th>Rating</th>
                              <th>Comment</th>
                          </tr>
                      </thead>
                      <tbody>
                          {reviews.map((review) => (
                              <tr key={review._id}>
                                  <td>{review.username}</td>
                                  <td>{review.rating}</td>
                                  <td>{review.reviewText}</td>
                              </tr>
                          ))}
                      </tbody>
                  </Table>
              </>
          )}
      </div>
  );
};

export default ReviewTableComponent;
 */


import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const ReviewTableComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:7007/api/review/allreviews', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user reviews');
        }

        const data = await response.json();
        setReviews(data.data || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to fetch reviews. Please try again later.');
      }
    };

    fetchReviews();
  }, []);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <h2>All Reviews</h2>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>User</th>
                <th>Rating</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {currentReviews.map(({ username, rating, reviewText }, index) => (
                <tr key={index}>
                  <td>{username}</td>
                  <td>{rating}</td>
                  <td>{reviewText}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="pagination">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Prev
            </button>
            <span>{currentPage}</span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewTableComponent;
