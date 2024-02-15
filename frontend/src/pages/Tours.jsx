/* import React, { useState, useEffect } from 'react'

import CommonSection from '../shared/CommonSection'

import '../styles/tour.css'
import TourCard from '../shared/TourCard'
import SearchBar from '../shared/SearchBar'
import Newsletter from '../shared/Newsletter'
import { Container, Row, Col } from 'reactstrap'

import useFetch from '../hooks/userFetch'
import { BASE_URL } from '../utils/config'

const Tours = () => {
  const [pageCount, setPageCount] = useState(0)
  const [page, setPage] = useState(0)

  const { data: tours, loading, error } = useFetch(
    `${BASE_URL}/tours?page=${page}`,
  )

  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`)

  //console.log('Back data', tours)

  useEffect(() => {
    console.log('Page:', page);
  console.log('Tour Count:', tourCount);
  console.log('Tours:', tours);
    const pages = Math.ceil((tourCount || 0) / 8)
    setPageCount(pages)
    if(page === 0){
      setPage(1)
    }
    window.scrollTo(0, 0)
  }, [page, tourCount, tours])

  return (
    <>
      <CommonSection title={'All Tours'} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading........</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}

          {!loading && !error && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" md="6" sm="6" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? 'active__page' : ''}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  )
}

export default Tours */


import React, { useState, useEffect } from 'react';
import CommonSection from '../shared/CommonSection';
import '../styles/tour.css';
import TourCard from '../shared/TourCard';
import SearchBar from '../shared/SearchBar';
import Newsletter from '../shared/Newsletter';
import { Container, Row, Col } from 'reactstrap';
import useFetch from '../hooks/userFetch';
import { BASE_URL } from '../utils/config';

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    console.log('Page:', page);
    console.log('Tour Count:', tourCount);
    console.log('Tours:', tours);
    console.log('Loading:', loading);
    console.log('Error:', error);

    const pages = Math.ceil((tourCount || 0) / 8);
    setPageCount(pages);

    // Ensure that the initial page is set to 1
    if (page === 0) {
      setPage(1);
    }

    window.scrollTo(0, 0);
  }, [page, tourCount, tours, loading, error]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pageCount) {
      setPage(newPage);
    }
  };

  return (
    <>
      <CommonSection title={'All Tours'} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading........</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}

          {!loading && !error && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" md="6" sm="6" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => handlePageChange(number + 1)}
                      className={page === number + 1 ? 'active__page' : ''}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Tours;

