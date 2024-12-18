import Pet from "../models/Pet.js";

class PetFactory{
    static async create(name,type,personId){
        return await Pet.create({name,type,personId});
    }
}

export default PetFactory;