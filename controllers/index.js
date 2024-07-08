const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
require('dotenv').config();


//Get reuqest for the home page 
exports.getHomepage = (req, res) => {    
  res.render('index');
}

//Get request for the contact page
exports.getContactPage = (req, res) => {
    res.render('contactus');
  };

//Post request for Contact Us page
exports.submitContactForm = async (req, res) => {
    try {
      const contact = new Contact(req.body);
      await contact.save();
  
      // Send confirmation email
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: 'Contact Form Submission Confirmation',
        text: `Thank you for your message, ${req.body.name}. We have received your message: "${req.body.message}". We will get back to you soon!`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: 'Error sending email' });
        } else {
          res.status(200).json({ message: 'Your query has been received. We will contact you shortly.' });
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error saving contact information' });
    }
  };
  
