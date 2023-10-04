import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const token = jwt.sign(
	{
		id: 1,
		rol:"Secretaria",
	},
	process.env.JWT_SECRET,
	{
		expiresIn: 86400, // 24 hours
	},
);

console.log("Este es el TOOKEEN: ",token);
