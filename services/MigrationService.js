import associateModels from "../models/index.js";
import personRepository from "../repositories/PersonRepository.js";
import postgresInstance from "../configs/postgres.js";
import mongoInstance from "../configs/mongo.js";
class MigrationService{
    async migratePostgresToMongo(){
        try{
            // init postgres connection
            await postgresInstance.connect();
            // init mongodb connection
            await mongoInstance.connect();
            // asociate models
            await associateModels();
            // Fetch all persons, cars, and pets from PostgreSQL
            const persons = await personRepository.findAllPostgres();

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
                    name:pet.name
                })),
            }));

            // Save transformed data into MongoDB
            for(const person of transformedData){
                await personRepository.saveToMongo(person);
            }

            console.log("Migration completed successfully");

            return "Migration completed successfully";
        }catch(error){
            console.error("Error migrating data:",error);
        }finally{
            // closing connections
            await postgresInstance.close();
            await mongoInstance.close();
        }
    }
}

const migrationService = new MigrationService();
export default migrationService;