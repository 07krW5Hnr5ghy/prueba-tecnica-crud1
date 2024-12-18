import Person from "../models/Person.js";

class PersonFactory {
    static async create(name,age){
        return await Person.create({name,age});
    }
}

export default PersonFactory;