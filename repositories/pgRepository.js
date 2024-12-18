import Person from "../models/Person";

export default class PgRepository{
    constructor(pgPool,tableName){
        this.pgPool = pgPool;
        this.tableName = tableName;
    }
    async findPersons(condition){
        const {rows} = await this.pgPool.query(`SELECT * FROM persons WHERE ${condition}`);
        return rows.map(Person.fromRow);
    }
}