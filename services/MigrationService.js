import personRepository from "../repositories/PersonRepository.js";
import postgresInstance from "../configs/postgres.js";
import mongoInstance from "../configs/mongo.js";
import mapPersonToMongo from "../mappers/personMapper.js";
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
            /* check if any person to migrate from postgreSQL database to
                mongoDB database is already stored in the mongoDB database
                and abort the migration.
             */
            const existingIds = new Set(mongoPersons.map((doc)=>doc._id));
            persons.filter((person)=>{
                if(existingIds.has(person.id)){
                    throw new Error(`person #${person.id} ${person.name} already exists in mongoDB database migration aborted`);
                }
            });
            // Transform data into the MongoDB format
            const transformedData = persons.map(mapPersonToMongo);

            // Save transformed data into MongoDB
            for(const person of transformedData){
                await personRepository.saveToMongo(person);
            }

            console.log("Migration completed successfully");

            return {message:"Migration completed successfully.",data:transformedData};
        }catch(error){
            console.error("Error migrating",error);
            postgresInstance.close();
            mongoInstance.close();
            throw new Error(error.message);
        }
    }
}

const migrationService = new MigrationService();
export default migrationService;