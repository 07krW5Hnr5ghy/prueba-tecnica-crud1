import Car from "../models/Car.js";

class CarFactory {
    static async create(brand,model,personId){
        return await Car.create({brand,model,personId});
    }
}

export default CarFactory;