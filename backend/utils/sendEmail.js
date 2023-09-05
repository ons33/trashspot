const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');


const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'zerowasteprojectpi@gmail.com',
        pass: 'dpftjggixoioegnv',
    },
    tls: {
        rejectUnauthorized: false
    },
}));


async function sendEmail(to, url) {
    try {
        const response = await transporter.sendMail({
            from: 'zerowasteprojectpi@gmail.com', // sender address
            to: to, // list of receivers
            subject: `reset password`, // Subject line
            html: `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                    <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to zeroWaste.</h2>
                    <p>Congratulations! You're almost there to reset your password.
                        Just click the button below.
                    </p>
                    
                    <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Reset Password</a>
                    </div>
                `
        });
    } catch (error) {
        return false
    }

    return true;
}

module.exports = sendEmail