

import React from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from '@react-pdf/renderer'
import { calculateTax } from '../utils/calculateTax.js';




const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#F5F5F5',
  },

  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#008080',
    
  },



  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },

  sectionSubtitle: {
    fontSize: 20,
    marginBottom: 10,
    color: '#555',
  },

  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    gap: 4,
  },

  value: {
    fontSize: 22,
    marginBottom: 20,
    color: '#555',
  },

  totalAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#008000',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 40,
  },

  thankYouText: {
    fontSize: 22,
    marginBottom: 20, // Adjusted marginBottom for spacing
    marginLeft: 40,
  },

  note: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },

  viewContainer: {
    marginBottom: 20,
   
  },
})

export const MyPDF = ({ data }) => {
  console.log('objects invoiceData', data);

  const taxAmount = calculateTax(data?.booking?.totalAmount);
  const totalAmountWithTax = data?.booking?.totalAmount + taxAmount;

  return (
    <>
      <PDFDownloadLink
        document={
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.header}>
               
                <Text
                  style={styles.sectionTitle}
                >{`Invoice: ${data?.booking?._id}`}</Text>
              </View>

              <View style={{ ...styles.viewContainer, marginLeft: 40 }}>
                <Text style={styles.label}>Customer Name:</Text>
                <Text style={styles.value}>{data?.booking?.fullName}</Text>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.value}>
                  {`${data?.booking?.address?.line1}${data?.booking?.address?.line2}${data?.booking?.address?.city}`}
                </Text>
                <Text style={styles.label}>Country:</Text>
                <Text style={styles.value}>
                  {data?.booking?.address?.country}
                </Text>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{data?.booking?.phone}</Text>
              </View>

              <View style={{ ...styles.viewContainer, marginLeft: 40 }}>
                <Text style={styles.label}>Tour Name:</Text>
                <Text style={styles.value}>{data?.booking?.tourName}</Text>
                <Text style={styles.label}>Number of Guests:</Text>
                <Text style={styles.value}>{data?.booking?.guestSize}</Text>
                <Text style={styles.label}>Total Amount:</Text>
                <Text style={styles.value}>${data?.booking?.totalAmount}</Text>
                <Text style={styles.label}>Tax:</Text>
                <Text style={styles.value}>${taxAmount}</Text>
                

              </View>

              <Text style={styles.totalAmount}>
                  Total Amount (including Tax): ${totalAmountWithTax}
                </Text>

              <View style={styles.thankYouText}>
              <Text style={styles.value}>Thank you for your booking with our TravelWorld!!!</Text>
              </View>

            </Page>
          </Document>
        }
        fileName="invoice.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            'Loading document...'
          ) : (
            <button className="btn bg-white btn-light mx-1px text-95">
            Export as PDF
          </button>
          )
        }
      </PDFDownloadLink>
    </>
  )
}
