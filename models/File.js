import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { createApplication } from "../hooks/createApplicationHook.js";

const File = db.define(
	"File",
	{
		fileId: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		fileName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				is: {
					args: /^[a-zA-Z0-9 áéíóúÁÉÍÓÚüÜñÑ.-]+$/i,
					msg: "The name can only contain letters and spaces",
				},
				notEmpty: {
					msg: "The name can't be empty",
				},
			},
		},
		originalName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [1, 50],
					msg: "The original name must be between 1 and 50 characters long",
				},
				is: {
					args: /^[a-zA-Z0-9 áéíóúÁÉÍÓÚüÜñÑ.-]+$/i,
					msg: "The original name can only contain letters and spaces",
				},
				notEmpty: {
					msg: "The original name can't be empty",
				},
			},
		},
		mimeType: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [1, 50],
					msg: "The mimeType must be between 1 and 50 characters long",
				},
				is: {
					args: /^[a-zA-Z0-9/.-]+$/i,
					msg: "The mimeType can only contain letters and numbers",
				},
				notEmpty: {
					msg: "The mimeType can't be empty",
				},
			},
		},
		path: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "The path can't be empty",
				},
			},
		},
        size: {// size is in bytes
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: "The size must be a number",
                },
                min: {
                    args: [0],
                    msg: "The size must be greater than or equal to 0",
                },
                notEmpty: {
                    msg: "The size can't be empty",
                },
            },
        },
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	},
	{
		timestamps: true,
        defaultScope: {
            attributes: { exclude: ["createdAt", "updatedAt"] },
        },
		hooks: {
			beforeCreate: createApplication,
		},
	},
);

export default File;
