import { REVIEW_ACTIONS } from "../constants/reviewStatus.constants.js";
import statusMachine from "../helpers/statusMachine/status.machine.js";
import ReviewQuery from "../query/review.query.js";
import {v4 as uuidV4} from 'uuid';
import { isEmpty } from "../utils/function.utils.js";

const updateReviewStatus = async (payload,actionType)=>{
    const reviewDetails = await ReviewQuery.getAReview(payload);
    const {review_status:currentStatus,...rest} = reviewDetails;
    const nextStatus= statusMachine.transition(currentStatus,actionType);
    const updatedDetails = await ReviewQuery.updateReviewStatus({...rest,reviewStatus:nextStatus})
    return updatedDetails
}


class ReviewController{
    static async createNewReviewForAItem(req,res,next){
        try{
            const {itemId} = req.params;
            const initalStatus = statusMachine.getInitialState();
            const reviewDetails = await ReviewQuery.createAReview({
                id:uuid(),
                itemId,
                reviewStatus:initalStatus
            });
            return res.status(200).json(reviewDetails)
        }catch(err){
            next(err)
        }   
    } 

    static async createNewReviewForMultipleItems(req,res,next){
        try{
            const {itemIds} = req.body;
            const initalStatus = statusMachine.getInitialState();
            const itemIdsToUpdate = itemIds.map(itemIds,(itemId)=>({id:uuid(),itemId,reviewStatus:initalStatus}))
            const reviewDetails = await ReviewQuery.createReviews(itemIdsToUpdate);
            return res.status(200).json(reviewDetails)
        }catch(err){
            next(err)
        }   
    } 


    static async getReviewForAItem(req,res,next){
        try{
            const {itemId,id} = req.params;
            const reviewDetails = await ReviewQuery.getAReview({
                itemId,
                id
            });
            return res.status(200).json(reviewDetails)
        }catch(err){
            next(err)
        }   
    }

    static async getReviews(req,res,next){
        try{
            const {itemIds,ids=null} = req.body;
            let reviewDetails;
            if(!isEmpty(ids)){
                reviewDetails=await ReviewQuery.getReviews(ids,'id');
                return res.status(200).json(reviewDetails)
            }

            reviewDetails=await ReviewQuery.getReviews(itemIds,'item_id');
            return res.status(200).json(reviewDetails)
        }catch(err){
            next(err)
        }   
    }


    static async deleteReviewForAItemByItemId(req,res,next){
        try{
            const {itemId,id} = req.params;
            if(!isEmpty(itemId)){
                await ReviewQuery.deleteAReview(itemId,'item_id')
                return res.status(200).send({message:"Deleted Successfully"})
            }

            await ReviewQuery.deleteAReview(id,'id')
            return res.status(200).send({message:"Deleted Successfully"})    
        }catch(err){
            next(err)
        }  
    }

    static async deleteReviews(req,res,next){
        try{
            const {itemIds=[],ids=[]} = req.body;
            if(!isEmpty(itemIds)){
                await ReviewQuery.deleteAReview(itemIds,'item_id')
                return res.status(200).send({message:"Deleted Successfully"})
            }
           
            await ReviewQuery.deleteAReview(ids,'ids')
            return res.status(200).send({message:"Deleted Successfully"})
        }catch(err){
            next(err)
        }  
    }

    static async startReviewForAItem(req,res,next){
        try{
            const {itemId=null,id=null} = req;
            const updatedReviewStatus = updateReviewStatus({itemId,id},REVIEW_ACTIONS.ON_START_REVIEW);
            return res.status(200).send({data:updatedReviewStatus})
        }catch(err){
            next(err)
        }
       
    }

    static async startReviewForAItem(req,res,next){
        try{
            const {itemId=null,id=null} = req;
            const updatedReviewStatus = updateReviewStatus({itemId,id},REVIEW_ACTIONS.ON_START_REVIEW);
            return res.status(200).send({data:updatedReviewStatus})
        }catch(err){
            next(err)
        }
       
    }

    static async draftAReview(req,res,next){
        try{
            const {itemId=null,id=null} = req;
            const updatedReviewStatus = updateReviewStatus({itemId,id},REVIEW_ACTIONS.ON_DRAFT);
            return res.status(200).send({data:updatedReviewStatus})
        }catch(err){
            next(err)
        }
    }

    static async updateAItemReview(req,res,next){
        try{
            const {itemId=null,id=null} = req;
            const updatedReviewStatus = updateReviewStatus({itemId,id},REVIEW_ACTIONS.ON_UPDATE);
            return res.status(200).send({data:updatedReviewStatus})
        }catch(err){
            next(err)
        }
    }

    static async rejectAItem(req,res,next){
        try{
            const {itemId=null,id=null} = req;
            const updatedReviewStatus = updateReviewStatus({itemId,id},REVIEW_ACTIONS.ON_REJECT);
            return res.status(200).send({data:updatedReviewStatus})
        }catch(err){
            next(err)
        }
    }

    static async completeAItemReview(req,res,next){
        try{
            const {itemId=null,id=null} = req;
            const updatedReviewStatus = updateReviewStatus({itemId,id},REVIEW_ACTIONS.ON_COMPLETE);
            return res.status(200).send({data:updatedReviewStatus})
        }catch(err){
            next(err)
        }
    }
}


export default ReviewController;