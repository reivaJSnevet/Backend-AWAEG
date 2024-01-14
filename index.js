/**
 * @fileOverview This file contains the main server code for the backend application.
 * It initializes the Express server, establishes a connection to the database,
 * sets up middleware, defines routes, and starts the server.
 * @module index.js
 */

// Import Node.js libraries
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

// Import Configs
import db from "./config/db.js";
import corsOptions from "./config/corsOptions.js";
import sequelize from "./config/db.js";

// Import Middlewares
import credentials from "./middlewares/credentials.js";
import verifyJWT from "./middlewares/verifyJWT.js";

// Import Routes
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

// Import Hooks
import { applyGlobalTrimHook } from "./hooks/globalTrimHook.js";

// Import Node-Cron tasks
import "./tasks/updateAge.js";

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

// Helmet
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
				console.log("\x1b[31m%s\x1b[0m","Error in database synchronization:");
                console.log(errorSync);
			}
		} catch (errorAuth) {
			console.log("\x1b[31m%s\x1b[0m", "Error in database connection:");
            console.log(errorAuth);
			console.log("\x1b[33m%s\x1b[0m", `Remaining attempts: ${attempts}`);
			attempts--;
			await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
		}
	}

	if (attempts === 0) {
		console.log("\x1b[31m%s\x1b[0m", "Failed to establish connection after multiple attempts.");
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
app.listen(port, () => {
	console.log(
		"\x1b[32m%s\x1b[0m",
		`Server started. The server is running on Port: ${port}`,
	);
});
