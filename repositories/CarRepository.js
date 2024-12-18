import postgresInstance from "../configs/postgres.js";

class CarRepository{
    constructor(){
        this.postgres = postgresInstance.getSequelize();
    }
    async findAll(){
        const {Car} = this.postgres.models;
        return await Car.findAll();
    }
}

const carRepository = new CarRepository();
export default carRepository;