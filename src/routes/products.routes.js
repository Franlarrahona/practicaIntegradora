import { Router } from "express";


import ProductsManager from "../dao/products.manager.mdb.js";
import config from "../config.js";


const router = Router();
const manager = new ProductsManager();


router.get('/', async (req, res) => {
    try{
        const process = await manager.getAll()
        res.status(200).send({origin: config.SERVER, payload: process})
    }catch(err){
        res.status(200).send({origin: config.SERVER, payload:null, error:err.message})
    }
})

router.get('/:page', async (req, res) =>{
    try {
        const process = await manager.getPaginated(config.PRODUCTS_PER_PAGE, req.params.page)
        res.status(200).send({origin: config.SERVER, payload: process });
    } catch (err){
        res.status(200).send({origin: config.SERVER, payload:null, error: err.message });
    } ;
});


router.post('/', async (req, res) =>{
    try{
        const process = await manager.add(req.body)

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