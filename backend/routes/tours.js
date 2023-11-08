import express from "express";
import {
  createTour,
  updateTour,
  deleteTour,
  getSingleTour,
  getAllTour,
  getTourBySearch,
  getFeaturedTour,
  getTourCount,
} from "../controllers/tourController.js";

import upload from "../utils/multer.js";

import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

//const { upload } = require("../utils/multer");

const router = express.Router();

//create new tour


router.post("/createTour", verifyAdmin, upload.single('file'), createTour);

//update tour
router.put("/updateTour/:id", verifyAdmin,upload.single('photo'), updateTour);

//delete tour
router.delete("/deleteTour/:id", verifyAdmin, upload.single('photo'), deleteTour);

//get single tour
router.get("/:id",getSingleTour);

//get all tours
router.get("/", getAllTour);

//get tour by search
router.get("/search/getTourBySearch", getTourBySearch);

router.get("/search/getFeaturedTours", getFeaturedTour);

router.get("/search/getTourCount", getTourCount);

export default router;
