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
  // console.log(req.body);
  let {name,email,topic,message} = req.body;
  const contact = new Contact ({
      name,
      email,
      topic,
      message
  });
  contact.save();

    try {
      const contact = new Contact(req.body);
      await contact
      .save();
  
      // Send confirmation email
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        secure:true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      
      const mailOptions = {
        from: `"Neha Kanaki" <${process.env.EMAIL_USER}>`,
        to: req.body.email,
        subject: '📧 Contact Form Submission Confirmation',
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #4CAF50;">Hi ${req.body.name} 👋,</h2>
            <p>Thank you for reaching out to us! <span style="color: #FFD700;">🌟</span></p>
            <p>We've received your message and our team is on it. We'll get back to you shortly! <span style="color: #1E90FF;">⏳</span></p>
            <p>In the meantime, feel free to explore our website or reach out if you have any more questions. We're here to help! <span style="color: #FF69B4;">🤗</span></p>
            <br>
            <p>Best regards,</p>
            <p style="color: #FF4500;">The Support Team 🚀</p>
            <br>
            <p><em>P.S. Stay awesome! <span style="color: #8A2BE2;">✨</span></em></p>
          </div>
        `,
      };
      
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.json({ inserted: false });
        } else {
          res.json({ inserted: true });
        }
      });
    } catch (error) {
      res.json({ inserted: false });
    }
  };
  
