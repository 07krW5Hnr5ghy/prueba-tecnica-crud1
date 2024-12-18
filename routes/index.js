import {Router} from "express";
import {readdirSync} from "fs";
import { fileURLToPath } from "url";
import path from "path";

// get the resolved path to the file
const __filename = fileURLToPath(import.meta.url);
// get the name of the directory
const PATH_ROUTER = `${path.dirname(__filename)}`;
const router = Router();
// remove extension from file name
const cleanFileName = (fileName) => {
    return fileName.split(".").shift();
}

// load dinamically all routes from PATH_ROUTER
readdirSync(PATH_ROUTER).filter((fileName)=>{
    const cleanName = cleanFileName(fileName);
    if(cleanName !== "index"){
        import(`./${fileName}`).then((moduleRouter)=>{
            console.log(`loading route.../${cleanName}`);
            router.use(`/${cleanName}`,moduleRouter.router);
        });
    }
});

export {router};