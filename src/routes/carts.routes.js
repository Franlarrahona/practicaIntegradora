import { Router } from "express";

import config from "../config.js";
import cartManager from "../dao/carts.manager.mdb.js";

const router = Router();
const manager = new cartManager();

router.get('/', async (req,res) =>{
    try{
        const process = await manager.getAll()
        res.status(200).send({origin: config.SERVER, payload: process})
    }catch(err){

    }
})

export default router