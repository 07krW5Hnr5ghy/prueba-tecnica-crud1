import express from "express";
import cors from "cors";

import {router} from "./routes/index.js";
import postgresInstance from "./configs/postgres.js";
import mongoInstance from "./configs/mongo.js";
import associateModels from "./models/index.js";

const {PORT} = process.env;
const port = PORT || 3001;
const app = express();

app.use(cors(["*"]));
app.use(express.json());
app.use(router);

const initializeDBConnections = async () => {
    try{
        console.log("Please wait checking PostgreSQL and MongoDB databases connection status");
        // Initialize PostgresSQL and MongoDB connections
        await postgresInstance.connect();
        await mongoInstance.connect();
        // asociate models for postgres
        await associateModels();
        console.log("PostgreSQL and MongoDB databases connection working.");
    }catch(error){
        console.error("Error starting the application:",error);
        await mongoInstance.close();
        await postgresInstance.close();
        process.exit(1);
    }
};

initializeDBConnections();

app.listen(port,()=>{
    console.log(`listen port => ${port}`);
});