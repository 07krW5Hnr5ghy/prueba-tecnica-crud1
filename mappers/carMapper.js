const mapCarToMongo = (car) => ({
    id:car.id,
    model:car.model,
    brand:car.brand
});

export default mapCarToMongo;