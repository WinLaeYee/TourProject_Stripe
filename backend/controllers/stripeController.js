import { config } from "dotenv";
import { Stripe } from "stripe";

config();

const stripe = Stripe(process.env.STRIPE_KEY);

export const stripeAccess = async (req, res) => {
  console.log("data reached");
  const { booking } = req.body;
  console.log("backend Booking", booking);
  try {
    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: booking.tourName,
            description: booking.desc,
            metadata: {
              // id: booking._id,
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
      phone_number_collection: {
        enabled: true,
      },
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success/${booking._id}/${booking.totalAmount}`,
      cancel_url: `${process.env.CLIENT_URL}/`,
    });

    res.send({ url: session.url });
  } catch (error) {
    console.log(error);
  }
};

// export const stripeAccess = async (req, res) => {
//   // const { bookingData } = req.body;
//   // let _id, totalAmount;
//   // console.log("bookingData", bookingData);
//   // if (Array.isArray(userBookings) && userBookings.length > 0) {
//   //   const firstBooking = userBookings[0];
//   //   _id = firstBooking._id;
//   //   totalAmount = firstBooking.totalAmount;
//   //   console.log("_id", _id);
//   //   console.log("totalAmount", totalAmount);
//   // } else {
//   //   console.log("userBookings is empty or not an array.");
//   // }
//   try {
//     // const line_items = userBookings.map((item) => {
//     //   return {
//     //     price_data: {
//     //       currency: "usd",
//     //       product_data: {
//     //         name: item.tourName,
//     //         description: item.desc,
//     //         metadata: {
//     //           id: item._id,
//     //           userId: item.userId, // Add userId to metadata
//     //           phone: item.phone, // Add phone to metadata
//     //         },
//     //       },
//     //       unit_amount: item.totalAmount * 100,
//     //     },
//     //     quantity: item.guestSize,
//     //   };
//     // });
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       phone_number_collection: {
//         enabled: true,
//       },
//       // line_items,
//       mode: "payment",
//       success_url: `${process.env.CLIENT_URL}/checkout-success/${_id}/${totalAmount}`,
//       cancel_url: `${process.env.CLIENT_URL}/`,
//     });

//     res.send({ url: session.url });
//   } catch (error) {
//     console.log(error);
//   }
// };

