import React from 'react'
import Invoice from './Invoice'

const CheckoutSuccess = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center py-3"
        style={{ fontSize: '20px', color: 'blue' }}
      >
        Your payment is successful.
      </div>
      <div style={{ border: '1px solid grey' }}>
        <Invoice />
      </div>
    </>
  )
}

export default CheckoutSuccess
