class FoodModal{
    constructor(body){
        this.columns={
            id : body.id|| null,
            typeoffoodforhumanity : body.typeOfFoodForHumanity|| null,
            typeoffoodsolidity : body.typeOfFoodSolidity|| null,
            consumedatmealtime : body.consumedAtMealTime|| null,
            quantity : body.quantity|| null,
            cuisinetype : body.cuisineType|| null,
            description:body.description|| null,
            name:body.name|| null,
            price:body.price|| null,
            packagingprice:body.packagingPrice|| null,
            filename:body.filename|| null,
            availability:body.availability|| null,
            availabilitytimerange:body.availabilityTimeRange|| null,
            availabilitycutomrange:body.availabilityCutomRange|| null,
            createdby:body.createdBy|| null,
            restaurantid:body.restaurantId|| null,
            restaurantownerid:body.restaurantOwnerId|| null,
            createdtime:body.createdTime|| null,
            updatedtime:body.updatedTime || null,
            updatedby:body.updatedBy || null,
            permanentlydeleted:body.permanentlyDeleted ||  null,
            permanentlydeletedby:body.permanentlyDeletedBy|| null,
        }
    }
    
    getColumns(){
       return this.columns
    }
}

export default FoodModal;