import { Router } from "express";
import passport from "passport";

import config from "../config.js";
import { createHash, isValidPassword, verifyRequiredBody } from "../utils.js";
import UsersManager from "../dao/users.manager.mdb.js";
import initAuthStrategies from "../auth/passport.strategies.js";


const router = Router();
const manager = new UsersManager();
initAuthStrategies()

router.post('/login', async (req,res) => {
    try{
        const {email, password} = req.body;
        const foundUser = await manager.getOne({ email: email});

        if(foundUser && isValidPassword(password, foundUser.password)) {

            const { password, ...filteredFoundUser} = foundUser;
            req.session.user = filteredFoundUser;
            req.session.save(err =>{
                if(err) return res.status(500).send({origin: config.SERVER, payload: null, error: err.message});
                
                res.redirect('/products');
            });
        }else{
            res.status(401).send({ origin: config.SERVER, payload: 'Datos de acceso no válidos' });
        }

    }catch(err){
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
}); 

router.post('/pplogin', verifyRequiredBody(['email','password']), passport.authenticate('pplogin', {failureRedirect: `/login?error=${encodeURI('Usuario o clave no válidos')}`}), async ( req, res) =>{
    try{

        req.session.user = req.user;
        req.session.save( err =>{
            if(err) return res.status(500).send({ origin: config.SERVER, payload: null, error:err.message});
            res.redirect('/products');

        });
    }catch(err){
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message});
    }
});




export default router