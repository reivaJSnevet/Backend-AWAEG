import transporter from "../../config/nodemailer.js";

/**
 * Sends an email to the user with the verification link.
 * @param {string} email - The email of the user.
 * @param {string} token - The token to verify the user.
 * @returns {Promise<void>} - A promise that resolves when the email is sent.
 * @throws {Error} - An error if the email could not be sent.
 * @async
 */

const sendVerificationEmail = async (email, token) => {
	try {
		await transporter.sendMail({
			from: `"SWAEG" <${process.env.EMAIL_USER}>`,
			to: email,
			subject: "Verifica tu cuenta",
			html: `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verifica tu cuenta</title>
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
                <h1>Verifica tu cuenta</h1>
                <p>¡Bienvenido a SWAEG! Para completar tu registro, haz clic en el siguiente enlace:</p>
                <a href="${process.env.WEB_URL}/api/auth/email-confirmation/${token}">Verificar cuenta</a>
            </body>
            </html>
        `,
		});
	} catch (error) {
		throw error;
	}
};

export default sendVerificationEmail;
