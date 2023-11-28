import {Sequelize} from "sequelize";

const db = new Sequelize("news", "news_site", "Dz8y-Mr6CKCr(MG*", {
    host: "localhost",
    dialect: "mysql"
})

export default db
