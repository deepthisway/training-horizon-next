const express = require('express');
const ac = require("../controllers/adminController");

const router = express.Router();



// Route to view all courses
router.get('/listings' , ac.getListings);

// Route to view pending courses
router.get('/pending-listings' , ac.getPendingListings);

// Route to approve a pending course
router.post('/approve-listing/:id' , ac.approvePendingLsitings);

// Route to discard a pending course
router.delete('/discard-listing/:id' , ac.discardPendingListings );

// Route to view all teachers
router.get('/trainers', ac.getTrainers);

// Route to view pending teachers
router.get('/pending-trainers', ac.getPendingTrainers);

// Route to approve a pending teacher
router.post('/approve-trainer/:id' , ac.approvePendingTrainers);

// Route to discard a pending teacher
router.delete('/discard-trainer/:id' , ac.discardPendingTrainers)



module.exports = router;









