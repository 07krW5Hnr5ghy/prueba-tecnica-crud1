import dotenv from "dotenv";
dotenv.config();
const {PG_USER,PG_HOST,PG_DB,PG_PASSWORD,PG_PORT} = process.env;
const PG_CONFIG = {
    user:PG_USER,
    host:PG_HOST,
    database:PG_DB,
    password:PG_PASSWORD,
    port:PG_PORT
};
export default PG_CONFIG;