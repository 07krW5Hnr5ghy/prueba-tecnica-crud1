import express from "express";
import cors from "cors";

import {router} from "./routes/index.js";

const {PORT,FRONTEND} = process.env;
const port = PORT || 3001;
const app = express();

app.use(cors(["*"]));
app.use(express.json());
app.use(router);
app.listen(port,()=>{
    console.log(`listen port => ${port}`);
});