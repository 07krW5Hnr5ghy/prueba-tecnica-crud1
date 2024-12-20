import postgresInstance from "../configs/postgres.js";

class CarRepository{
    constructor(){
        this.postgres = postgresInstance.getSequelize();
    }
    // find all cras in postgres
    async findAll(){
        const {Car} = this.postgres.models;
        return await Car.findAll();
    }
}

const carRepository = new CarRepository();
export default carRepository;