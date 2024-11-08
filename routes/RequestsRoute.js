const express = require('express');
const router = express.Router();
const { getRequesFormPage,
    postRequestBreeding,
    makeMatches,
    getMatchesOffers,
} = require('../controllers/ReqestAppController');
// Routes for RequestAppController

// Routes for form to create an breeding request
router.get('/addRequest', getRequesFormPage);
// Routes to get data from request
router.post('/submit-pet-details', postRequestBreeding);

// Routes for matching and sending request
router.post('/send-request', makeMatches);

// Routes for getting matched offers and show pet owner
router.get('/response', getMatchesOffers);
module.exports = router;


