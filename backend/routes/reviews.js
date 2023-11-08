import express from 'express';
import { createReview, getAllReviews } from '../controllers/reviewController.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/:tourId', createReview);

router.get('/allreviews', getAllReviews)


export default router