class ReviewModal{
    constructor(body){
        this.columns={
            id : body.id|| null,
            item_id:body.itemId ||null,
            review_status:body.reviewStatus || null
        }
    }
    
    getColumns(){
       return this.columns
    }
}

export default ReviewModal;