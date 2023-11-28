import {Sequelize} from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize

const Category = db.define("category", {
    name: {
        type: DataTypes.STRING,
        allowNull: {
            args: false,
            msg: "نام الزامی است."
        },
        unique: {
            args: true,
            msg: "مقدار تکراری نباید باشد."
        }
    }
})

export default Category