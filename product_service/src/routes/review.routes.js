import express from 'express';
import ReviewController from '../controllers/review.controller.js';

const ReviewRouter = express.Router();


ReviewRouter.route('/review-status')
            .post(ReviewController.createNewReviewForAItem)
            .get(ReviewController.getReviewForAItem)
            .delete(ReviewController.deleteReviewForAItemByItemId)



ReviewRouter.route('/bulk/review-status')
                    .post(ReviewController.createNewReviewForMultipleItems)
                    .delete(ReviewController.deleteReviews)

ReviewRouter.post('/get/bulk/review-status/' ,ReviewController.getReviews)



ReviewRouter.put('/start/a/item-review',ReviewController.startReviewForAItem);
ReviewRouter.put('/draft/a/item-review',ReviewController.draftAReview);
ReviewRouter.put('/reject/a/item',ReviewController.rejectAItem);
ReviewRouter.put('/update/a/item-review-status',ReviewController.updateAItemReview);
ReviewRouter.put('/complete/a/item-review',ReviewController.completeAItemReview)


export default ReviewRouter;