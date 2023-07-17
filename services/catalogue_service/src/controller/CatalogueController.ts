import { Request,Response,NextFunction } from "express";

class CatalogueController{
    static async createACatalogue(req:Request,res:Response,next:NextFunction){
        try{
            const {catalogueDetails} = req.body;
            
        }catch(e){
            console.log(e)
        }
    }
}

export default CatalogueController;