import express from 'express'
import CatalogueController from '../controller/CatalogueController';

const CatalogueRouter  = express.Router();

/**Create a catalgue */
/**GET a catalgue */
//Edit A Catalogue Details
//Delete A Catalogue 


CatalogueRouter.route('/')
                .post(CatalogueController.createACatalogue)
                .get(CatalogueController.getACatalogue)
                .put(CatalogueController.updateACatalogue)
                .delete(CatalogueController.deleteACatalogue)

CatalogueRouter.post('/on-review',CatalogueController.onReview)
CatalogueRouter.post('/on-complete',CatalogueController.onComplete)
CatalogueRouter.post('/on-delete',CatalogueController.onDelete)
CatalogueRouter.post('/on-start-review',CatalogueController.onStartReview)
CatalogueRouter.post('/on-publish',CatalogueController.onPublish)




export default CatalogueRouter;


/**
 * Create A catalogue 
 *  - id
 *  - Catalogue Name
 *  - items
 *  - category status (IN_DRAFT | REVIEWING | PUBLISHED | DELETED)
 *  - createdBy
 *  - createdOn
 *  - updatedOn
 *  - restaurantId
 *  - restaurantOwnerId
 * 
 * 
 * 
 * Get A Catalogue
 *  - id
 * 
 * Edit A Catalogue Details
 *  - id
 *  - Catalogue Name
 *  - items
 *  - status 
 *  - createdBy
 * 
 * Delete A Catalogue
 *  - id
 * 
 * Add a Product in catalogue 
 * Delete a Product in catalogue 
 * Publish A catalogue

 */