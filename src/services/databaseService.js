import { Pool } from "pg";
import { MongoClient } from "mongodb";

class DatabaseService{
    constructor(){
        if(DatabaseService.instance) return DatabaseService.instance;
        this.mongoClient = null;
        this.pgPool=null;
        DatabaseService.instance = this;
    }

    async connectMongo(uri){
        if(!this.mongoClient){
            this.mongoClient = new MongoClient(uri);
            await this.mongoClient.connect();
            console.log("Connected to mongoDB");
        }
        return this.mongoClient;
    }

    connectPostgres(config){
        if(!this.pgPool){
            this.pgPool = new Pool(config);
            console.log("Connected to PostgreSQL");
        }
        return this.pgPool;
    }
    
}

const dbService = new DatabaseService();
export default dbService;