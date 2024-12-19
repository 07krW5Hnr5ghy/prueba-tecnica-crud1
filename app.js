import express from "express";
import cors from "cors";

import {router} from "./routes/index.js";
import postgresInstance from "./configs/postgres.js";
import mongoInstance from "./configs/mongo.js";
import migrationService from "./services/migrationService.js";
import associateModels from "./models/index.js";

const {PORT} = process.env;
const port = PORT || 3001;
const app = express();

app.use(cors(["*"]));
app.use(express.json());
app.use(router);

const checkDBConnection = async () => {
    try{
        console.log("Please wait checking PostgreSQL and MongoDB databases connection status");
        // Initialize PostgresSQL and MongoDB connections
        await postgresInstance.connect();
        await mongoInstance.connect();
        console.log("PostgreSQL and MongoDB databases connection working.");
        //await associateModels();
    }catch(error){
        console.error("Error starting the application:",error);
        process.exit(1);
    }finally{
        // Close MongoDB connection
        await mongoInstance.close();
        await postgresInstance.close();
    }
};

//checkDBConnection();

app.listen(port,()=>{
    console.log(`listen port => ${port}`);
});