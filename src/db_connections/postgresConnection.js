import dbService from "../services/databaseService";
const {PG_USER,PG_HOST,PG_DB,PG_PASSWORD,PG_PORT} = process.env;
const postgresConnection = dbService.connectPostgres({
    user:PG_USER,
    host:PG_HOST,
    database:PG_DB,
    password:PG_PASSWORD,
    port:PG_PORT
});
export default postgresConnection;