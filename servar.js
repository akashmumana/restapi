import express from "express";
import { APP_PORT, DB_URL } from "./Config/index.js";
import router from "./Router/router.js";
import erroeHandlor from "./midalwer/errorHandlor.js";
import mongoose from "mongoose";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from "url";

const app = express();

app.use('./upload', express.static('./upload'))
const _dirname = dirname(fileURLToPath(import.meta.url));
global.AppRoot = path.resolve(_dirname);

mongoose.set('strictQuery', false)
mongoose.connect(DB_URL, { useNewUrlParser: true })
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)
app.use(erroeHandlor)


app.listen(APP_PORT, () => {
    console.log(`servar is running on ${APP_PORT}`);
})