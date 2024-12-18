import { DataTypes } from "sequelize";

import postgresInstance from "../configs/postgres.js";

import Person from "./Person.js";

const sequelize = postgresInstance.getSequelize();

const Pet = sequelize.define(
    "pet",
    {
        id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
        name:{type:DataTypes.STRING,allowNull:false},
        type:{type:DataTypes.STRING,allowNull:false},
        personId:{
            type:DataTypes.INTEGER,
            references:{model:Person,key:"id"},
            allowNull:false,
        },
    },
    {
        schema:'main',
        underscored:true,
        timestamps:false
    }
);

Pet.belongsTo(Person,{foreignKey:"personId"});
Person.hasMany(Pet,{foreignKey:"personId"});

export default Pet;