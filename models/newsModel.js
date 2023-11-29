import {Sequelize} from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize
const News = db.define("news", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    catId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    numViews: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    image: DataTypes.STRING,
    url: DataTypes.STRING

}, {
    freezeTableName: true
})

export default News