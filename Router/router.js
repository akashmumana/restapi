import express from 'express'
import {logingController, productcontroller, ragistercontroller, refreshcontroller, userController} from '../controller/index.js';
import userAuth from '../midalwer/userauth.js';
import admin from '../midalwer/admin.js';

const router =express.Router();


router.post('/register' ,ragistercontroller.register)
router.post('/loging',logingController.loging)
router.post('/user',userAuth ,userController.me)
router.post('/ref' ,refreshcontroller.refresh)
router.post('/logout' ,logingController.logout)
router.post('/insert',[userAuth,admin] ,productcontroller.store)
router.put('/update/:id',[userAuth,admin] ,productcontroller.update)
router.delete('/delete/:id',[userAuth,admin] ,productcontroller.delete)






export default router