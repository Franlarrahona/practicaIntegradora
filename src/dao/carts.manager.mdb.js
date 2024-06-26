import cartsModel from "./models/carts.model.js";


class cartManager {
    constructor(){
    }
    getAll = async () =>{
        try{
            return await cartsModel.find()
            .lean()
        }catch (err){
            return err.message
        }
    }

}

export default cartManager
