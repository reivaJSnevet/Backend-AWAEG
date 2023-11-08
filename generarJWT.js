import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const token = jwt.sign(
	{
		id: 1,
		rol:"Admin",
	},
	process.env.JWT_SECRET,
	{
		expiresIn: 86400, // 24 hours
	},
);

console.log("Este es el TOOKEEN: Bearer",token);
