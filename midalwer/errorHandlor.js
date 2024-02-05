import Joi from "joi";
import { DEBUG_MODE } from "../Config/index.js";
import customeerrorHandler from "../service/customerrorHandler.js";
const { ValidationError } = Joi;

const erroeHandlor = (err, req, res, next) => {
    let statuscode = 500;
    let errordata = {
        message: "internal servar error",

        ...(DEBUG_MODE === 'true' && { originalerror: err.message })

    }
    if (err instanceof ValidationError) {
        statuscode = 420,
            errordata = {
                message: err.message
            }

    }


    if (err instanceof customeerrorHandler) {
        statuscode = err.status;
        errordata = {
            message: err.message
        }

    }
       

    res.status(statuscode).json(errordata)
}
export default erroeHandlor;