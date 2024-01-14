import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const user = {
    userName: "Luis",
    role: {
        rolename:"Director",
        privilegeLevel: 1,
    },
};

const token = jwt.sign(
	user,
	process.env.JWT_SECRET
);

console.log("Este es el TOKEN: Bearer", token);
