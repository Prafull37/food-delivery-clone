export enum CategoryStatus{
    IN_DRAFT='IN_DRAFT',
    REVIEWING='REVIEWING',
    PUBLISHED='PUBLISHED',
    DELETED='DELETED'
}

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