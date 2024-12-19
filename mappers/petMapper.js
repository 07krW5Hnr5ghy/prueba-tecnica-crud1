const mapPetToMongo = (pet) => ({
    id:pet.id,
    name:pet.name,
    type:pet.type
});

export default mapPetToMongo;