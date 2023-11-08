// webhookController.js
import stripePackage from "stripe";

const stripe = stripePackage("sk_test_...");

export { stripe };

let endpointSecret;
// endpointSecret =
//   "whsec_e73f75173a37acc7b4dc87974e716a457d4faa76e1c8966d2abb513904e245e1";



export const handleWebhookEvent = async (req, res) => {
  const sig = request.headers["stripe-signature"];
  let data;
  let eventType;

  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
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
      eventType = req.body.type
  }

  // Handle the event
 

  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
};
