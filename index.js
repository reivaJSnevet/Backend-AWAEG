/**
 * @fileOverview This file contains the main server code for the backend application.
 * It initializes the Express server, establishes a connection to the database,
 * sets up middleware, defines routes, and starts the server.
 * @module index.js
*/

// Importing Node.js modules
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";


//Importing configs
import db from "./config/db.js";
import transporter from "./config/nodemailer.js";
import corsOptions from "./config/corsOptions.js";

//Importing Middlewares
import errorHandler from "./middlewares/errorHandler.js";
import credentials from "./middlewares/credentials.js";
import verifyJWT from "./middlewares/verifyJWT.js";

//Importing Hook global Trim()
import { applyGlobalTrimHook } from "./hooks/globalTrimHook.js";

// Importing routes
import {
	roleRoute,
	userRoute,
	functionaryRoute,
	subjectRoute,
	preRegistrationRoute,
	fileRoute,
	applicationRoute,
	appointmentRoute,
	studentRoute,
	caregiverRoute,
	groupRoute,
	classRoute,
	gradeRoute,
	timetableRoute,
	authRoute,
	loanRoute,
	flawRoute,

} from "./routes/index.js";



// Initializing the Express server
const app = express();
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());


/**
 * Establishes a connection to the database and synchronizes the models.
 * Retries the connection up to 3 times with a 5-second delay between each attempt.
 * @async
 * @function DbConnection
 */
async function DbConnection() {
	let attempts = 3; // Maximum number of retries
	while (attempts > 0) {
		try {
			await db.authenticate();
			console.log(
				"\x1b[36m%s\x1b[0m",
				"Database authentication successful",
			);

			try {
				await db.sync({ force: false });
				console.log(
					"\x1b[36m%s\x1b[0m",
					"Database synchronization successful",
				);
				break;
			} catch (errorSync) {
				console.log(
					"\x1b[31m%s\x1b[0m",
					"Error in database synchronization:",
				);
				console.log(errorSync);
			}
		} catch (errorAuth) {
			console.log("\x1b[31m%s\x1b[0m", "Error in database connection:");
			console.log(errorAuth);
			console.log("\x1b[33m%s\x1b[0m", `Remaining attempts: ${attempts}`);
			attempts--;
			await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait for 10 seconds before retrying
		}
	}

	if (attempts === 0) {
		console.log(
			"\x1b[31m%s\x1b[0m",
			"Failed to establish connection after multiple attempts.",
		);
	}
}

await DbConnection();

// Applying global trim hook
applyGlobalTrimHook(db);

async function NodemailerConnection() {
    try {
        await transporter.verify();
        console.log(
            "\x1b[36m%s\x1b[0m",
            "Nodemailer transporter connection successful",
        );
    } catch (error) {
        console.log("\x1b[31m%s\x1b[0m", "Error in Nodemailer transporter connection:");
        console.log(error);
    }
}

/* await NodemailerConnection(); */


// Public Routes
app.use("/api/", authRoute);

// Middleware to verify JWT token
app.use(verifyJWT);

// Private Routes
app.use("/api/", roleRoute);
app.use("/api/", userRoute);
app.use("/api/", functionaryRoute);
app.use("/api/", subjectRoute);
app.use("/api/", preRegistrationRoute);
app.use("/api/", fileRoute);
app.use("/api/", applicationRoute);
app.use("/api/", appointmentRoute);
app.use("/api/", studentRoute);
app.use("/api/", caregiverRoute);
app.use("/api/", groupRoute);
app.use("/api/", classRoute);
app.use("/api/", gradeRoute);
app.use("/api/", timetableRoute);
app.use("/api/", loanRoute);
app.use("/api/", flawRoute);

// Handle 404 error on invalid routes
app.all("*", (req, res) => {
	res.status(404).json({
		status: "fail",
		message: `Route not found: ${req.originalUrl}`,
	});
});

// Error handling middleware
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(
		"\x1b[32m%s\x1b[0m",
		`Server started. The server is running on Port: ${port}`,
	);
});
