const express = require('express');
const indexController = require('../controllers');
const router = express.Router();

// Get request for the home page
router.get('/', indexController.getHomepage);

// Get request for the contact page
router.get('/contactUs', indexController.getContactPage);

// Post request for Contact Us page
router.post('/contact', indexController.submitContactForm);

module.exports = router;
