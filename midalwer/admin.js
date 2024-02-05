import user from "../moudal/user.js"
import customeerrorHandler from "../service/customerrorHandler.js";


const admin =async (req,res,next)=>{
    try{
        const adminid =await user.findOne({_id:req.user._id})
        // console.log(adminid);

        if(adminid.role ==="admin"){
            next();

        }else{
            return next(customeerrorHandler.unauthoriza());    
        }

    }
    catch(err){
        return next(customeerrorHandler.ServarError());

    }

}
export default admin;