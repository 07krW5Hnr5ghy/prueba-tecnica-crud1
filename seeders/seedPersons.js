import pkg from "pg";

import PG_CONFIG from "../db_configs/postgresConfig.js";
import Person from "../models/Person.js";

const {Pool} = pkg;

async function seedPersons(){
    const pool = new Pool(PG_CONFIG);
    try{
        console.log("Connected to PostgreSQL.");
        await pool.query(`DROP TABLE IF EXISTS persons`);
        await pool.query(`
            CREATE TABLE persons (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL
            );`);
        console.log("Created persons table");
        const persons = [
            new Person({name: "Alice", email: "alice@example.com"}),
            new Person({name: "Bob", email: "bob@example.com"}),
            new Person({name: "Charlie", email: "charlie@example.com"}),
        ];
        const values = persons.map(person=>[person.name,person.email]);
        const query = `
            INSERT INTO persons (name,email) VALUES ($1,$2) RETURNING *;
        `;
        for(const [name,email] of values){
            const res = await pool.query(query,[name,email]);
            console.log("INSERTED person:",res.rows[0]);
        }
        console.log("seeding PostgreSQL successfully");
    }catch(error){
        console.error("Error seeding PostgreSQL persons:",error);
    }finally{
        await pool.end();
    }
}

seedPersons();