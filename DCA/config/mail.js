const nodemailer = require("nodemailer");

const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {

    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS

  }

});

module.exports = transporter;


// EMAIL_USER=kumaranwnish@gmail.com
// EMAIL_PASS=aksx dipa aaap jsek
// EMAIL_SERVICE=gmail