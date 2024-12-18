import { MongoClient,ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const {MONGO_URI,MONGO_DB_NAME} = process.env;

class MongoSingleton{
    constructor(){
        if(!MongoSingleton.instance){
            this.client = new MongoClient(MONGO_URI,{
                serverApi:{
                    version:ServerApiVersion.v1,
                    strict:true,
                    deprecationErrors:true
                }
            });
            this.db = null;
            MongoSingleton.instance = this;
        }
        return MongoSingleton.instance;
    }
    async connect(){
        try{
            if(!this.db){
                await this.client.connect();
                this.db = this.client.db(MONGO_DB_NAME);
                console.log("MongoDB connected successfully.");
            }
            return this.db;
        }catch(error){
            console.error("Error connecting to MongoDB:",error);
            throw error;
        }
    }
    async close(){
        try{
            await this.client.close();
            console.log("MongoDB connected closed.");
        }catch(error){
            console.error("Error closing MongoDB connection:",error);
        }
    }
}

const mongoInstance = new MongoSingleton();
export default mongoInstance;