import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js';


// https://ethereal.email/create
let nodeConfig = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: ENV.EMAIL, // generated ethereal user
        pass: ENV.PASSWORD, // generated ethereal password
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
        // Set the name of the product or website
        name: 'V Square Clinic',
        link: 'http://vsqclinic.com/'
    }
});

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : "",
}
*/
export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;

    // body of the email
    var email = {
        body: {
            name: 'John',
            intro: 'Welcome to Example.com! We’re very excited to have you on board.',
            action: {
                instructions: 'To get started with Example.com, please click here:',
                button: {
                    color: '#5ba2ff', // Set the color of the button
                    text: 'Confirm your account', // Set the text inside the button
                    link: 'http://example.com/confirmation?id=1234567890' // Set the link for the button
                }
            },
            outro: 'If you have any questions, just reply to this email. We\'re always here to help out.'
        }
    };

    var emailBody = MailGenerator.generate(email);

    let message = {
        from : ENV.EMAIL,
        to : userEmail,
        subject : subject || "Signup Successful",
        html : emailBody
    }

    // send mail
    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "You should receive an email from us." })
        })
        .catch(error => res.status(500).send({ error }))

}