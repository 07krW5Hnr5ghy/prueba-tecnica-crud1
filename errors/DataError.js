class DataError extends Error{
    constructor(message,statusCode=400){
        super(message);
        this.name = "DataError";
        this.statusCode = statusCode;
    }
}

export default DataError;