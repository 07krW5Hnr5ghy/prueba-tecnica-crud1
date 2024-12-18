export default class PgRepository{
    constructor(pgPool,tableName){
        this.pgPool = pgPool;
        this.tableName = tableName;
    }
    async find(query){
        const {rows} = await this.pgPool.query(`SELECT * FROM ${this.tableName} WHERE ${query}`);
        return rows;
    }
}