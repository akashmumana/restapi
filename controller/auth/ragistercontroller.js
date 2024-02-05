import Joi from "joi"
import regdata from "../../moudal/user.js"
import customeerrorHandler from "../../service/customerrorHandler.js"
import bcrypt from 'bcrypt'
import jwtService from "../../service/jwtservice.js"
import { REFRESH_SECRETKEY } from "../../Config/index.js"

const ragistercontroller = {
    async register(req, res, next) {
        const inserSchem = Joi.object({
            name: Joi.string().min(2).max(15).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            reppasword: Joi.ref('password'),
            role: Joi.string().default('customer')
        })

        const { error } = inserSchem.validate(req.body)
        if (error) {
            return next(error)
        }

        const { name, email, password, role } = req.body;
        try {
            const exist = await regdata.exists({ email: req.body.email })
            console.log(exist);
            if (exist) {
                return next(customeerrorHandler.alreadyExist("email is already exist"))
            }
        } catch (err) {
            console.log(err)
        }
        const hashpassword =await bcrypt.hash(password,10)
        const Regdata = await regdata.create({
            name,
            email,
            password:hashpassword,
            role
        })
        let access_token ,refresh_token;
        
        try{
            
            console.log(Regdata);

            access_token= jwtService.sign({_id:regdata._id,role:regdata.role})
            refresh_token = jwtService.sign({_id:regdata._id,role:regdata.role},REFRESH_SECRETKEY, '1y')
        }catch(err){
            return next()
        }
        
        res.json({access_token:access_token,refresh_token:refresh_token})
    }
}
export default ragistercontroller;