import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const token = jwt.sign(
	{
		nombre: "Juan",
		rol:"Secretaria",
	},
	process.env.JWT_SECRET,
	{
		expiresIn: 86400, // 24 hours
	},
);

console.log("Este es el TOOKEEN: ",token);
