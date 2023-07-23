import {CategoryStatus} from '../constants/categoryStatus.constants'

export interface CatalogueInterface{
    readonly id:string,
    catalogueName:string,
    items:Array<string>,
    categoryStatus:CategoryStatus,
    createdBy:string,
    createdOn:string,
    updatedOn?:string,
    restaurantId:string,
    restaurantOwnerId:string,
    userId:string,
}