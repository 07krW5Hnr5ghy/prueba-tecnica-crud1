import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
const {PG_USER,PG_HOST,PG_DB,PG_PASSWORD,PG_PORT} = process.env;
// PostgreSQL connection
class PostgresSingleton{
    constructor(){
        if(!PostgresSingleton.instance){
            this.sequelize = new Sequelize(
                PG_DB,
                PG_USER,
                PG_PASSWORD,
                {
                    host:PG_HOST || 'localhost',
                    port:PG_PORT || 5432,
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
            if(!this.sequelize){
                console.log("Initialized PostgreSQL connection...");
                this.sequelize = new Sequelize(
                    PG_DB,
                    PG_USER,
                    PG_PASSWORD,
                    {
                        host:PG_HOST || 'localhost',
                        port:PG_PORT || 5432,
                        dialect:"postgres",
                        logging:false
                    }
                );
                await this.sequelize.authenticate();
            }
            console.log("PostgreSQL connected successfully.");
        }catch(error){
            console.error("Error connecting to PostgreSQL:", error);
            throw error;
        }
    }
    async close(){
        try{
            if(this.sequelize){
                console.log("Closing PostgreSQL connection...");
                await this.sequelize.close();
                this.sequelize=null;
                console.log("PostgreSQL connection closed.");
            }
        }catch(error){
            console.error("Error closing PostgreSQL connection:",error);
        }
    }
    isConnected(){
        return this.sequelize !== null;
    }
    getSequelize(){
        return this.sequelize;
    }
}

const postgresInstance = new PostgresSingleton();
export default postgresInstance;