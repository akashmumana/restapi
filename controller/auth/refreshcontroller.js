import Joi from "joi";
import customeerrorHandler from "../../service/customerrorHandler.js";
import user from "../../moudal/user.js";
import jwtService from "../../service/jwtservice.js";
import { REFRESH_SECRETKEY } from "../../Config/index.js";
import refreshtoken from "../../moudal/refreshtoken.js";


const refreshcontroller = {

    async refresh(req, res, next) {
        const refSchema = Joi.object({
            token: Joi.string().required()

        })


        const { error } = refSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        let ref;

        try {
            ref = await refreshtoken.findOne({ token: req.body.token })

            if(!ref){
                return  next(customeerrorHandler.unauthoriza("invelid refresh token....."))
            }
            let userid;
            try{
                const  {_id} = await jwtService.verify(ref.token,REFRESH_SECRETKEY)
                userid =_id;
            }
            
            catch(err){
                return  next(customeerrorHandler.unauthoriza("invelid refresh token....."))
            }
            const userone =await user.findOne({_id:userid});
            if(!userone){
                return  next(customeerrorHandler.unauthoriza("user not found....."))

            }

            const access_token = jwtService.sign({ _id: userone._id, role: userone.role })
            const refresh_token = jwtService.sign({ _id: userone._id, role: userone.role }, REFRESH_SECRETKEY, '1y')


            await refreshtoken.create({token:ref})

            res.json({ access_token: access_token, refresh_token: refresh_token })
        } catch (err) {
            return next(new Error('Something went Wrong.....' + err.message))
        }

    }
}
export default refreshcontroller;