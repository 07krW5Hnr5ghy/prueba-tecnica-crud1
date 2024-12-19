import {Router} from "express";

import { migrateData } from "../controllers/persons.js";

const router = Router();

router.get("/",migrateData);

export {router};