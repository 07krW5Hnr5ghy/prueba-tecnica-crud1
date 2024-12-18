import express from "express";
import cors from "cors";

import {router} from "./routes/index.js";
import postgresInstance from "./configs/postgres.js";
import mongoInstance from "./configs/mongo.js";

const {PORT} = process.env;
const port = PORT || 3001;
const app = express();

app.use(cors(["*"]));
app.use(express.json());
app.use(router);

const startApp = async () => {
    try{
        // Initialize PostgresSQL and MongoDB connections
        await postgresInstance.connect();
        await mongoInstance.connect();
        
        console.log("Application initialized successfully.");
    }catch(error){
        console.error("Error starting the application:",error);
    }finally{
        // Close MongoDB connection
        await mongoInstance.close();
    }
};

startApp();

app.listen(port,()=>{
    console.log(`listen port => ${port}`);
});