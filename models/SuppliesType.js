import { DataTypes } from "sequelize";
import db from "../config/db.js";

const SuppliesType = db.define("SuppliesType", {
    suppliesTypeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});

export default SuppliesType;