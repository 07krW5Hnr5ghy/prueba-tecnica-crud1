import migrationService from "../services/migrationService.js";
const getPersons = async (request,response) => {
    try{
        const persons = await migrationService.migratePostgresToMongo();
        return response.status(200).send(persons);
    }catch(error){
        console.log("Error fetching persons:",error);
        return response.status(500).send({ message: "Error fetching persons."});
    }
}

export {getPersons};