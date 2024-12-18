const getPersons = async (request,response) => {
    try{
        console.log("getPersons");
        response.send("here are persons");
    }catch(error){
        console.log(error);
    }
}

export {getPersons};