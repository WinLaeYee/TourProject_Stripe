/* import Tour from '../models/Tour.js' 
import  Review from '../models/Review.js'


export const createReview = async(req, res)=>{
    
    const tourId = req.params.tourId;

    console.log("tourid", tourId)
    
    const newReview = new Review({...req.body})
    try{

        const savedReview = await newReview.save();

       
        await Tour.findByIdAndUpdate(tourId,{
            $push: {reviews: savedReview._id}
        })

        res.status(200).json({success: true, message:'Review submitted', data:savedReview})
        

    }catch(err){
        res.status(500).json({success: false, message:'Failed to submit'})
    }
}


 export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
}; 


export const getAllReviewsForTour = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    
    const reviews = await Review.find({ tour: tourId });
    
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
}; */


import Tour from '../models/Tour.js';
import Review from '../models/Review.js';

export const createReview = async (req, res) => {
    const tourId = req.params.tourId;

    const newReview = new Review({ ...req.body });

    try {
        const savedReview = await newReview.save();

        await Tour.findByIdAndUpdate(tourId, {
            $push: { reviews: savedReview._id }
        });

        res.status(200).json({ success: true, message: 'Review submitted', data: savedReview });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to submit review', error: err.message });
    }
};

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json({ success: true, data: reviews });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch reviews', error: error.message });
    }
};

export const getAllReviewsForTour = async (req, res) => {
    try {
        const tourId = req.params.tourId;
        const reviews = await Review.find({ tour: tourId });
        res.status(200).json({ success: true, data: reviews });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch reviews', error: error.message });
    }
};

