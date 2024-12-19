import mapCarToMongo from "./carMapper.js";
import mapPetToMongo from "./petMapper.js";

const mapPersonToMongo = (person) => ({
    _id:person.id,
    name:person.name,
    age:person.age,
    cars:person.cars.map(mapCarToMongo),
    pets:person.pets.map(mapPetToMongo)
});

export default mapPersonToMongo;