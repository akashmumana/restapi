import Joi from "joi";
import customeerrorHandler from "../../service/customerrorHandler.js";
import user from "../../moudal/user.js";;
import bcrypt from 'bcrypt';
import jwtService from "../../service/jwtservice.js";
import { REFRESH_SECRETKEY } from "../../Config/index.js";
import refreshtoken from "../../moudal/refreshtoken.js";


const logingController = {
    async loging(req, res, next) {
        const logingSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        })


        const { error } = logingSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        try {
            const findUser = await user.findOne({ email: req.body.email });
            // console.log(regdata);
            if (!findUser) {
                return next(customeerrorHandler.wrongdetails("this is email not velid"))
            }
            const match = await bcrypt.compare(req.body.password, findUser.password);
            if (!match) {
                return next(customeerrorHandler.wrongdetails("this password is wrong..."))
            }

            const access_token = jwtService.sign({ _id:findUser._id, role:findUser.role })
            const refresh_token = jwtService.sign({ _id: findUser._id, role: findUser.role }, REFRESH_SECRETKEY, '1y')

            await refreshtoken.create({ token: refresh_token })

            // res.json({ access_token: access_token })
            res.json({ access_token: access_token, refresh_token: refresh_token })
        }
        catch (err) {
            return next(err)
        }

        // res.json("success")
    },
    async logout(req,res,next){
        const logoutSchema = Joi.object({
            token: Joi.string().required()
            
        })


        const { error } = logoutSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        try{
            await refreshtoken.deleteOne({token:req.body.token})

        }catch(err){
            return next(new Error());
        }
        res.json("data delet....")
    }
    
}
export default logingController;