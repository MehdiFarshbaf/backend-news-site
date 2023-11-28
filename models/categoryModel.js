import {Sequelize} from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize

const Category = db.define("category", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            message: "مقدار تکراری نباید باشد."
        }
    }
})

export default Category