import customeerrorHandler from "../service/customerrorHandler.js";

import jwtService from "../service/jwtservice.js";

const userAuth = (req,res,next)=>{
    let authheader = req.headers.authorization;
    // console.log(authheader);

    if(!authheader){
        return next(customeerrorHandler.unauthoriza())
    }
    const token = authheader.split(" ")[1];
        // console.log(token)

    try{
        const {_id, role} = jwtService.verify(token);
        const user ={
            _id,
            role
        }
        req.user = user;
        // console.log(req.user._id);
        next();
    }
    catch(err){
        return next(customeerrorHandler.unauthoriza("unauthoriza"));
    }
}
export default userAuth