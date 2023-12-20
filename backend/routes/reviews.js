import express from 'express';
import { createReview, getAllReviews, getAllReviewsForTour } from '../controllers/reviewController.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/:tourId', createReview);

router.get('/allreviews', getAllReviews)

router.get('/tours/:tourId/reviews', getAllReviewsForTour);


export default router