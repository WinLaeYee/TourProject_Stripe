import express from "express";
import { stripeAccess } from "../controllers/stripeController.js";
const router = express.Router();

// register
router.post("/create-checkout-session", stripeAccess);

// router.post("/login", login);

export default router;
