import Person from "./Person.js";
import Car from "./Car.js";
import Pet from "./Pet.js";

const associateModels = async () => {
    Pet.belongsTo(Person,{foreignKey:"personId"});
    Person.hasMany(Pet,{foreignKey:"personId",as:"pets"});
    Car.belongsTo(Person,{foreignKey:"personId"});
    Person.hasMany(Car,{foreignKey:"personId",as:"cars"});
}

export default associateModels;