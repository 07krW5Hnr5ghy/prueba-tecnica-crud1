import dotenv from "dotenv";

import postgresInstance from "../configs/postgres.js";
import PersonFactory from "../factories/PersonFactory.js";
import CarFactory from "../factories/CarFactory.js";
import PetFactory from "../factories/PetFactory.js";

dotenv.config();

const seedData = async () => {
    try{
        const sequelize = postgresInstance.getSequelize();
        await sequelize.dropSchema('main');
        await sequelize.createSchema('main');
        await sequelize.sync({force:true});

        // Create persons
        const john = await PersonFactory.create("John Doe",30);
        const jane = await PersonFactory.create("Jane Smith",25);
        const frank = await PersonFactory.create("Frank Taylor",42);
        const alice = await PersonFactory.create("Alice Brown",33);

        // Create cars for john
        await CarFactory.create("Toyota","Camry",john.id);
        await CarFactory.create("Tesla","Model S",john.id);
        await CarFactory.create("Honda","Civic",john.id);

        // Create pets for john
        await PetFactory.create("Gerald","Turtle",john.id);
        await PetFactory.create("Leo","Bear",john.id);

        // Create cars for jane
        await CarFactory.create("Wolkswagen","Beetle",jane.id);
        await CarFactory.create("Ford","Fiesta",jane.id);
        
        // Create pets for jane
        await PetFactory.create("Buddy","Dog",jane.id);
        await PetFactory.create("Whiskers","Cat",jane.id);
        await PetFactory.create("Derek","Toad",jane.id);

        // Create cars for frank
        await CarFactory.create("Chevrolet","Impala",frank.id);
        await CarFactory.create("Cadilac","El Dorado",frank.id);
        await CarFactory.create("Mitsubichi","Lancer Evolution",frank.id);

        // Create pets for frank
        await PetFactory.create("Perry","Parrot",frank.id);
        await PetFactory.create("Alfonse","Fish",frank.id);
        await PetFactory.create("Ted","Hamster",frank.id);

        // Create cars for alice
        await CarFactory.create("Dodge","Challenger",alice.id);
        await CarFactory.create("Pontiac","Lemans GTO",alice.id);
        
        // Create pets for alice
        await PetFactory.create("Mark","Lobster",alice.id);
        await PetFactory.create("Tammy","Snake",alice.id);

        console.log("Seeding of records into postgreSQL database finished");

    }catch(error){
        console.error("Error seeding data:",error);
    }finally{
        postgresInstance.close();
    }
}

seedData();