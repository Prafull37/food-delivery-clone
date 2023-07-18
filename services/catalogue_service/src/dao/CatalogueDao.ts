
import {knex} from '../initialize'
import { CatalogueInterface } from '../model/catalogue.model';

const _table:string=  process.env.DATABASE_TABLE || "catalogue_table"

class CatalogueDAO{
    static async createACatalogue(catalogueDetails:CatalogueInterface):Promise<CatalogueInterface>{
       const newCatalogue:Array<CatalogueInterface> =  await knex.insert(catalogueDetails).into(_table).returning("*");
       return newCatalogue[0]
    }

    static async getACatalogue({catalogueId,restaurantId,restaurantOwnerId}:Record<string,string>):Promise<CatalogueInterface>{
        const newCatalogue:Array<CatalogueInterface> = await knex.select("*").from(_table).where({id:catalogueId,restaurantId,restaurantOwnerId});
        return newCatalogue[0];
    }

    static async updateACatalogue({catalogueId,restaurantId,restaurantOwnerId}:Record<string,string>,catalogueDetails:CatalogueInterface):Promise<CatalogueInterface>{
        const newCatalogue:Array<CatalogueInterface> = await knex.table(_table).where({id:catalogueId,restaurantId,restaurantOwnerId}).update(catalogueDetails).returning("*")
        return newCatalogue[0];
    }

    static async deleteACatalogue({catalogueId,restaurantId,restaurantOwnerId}:Record<string,string>):Promise<CatalogueInterface>{
        const newCatalogue:Array<CatalogueInterface> = await knex.table(_table).where({id:catalogueId,restaurantId,restaurantOwnerId}).del();
        return newCatalogue[0]
    }
}

export default CatalogueDAO;