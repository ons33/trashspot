const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const ProductModal = require("../models/productModel");
const cron = require("node-cron");
const UserModel = require("../models/users.models");
const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    auth: {
      user: "zerowasteprojectpi@gmail.com",
      pass: "dpftjggixoioegnv",
    },
    tls: {
      rejectUnauthorized: false,
    },
  })
);

async function sendEmailToUsers() {
    try {
      const today = new Date();
      today.setDate(today.getDate() + 5);
      const expiredProducts = await ProductModal.find({
        expiry_date: {
          $lte: today,
          $gt: new Date(),
        },
      });
      if (expiredProducts.length !== 0) {
        for (let i = 0; i < expiredProducts.length; i++) {
          const product = expiredProducts[i];
          const users = await UserModel.find({ _id: { $ne: product.username } }).exec();
          for (let j = 0; j < users.length; j++) {
            const user = users[j];
            const response = await transporter.sendMail({
              from: "zerowasteprojectpi@gmail.com", // sender address
              to: user.email, // list of receivers
              subject: `OFFER`, // Subject line
              html: `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                                <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to zeroWaste.</h2>
                                <p>Please take a look at the products available on our website. Some of them are currently on promotion.
                                </p>
                                </div>
                            `,
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }
  

module.exports = sendEmailToUsers;
