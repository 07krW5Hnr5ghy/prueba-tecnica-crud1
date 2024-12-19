import personRepository from "../repositories/PersonRepository.js";
import postgresInstance from "../configs/postgres.js";
import mongoInstance from "../configs/mongo.js";
class MigrationService{
    async migratePostgresToMongo(){
        try{
            // Ensure the postgres connection is active
            if(!postgresInstance.isConnected()){
                await postgresInstance.connect();
            }
            // init mongodb connection
            await mongoInstance.connect();
            
            // Fetch all persons, cars, and pets from PostgreSQL
            const persons = await personRepository.findAllPostgres();
            // Fetch all persons from mongoDB
            const mongoPersons = await personRepository.findAllMongo();

            if(mongoPersons.length){
                mongoPersons.forEach(mongoPerson => {
                    persons.forEach(person=>{
                        if(person.id===mongoPerson._id){
                            throw new Error(`Error: person #${person.id} ${person.name} already exists in mongoDB migration canceled`);                            
                        }
                    });
                });
            }

            // Transform data into the MongoDB format
            const transformedData = persons.map(person=>({
                _id:person.id,
                name:person.name,
                cars:person.cars.map(car=>({
                    id:car.id,
                    model:car.model,
                    brand:car.brand
                })),
                pets:person.pets.map(pet=>({
                    id:pet.id,
                    name:pet.name,
                    type:pet.type
                })),
            }));

            // Save transformed data into MongoDB
            for(const person of transformedData){
                await personRepository.saveToMongo(person);
            }

            console.log("Migration completed successfully");

            return await personRepository.findAllMongo();
        }catch(error){
            postgresInstance.close();
            mongoInstance.close();
            console.error("Error migrating data:",error);
        }
    }
}

const migrationService = new MigrationService();
export default migrationService;