import {Sequelize} from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize

const Users = db.define("users", {
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.firstName} ${this.lastName}`;
        }
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        default: false
    }
}, {
    freezeTableName: true
})

export default Users