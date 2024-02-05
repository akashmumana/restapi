import multer from "multer";
import customeerrorHandler from "../service/customerrorHandler.js";
import Joi from "joi";
import fs from "fs";
import porduct from "../moudal/porduct.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload")
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const handleMultipartFile = multer({ storage, limits: { fileSize: 1000000 * 50 } }).single("profile")

const productcontroller = {
    store(req, res, next) {
        handleMultipartFile(req, res, async (err) => {
            if (err) {
                return next(customeerrorHandler.ServarError(err.message))
            }
            // console.log(req.file)
            const filepath = req.file.path;
            console.log(filepath);

            const productSchema = Joi.object({
                name: Joi.string().required(),
                price: Joi.number().required(),
                size: Joi.string().required()
            })
            const { error } = productSchema.validate(req.body)
            if (error) {
                fs.unlinkSync(`${AppRoot}/${filepath}`, () => {
                    return next(customeerrorHandler.ServarError(err.message));
                })
                return next(error)
            }

            let docment;
            try {
                const { name, price, size } = req.body;
                docment = await porduct.create({
                    name,
                    price,
                    size,
                    image: filepath
                });
            }
            catch (err) {
                return next(err)

            }
            res.json({ docment });

        })
    },
    async update(req, res, next) {
        handleMultipartFile(req, res, async (err) => {
            if (err) {
                return next(customeerrorHandler.ServarError(err.message))
            }
            // console.log(req.file)
            let filepath;

            if (req.file) {
                filepath = req.file.path;
            }

            const productSchema = Joi.object({
                name: Joi.string().required(),
                price: Joi.number().required(),
                size: Joi.string().required()
            })
            const { error } = productSchema.validate(req.body);
            if (error) {
                if(req.file){
                    fs.unlinkSync(`${AppRoot}/${filepath}`, () => {
                        return next(customeerrorHandler.ServarError(err.message));
                    })
                }
                return next(error)
            }

            let docment_update;
            try {

                if(req.file){
                    const documentData = await porduct.findById({_id: req.params.id});
                    console.log(documentData);

                    let imageUpdete = documentData.image

                    fs.unlinkSync(`${AppRoot}/${imageUpdete}`, () => {
                        return next(customeerrorHandler.ServarError(err.message));
                    })

                }

                const { name, price, size } = req.body;
                docment_update = await porduct.findByIdAndUpdate({ _id: req.params.id }, {
                    name,
                    price,
                    size,
                    image: filepath
                });

            }
            catch (err) {
                return next(err)

            }

            res.json({ docment_update });

        })
    },
   async delete(req,res,next){
        const deleteproduct = await porduct.findByIdAndDelete({_id:req.params.id})

        const imgepath = deleteproduct.image
        fs.unlinkSync(`${AppRoot}/${imgepath}`, () => {
            return next(customeerrorHandler.ServarError(err.message));
        })
        res.json({deleteproduct})
    }
    

}
export default productcontroller;