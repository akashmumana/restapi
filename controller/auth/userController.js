import user from "../../moudal/user.js";
import customeerrorHandler from "../../service/customerrorHandler.js";

const userController = {
   async me(req,res,next){
        try{
            const userfind =  await user.findOne({_id: req.user._id})
            // console.log(userfind);
            if(!userfind){
                return next(customeerrorHandler.notfound("this user is not found..."))
            }

            res.json(userfind)
        }catch(err){
            return next(err);    
        }
    }
}
export default userController;