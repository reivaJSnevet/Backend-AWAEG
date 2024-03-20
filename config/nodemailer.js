import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: process.env.EMAIL_PORT,
	/* secure: process.env.EMAIL_SECURE, */
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
	tls: {
        rejectUnauthorized: false
    }
});

export default transporter;
