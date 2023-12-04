import { config } from "dotenv";
import { Stripe } from "stripe";
import Booking from "../models/Booking.js";
import { createTemplate } from "./template.js";
import { calculateTax} from '../utils/calculateTax.js'

config();

const stripe = Stripe(process.env.STRIPE_KEY);

export const stripeAccess = async (req, res) => {
  // console.log("data reached");
  const { booking } = req.body;
  // console.log("backend Booking", booking);

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
    },
  });
  try {

    const taxAmount = calculateTax(booking.totalAmount);


    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: booking.tourName,
            description: booking.desc,
            metadata: {
              userId: booking.userId, 
              phone: booking.phone,
            },
          },
          unit_amount: booking.totalAmount * 100,
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Tax",
            description: "Sales Tax",
          },
          unit_amount: taxAmount * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      line_items,
      customer: customer.id,
      client_reference_id: booking._id,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success/${booking._id}/${booking.userId}`,
      cancel_url: `${process.env.CLIENT_URL}/`,
    });

    res.send({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* const calculateTax = (totalAmount) => {
 
  const taxRate = 0.1; // 10%
  const taxAmount = totalAmount * taxRate;
  return taxAmount;
}; */

export const handleWebhookEvent = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let data;
  let eventType;

  let endpointSecret;
  // endpointSecret =
  //   "whsec_e73f75173a37acc7b4dc87974e716a457d4faa76e1c8966d2abb513904e245e1";
  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("webhook verified");
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the event

  if (eventType === "checkout.session.completed") {
    console.log("webhook data", data);
    const bookingId = data.client_reference_id;
    const customerDetail = data.customer_details.address;
   

    try {
     
      const result = await Booking.findById(bookingId);

      
      if (result && !result.stripe_payment) {
       
        await Booking.findByIdAndUpdate(bookingId, {
          $set: {
            stripe_payment: true,
            address: customerDetail,
            paidAt: new Date(),
          },
        });
      } else {
        console.log("Something went wrong, try again.");
      }
      await createTemplate(bookingId);
    } catch (error) {
      console.error("Error updating booking:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

 
  res.send().end();
};
