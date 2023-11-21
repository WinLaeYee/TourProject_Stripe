import express from "express";
import { stripeAccess,handleWebhookEvent } from "../controllers/stripeController.js";
const router = express.Router();

// register
router.post("/create-checkout-session", stripeAccess);

router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhookEvent);

export default router;
