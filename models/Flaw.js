import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Flaw = db.define(
    "Flaw",
    {
        flawId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 255],
                    msg: "The description must be between 1 and 255 characters long",
                },
                is: {
                    args: /^[a-zA-Z ]+$/i,
                    msg: "The description can only contain letters and spaces",
                },
                notEmpty: {
                    msg: "The description can't be empty",
                },
            },
        }
    },
    {
        
    }
);

export default Flaw;