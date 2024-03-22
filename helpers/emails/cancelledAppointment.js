import transporter from "../../config/nodemailer.js";

/**
 * Sends an email to the user with the verification link.
 * @param {string} email - The email of the user.
 * @returns {Promise<void>} - A promise that resolves when the email is sent.
 * @throws {Error} - An error if the email could not be sent.
 * @async
 */
const cancelledAppointment = async (email) => {
	try {
		await transporter.sendMail({
			from: `"SWAEG" <${process.env.EMAIL_USER}>`,
			to: email,
			subject: "Cita cancelada",
			html: `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Una de tus citas fue cancelada</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #ffffff;
                        color: #333333;
                        margin: 0;
                        padding: 20px;
                        text-align: center;
                    }

                    h1 {
                        color: #663399; /* Morado */
                    }

                    p {
                        color: #333333;
                    }

                    a {
                        display: inline-block;
                        margin-top: 20px;
                        padding: 10px 20px;
                        background-color: #ffcc00; /* Amarillo */
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <p>Lo sentimos mucho, pero debido a circunstancias imprevistas, una de tus citas fue cancelada. Lamentamos cualquier inconveniente que esto pueda causarte y espero que podamos reprogramar pronto. Gracias por tu comprensión.</p>
            </body>
            </html>
        `,
		});
	} catch (error) {
		throw error;
	}
};


export default cancelledAppointment;