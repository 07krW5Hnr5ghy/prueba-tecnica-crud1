import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();
const {PG_USER,PG_HOST,PG_DB,PG_PASSWORD,PG_PORT} = process.env;

class PostgresSingleton{
    constructor(){
        if(!PostgresSingleton.instance){
            this.sequelize = new Sequelize(
                PG_DB,
                PG_USER,
                PG_PASSWORD,
                {
                    host:PG_HOST,
                    port:PG_PORT,
                    dialect:"postgres",
                    logging:false
                }
            );
            PostgresSingleton.instance = this;
        }
        return PostgresSingleton.instance;
    }
    async connect(){
        try{
            await this.sequelize.authenticate();
            console.log("PostgreSQL connected successfully.");
        }catch(error){
            console.error("Error connecting to PostgreSQL:", error);
            throw error;
        }
    }
    async close(){
        try{
            await this.sequelize.close();
            console.log("PostgreSQL connection closed.");
        }catch(error){
            console.error("Error closing PostgreSQL connection:",error);
        }
    }
    getSequelize(){
        return this.sequelize;
    }
}

const postgresInstance = new PostgresSingleton();
export default postgresInstance;