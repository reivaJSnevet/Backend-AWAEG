import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Category = db.define("Category", {
    categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 20],
            notEmpty: true,
            notNull: true,
        },
        
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        },
    },
});

export default Category;