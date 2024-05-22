import { Router } from "express";
import config from "../config.js";

const router = Router();

router.get('/products', (req, res) =>{
    const data = [];
    res.render('products', {data : data});
})

export default router