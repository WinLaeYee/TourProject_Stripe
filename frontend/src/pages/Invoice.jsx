import React from 'react'
import './Invoice.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { MyPDF } from '../components/MyPDF'
import { calculateTax } from '../utils/calculateTax.js'
import { formatDate } from '../utils/formatDate.js'

const Invoice = () => {
  const { id, userId } = useParams()
  const [data, setData] = useState('')
  const [taxAmount, setTaxAmount] = useState(0)
  console.log('booking id', id)
  console.log('userId ', userId)



  useEffect(() => {
    if (data?.booking?.totalAmount) {
      const calculatedTax = calculateTax(data.booking.totalAmount)
      setTaxAmount(calculatedTax)
    }
  }, [data])
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `http://localhost:7007/api/user/confirmed-booking/${id}/${userId}`,
          {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
            },
            credentials: 'include',
          },
        )
        const result = await res.json()
        setData(result)
        console.log('confirm booking results is here', result)
      } catch (error) {
        console.error('error', error)
      }
    }
    fetchData()
  }, [])

  console.log('data', data)
  //const date = data?.booking?.paidAt

  //const formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss')

  return (
    <div className="mb-3">
      <div className="page-content container">
        <div className="page-header text-blue-d2">
          <h1 className="page-title text-secondary-d1">
            Invoice
            <small className="page-info">
              <i className="fa fa-angle-double-right text-80"></i>
              ID: {data?.booking?._id}
            </small>
          </h1>

          <div className="page-tools">
            <div className="action-buttons">
              <a
                className="btn bg-white btn-light mx-1px text-95"
                href="#"
                data-title="Print"
              >
                <i className="mr-1 fa fa-print text-primary-m1 text-120 w-2"></i>
                Print
              </a>
              <MyPDF data={data} />
            </div>
          </div>
        </div>

        <div className="container px-0">
          <div className="row mt-4">
            <div className="col-12 col-lg-12">
              <div className="row">
                <div className="col-12">
                  <div className="text-center text-150">
                    <i className="fa fa-book fa-2x text-success-m2 mr-1"></i>
                    <span className="text-default-d3">TravelWorld.com</span>
                  </div>
                </div>
              </div>

              <hr className="row brc-default-l1 mx-n1 mb-4" />

              <div className="row">
                <div className="col-sm-6">
                  <div>
                    <span className="text-sm text-grey-m2 align-middle">
                      To:
                    </span>
                    <span className="text-600 text-110 text-blue align-middle">
                      {data?.booking?.fullName}
                    </span>
                  </div>
                  <div className="text-grey-m2">
                    <div className="my-1">
                      Street: {data?.booking?.address?.line1} \{' '}
                      {data?.booking?.address?.line2}, City:{' '}
                      {data?.booking?.address?.city}
                    </div>
                    <div className="my-1">
                      Country: {data?.booking?.address?.country}
                    </div>
                    <div className="my-1">
                      <i className="fa fa-phone fa-flip-horizontal text-secondary"></i>{' '}
                      <b className="text-600">Mobile: {data?.booking?.phone}</b>
                    </div>
                  </div>
                </div>

                <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                  <hr className="d-sm-none" />
                  <div className="text-grey-m2">
                    <div className="my-2">
                      <i className="fa fa-circle text-blue-m2 text-xs mr-1"></i>{' '}
                      <span className="text-600 text-90">
                        Issue Date: {formatDate(data?.booking?.paidAt)}
                      </span>{' '}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="row text-600 text-white bgc-default-tp1 py-25">
                  <div className="d-none d-sm-block col-1">#</div>
                  <div className="col-9 col-sm-5">Tour Name</div>
                  <div className="col-2">City</div>
                  <div className="d-none d-sm-block col-4 col-sm-2">Person</div>
                  <div className="col-2">Total Price</div>
                </div>

                <div className="text-95 text-secondary-d3">
                  <div className="row mb-2 mb-sm-0 py-25">
                    <div className="d-none d-sm-block col-1">1</div>
                    <div className="col-9 col-sm-5">
                      {data?.booking?.tourName}
                    </div>
                    <div className="col-2">{data?.booking?.city}</div>
                    <div className="d-none d-sm-block col-2">
                      {data?.booking?.guestSize}
                    </div>
                    <div className="d-none d-sm-block col-2 text-95">
                      ${data?.booking?.totalAmount}
                    </div>
                  </div>
                </div>

                <div className="row border-b-2 brc-default-l2"></div>

                <div className="row mt-3">
                  <div className="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0">
                    Extra note such as company or payment information...
                  </div>

                  <div className="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
                    <div className="row my-2">
                      <div className="col-7 text-right">SubTotal</div>
                      <div className="col-5">
                        <span className="text-120 text-secondary-d1">
                          ${data?.booking?.totalAmount}
                        </span>
                      </div>
                    </div>

                    <div className="row my-2">
                      <div className="col-7 text-right">Tax(10%)</div>
                      <div className="col-5">
                        <span className="text-120 text-secondary-d1">
                          ${taxAmount}
                        </span>
                      </div>
                    </div>

                    <div className="row my-2 align-items-center bgc-primary-l3 p-2">
                      <div className="col-7 text-right">Total Amount</div>
                      <div className="col-5">
                        <span className="text-150 text-success-d3 opacity-2">
                          ${data?.booking?.totalAmount + taxAmount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              <div>
                <span className="text-secondary-d1 text-105">
                  Thank you for your booking.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invoice
