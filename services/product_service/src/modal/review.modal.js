import { isArray, isEmpty } from "../utils/function.utils.js";

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
   static fromParser(reviews){

        if(isEmpty(reviews))return reviews;

        const isReviewArray = isArray(reviews);

        if(isReviewArray){
           return reviews.map(({id,item_id,review_status})=>({id,itemId:item_id,reviewStatus:review_status}))
        }

        return {
            id:reviews.id,
            itemId:reviews.item_id,
            reviewStatus : reviews.review_status
        }
    }
}

export default ReviewModal;