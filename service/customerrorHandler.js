class customeerrorHandler extends Error{
    constructor(status,msg){
        super();
        this.status=status;
        this.message=msg;
    }
    static alreadyExist(message){
        return new customeerrorHandler(409,message)
    }
    static wrongdetails(message){
        return new customeerrorHandler(401,message);
    }
    static notfound(message){
        return new customeerrorHandler(405,message);
    }
    static unauthoriza(message= "user is unauthorized...!"){
        return new customeerrorHandler(404,message);
    }
    static ServarError(message){
        return new customeerrorHandler(500,message);
    }
    
}
export default customeerrorHandler;