import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const token = jwt.sign(
	{
		id: 1,
		rol:"Director",
	},
	process.env.JWT_SECRET,
	{
		expiresIn: 604800, // 1 semana 
	},
);

console.log("Este es el TOOKEEN: Bearer",token);
