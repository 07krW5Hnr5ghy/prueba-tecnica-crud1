import personRepository from "../repositories/PersonRepository.js";
class MigrationService{
    async migratePostgresToMongo(){
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

        console.log("Migration completed succesfully");
    }
}

const migrationService = new MigrationService();
export default migrationService;