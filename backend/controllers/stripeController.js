import { config } from "dotenv";
import { Stripe } from "stripe";
import Booking from "../models/Booking.js";

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
    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: booking.tourName,
            description: booking.desc,
            metadata: {
              userId: booking.userId, // Add userId to metadata
              phone: booking.phone, // Add phone to metadata
            },
          },
          unit_amount: booking.totalAmount * 100,
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
  }
};

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
    /* const result = await Booking.find({
      _id: bookingId,
      stripe_payment: false,
    });
    if (!result) return res.status(404).json({ message: "Not Found" });
    await Booking.updateOne({
      $set: {
        stripe_payment: true,
        address: customerDetail,
        paidAt: new Date(),
      },
    });
  } */

  
  try {
    // Find the booking using findById instead of find
    const result = await Booking.findById(bookingId);

    // Check if the booking is found and stripe_payment is false
    if (result && !result.stripe_payment) {
      // Update the booking with the required information
      await Booking.findByIdAndUpdate(bookingId, {
        $set: {
          stripe_payment: true,
          address: customerDetail,
          paidAt: new Date(),
        },
      });
    } else {
      console.log("Booking not found or already paid.");
    }
  } catch (error) {
    console.error("Error updating booking:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
};
