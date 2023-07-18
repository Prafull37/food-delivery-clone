import { Request,Response,NextFunction } from "express";
import { IncomingHttpHeaders } from "http";

import { CatalogueInterface } from "../model/catalogue.model";
import CatalogueDAO from "../dao/CatalogueDao";

import { v4 as uuidV4} from 'uuid'

interface CatalogueHeader extends IncomingHttpHeaders{
    userId:string,
    restaurantId:string,
    restaurantOwnerId:string
}

class CatalogueController{
    static async createACatalogue(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const {catalogueDetails} = req.body;
            const {userId,restaurantId,restaurantOwnerId} = req.headers as unknown as CatalogueHeader;

            const updatedCatalogueDetails:CatalogueInterface={
                ...catalogueDetails,
                id:uuidV4(),
                createdBy:userId,
                createdOn:new Date().toISOString(),
                restaurantId,
                restaurantOwnerId,
            }

            const resoponse = await CatalogueDAO.createACatalogue(updatedCatalogueDetails)
            res.json({resoponse})
            return;
        }catch(e){
            console.log(e)
            next(e);
            return;
        }
    }

    static async getACatalogue(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const {catalogueId}:{catalogueId:string} = req.body;
            const reqHeader:CatalogueHeader = req.headers as unknown as CatalogueHeader;
            const {restaurantId,restaurantOwnerId}:{restaurantId:string,restaurantOwnerId:string} = reqHeader;
            const catalogueDetails = await CatalogueDAO.getACatalogue({catalogueId,restaurantId,restaurantOwnerId})
            res.json({catalogueDetails})
            return
        }catch(e){
            console.log(e);
            next(e);
        }
    }

    static async updateACatalogue(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const {catalogueDetails}:{catalogueDetails:CatalogueInterface} = req.body;
            const catalogueId:string = catalogueDetails.id;
            const reqHeader:CatalogueHeader = req.headers as unknown as CatalogueHeader;
            const {restaurantId,restaurantOwnerId}:{restaurantId:string,restaurantOwnerId:string} = reqHeader;
            const updatedCatalogueDetails = await CatalogueDAO.updateACatalogue({catalogueId,restaurantId,restaurantOwnerId},catalogueDetails)
            res.json({catalogueDetails:updatedCatalogueDetails})
            return
        }catch(e){
            console.log(e);
            next(e);
        }
    }

    static async deleteACatalogue(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const {catalogueDetails}:{catalogueDetails:CatalogueInterface} = req.body;
            const catalogueId:string = catalogueDetails.id;
            const reqHeader:CatalogueHeader = req.headers as unknown as CatalogueHeader;
            const {restaurantId,restaurantOwnerId}:{restaurantId:string,restaurantOwnerId:string} = reqHeader;
            const updatedCatalogueDetails = await CatalogueDAO.deleteACatalogue({catalogueId,restaurantId,restaurantOwnerId})
            res.json({catalogueDetails:updatedCatalogueDetails})
            return;
        }catch(e){
            console.log(e);
            next(e);
            return;
        }
    }
}

export default CatalogueController;