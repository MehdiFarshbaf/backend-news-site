import {Sequelize} from "sequelize";
import db from './../config/database.js'

const {DataTypes} = Sequelize

const Video = db.define("video", {
    video: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    }
})
export default Video