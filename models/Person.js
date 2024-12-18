export default class Person{
    constructor({id,name,email}){
        this.id = id;
        this.name = name;
        this.email = email;
    }
    static fromRow({id,name,email}=row){
        return new Person({id,name,email});
    }
    toRow(){
        return{
            name:this.name,
            email:this.email,
        }
    }
}