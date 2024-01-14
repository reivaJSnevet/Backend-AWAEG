import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const user = {
	id: 1,
	rol: "Director",
};

const token = jwt.sign(
	user,
	process.env.JWT_SECRET
);

console.log("Este es el TOKEN: Bearer", token);
