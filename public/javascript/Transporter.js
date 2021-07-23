var nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sameer.vashisth.egs@gmail.com",
    pass: "letsWorkAtEvren@123",
  },
});

module.exports = { transporter };
