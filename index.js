/**
 * @fileOverview This file contains the main server code for the backend application.
 * It initializes the Express server, establishes a connection to the database,
 * sets up middleware, defines routes, and starts the server.
 * @module index.js
 */

import express from "express";
import cors from "cors";
import db from "./config/db.js";


// Import routes
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
} from "./routes/index.js";
import cookieParser from "cookie-parser";
import credentials from "./middlewares/credentials.js";
import corsOptions from "./config/corsOptions.js";
import verifyJWT from "./middlewares/verifyJWT.js";
import sequelize from "./config/db.js";
import { applyGlobalTrimHook } from "./hooks/globalTrimHook.js";
// Import Node cron tasks
import "./tasks/updateAge.js";
import bcrypt from "bcrypt";

// Express init
const app = express();

// Credentials Cors middleware
app.use(credentials);

// Cors middleware
app.use(cors(corsOptions));

// Enable reading form data
app.use(express.urlencoded({ extended: true }));

// Enable reading JSON in URL
app.use(express.json());

// Cookies
app.use(cookieParser());

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
			console.log("Database authentication successful");

			try {
				await db.sync({ force: false });
				console.log("Database synchronization successful");
				break;
			} catch (errorSync) {
				console.log("Error in database synchronization:", errorSync);
			}
		} catch (errorAuth) {
			console.log("Error in database connection:", errorAuth);
			console.log(`Remaining attempts: ${attempts}`);
			attempts--;
			await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
		}
	}

	if (attempts === 0) {
		console.log("Failed to establish connection after multiple attempts.");
	}
}

applyGlobalTrimHook(sequelize);

// Call the function to connect to the database
await DbConnection();

// Set up public routes
app.use("/api/", authRoute);
// Set up JWT verification middleware
app.use(verifyJWT);
// Set up private routes
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

// Handle 404 errors
app.all("*", (req, res) => {
	res.status(404).json({
		status: "fail",
		message: `Route not found: ${req.originalUrl}`,
	});
});

// Error handling middleware
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			type: err.name,
			message: err.message,
		},
	});
});

// Define port and start the server
const port = process.env.PORT || 3000;

/* const hashPassword = async () => {
	const salt = await bcrypt.genSalt(10);
	const password = await bcrypt.hash("password", salt);
    return password;
};
console.log("Hashed password: ", await hashPassword()); */

app.listen(port, () => {
	console.log(`Server started. The server is running on Port: ${port}`);
});
