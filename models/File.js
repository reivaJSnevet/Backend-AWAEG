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
/* 				is: {
					args: /^[a-zA-Z0-9 áéíóúÁÉÍÓÚüÜñÑ.-]+$/i,
					msg: "El nombre solo puede contener letras y espacios",
				}, */
				notEmpty: {
					msg: "El nombre no puede estar vacío",
				},
			},
		},
		originalName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [1, 50],
					msg: "El nombre original debe tener entre 1 y 50 caracteres",
				},
/* 				is: {
					args: /^[a-zA-Z0-9 áéíóúÁÉÍÓÚüÜñÑ.-]+$/i,
					msg: "El nombre original solo puede contener letras y espacios",
				}, */
				notEmpty: {
					msg: "El nombre original no puede estar vacío",
				},
			},
		},
		mimeType: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [1, 250],
					msg: "El tipo de archivo debe tener entre 1 y 50 caracteres",
				},
				is: {
					args: /^[a-zA-Z0-9/.-]+$/i,
					msg: "El tipo de archivo solo puede contener letras y espacios",
				},
				notEmpty: {
					msg: "El tipo de archivo no puede estar vacío",
				},
			},
		},
		path: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "El path no puede estar vacío",
				},
			},
		},
        size: {// size is in bytes
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: "El tamaño debe ser un número entero",
                },
                min: {
                    args: [0],
                    msg: "El tamaño debe ser mayor a 0",
                },
                notEmpty: {
                    msg: "El tamaño no puede estar vacío",
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
        paranoid: true,
        defaultScope: {
            attributes: { exclude: ["createdAt", "updatedAt"] },
        },
		hooks: {
			beforeCreate: createApplication,
		},
	},
);

export default File;
