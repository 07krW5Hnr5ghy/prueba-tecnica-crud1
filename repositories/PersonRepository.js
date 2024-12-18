import postgresInstance from "../configs/postgres.js";
import mongoInstance from "../configs/mongo.js";
import Person from "../models/Person.js";

class PersonRepository{
    constructor(){
        this.postgres = postgresInstance.getSequelize();
        this.mongo = mongoInstance;
    }
    async findAllPostgres(){
        const {Person} = this.postgres.models;
        return await Person.findAll({include:["cars","pets"]});
    }
    async findAllMongo(){
        const db = await this.mongo.connect();
        return await db.collection("people").find().toArray();
    }
    async saveToMongo(personDocument){
        const db = await this.mongo.connect();
        return await db.collection("people").insertOne(personDocument);
    }
}

const personRepository = new PersonRepository();
export default personRepository;