import DataError from "../errors/DataError.js";
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
        if(error instanceof DataError){
            response.status(400).send({
                success:false,
                message:error.message
            });
        }else{
            response.status(500).send({error:`Internal Server Error:${error.message}`});
        }
    }
}

export {migrateData};