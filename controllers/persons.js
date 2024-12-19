import migrationService from "../services/migrationService.js";
const migrateData = async (request,response) => {
    try{
        const result = await migrationService.migratePostgresToMongo();
        response.status(200).json({
            success:true,
            message:result.message,
            data:result.data
        });
    }catch(error){
        response.status(400).send({
            success:false,
            message:error.message
        });
    }
}

export {migrateData};