// webhookRoutes.js
import express from "express";
const router = express.Router();
import { handleWebhookEvent } from "../controllers/webhookController.js";

// Define the webhook route
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhookEvent);

export default router
