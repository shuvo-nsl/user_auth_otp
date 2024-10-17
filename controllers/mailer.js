import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import ENV from "../config.js";

// Creating smtp server for sending email 
const nodeConfig = {
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: ENV.EMAIL,
        pass: ENV.PASSWORD

    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
};


let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default", 
    product: {
        name: "Mailgen",
        link: "https://mailge.js"
    }
});

export const registerMail = async (req, res) => {
    try {
        const { username, userEmail, text, subject } = req.body;

        console.log("Received request to send email:");

        // Body of mail
        var email = {
            body: {
                name: username,
                intro: text || "Welcome to Mern Otp project. We are excited to have you on board.",
                outro: "Need help or have questions? Just reply to this email, we'd love to help."
            }
        };

        console.log("Generated email content:");

        var emailBody = MailGenerator.generate(email);

        let message = {
            from: ENV.EMAIL,
            to: userEmail,
            subject: subject || "Signup successful",
            html: emailBody
        };

        console.log("Generated email message:");

        // Send the mail
        transporter.sendMail(message)
            .then(() => {
                console.log("Email sent successfully");
                return res.status(200).send({ msg: "You should receive an email from us" });
            })
            .catch(error => {
                console.error("Error sending email:", error);
                res.status(500).send({ error });
            });
    } catch (error) {
        console.error("Error in registerMail function:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};
