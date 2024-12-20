import postgresInstance from "../configs/postgres";

class PetRepository{
    constructor(){
        this.postgres = postgresInstance.getSequelize();
    }
    // find all pets from postgres
    async findAll(){
        const {Pet} = this.postgres.models;
        return await Pet.findAll();
    }
}

const petRepository = new PetRepository();
export default petRepository;