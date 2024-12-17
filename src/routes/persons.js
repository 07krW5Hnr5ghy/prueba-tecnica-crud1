import {Router} from "express";

import { getPersons } from "../controllers/persons.js";

const router = Router();

router.get("/",getPersons);

export {router};