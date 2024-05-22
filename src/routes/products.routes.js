import { Router } from "express";
import productsModel from "../dao/models/products.model.js";

import config from "../config.js";


const router = Router();

router.get('/', async (req, res) =>{
    try {
        const products = await productsModel.find().lean();
        res.status(200).send({origin: config.SERVER, payload: products });
    } catch (err){
        res.status(200).send({origin: config.SERVER, payload:null, error: err.message });
    } ;
});

router.post('/', async (req, res) =>{
    try{
        const socketServer = req.app.get('socketServer');
        const process = await productsModel.create(req.body)

        res.status(200).send ({origin: config.SERVER, payload: process});
    }catch(err) {
        res.status(200).send({ origin: config.SERVER, payload: null, error: err.message });
    }

})

router.put('/:id', async(req, res) =>{
    try{
        const filter = {_id : req.params.id};
        const update = req.body;
        const option = {new: true};
        const process = await productsModel.findOneAndUpdate(filter, update, option);

        res.status(200).send({ origin: config.SERVER, payload: process });
    }catch (err){
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
})

router.delete('/:id', async (req, res) =>{
    try{
        const filter = {_id: req.params.id};
        const process = await productsModel.findOneAndDelete(filter);
        res.status(200).send({ origin: config.SERVER, payload: process });
    }catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});


export default router