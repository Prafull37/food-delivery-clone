import express from 'express';
import FoodController from '../controllers/food.controller.js';

import upload from '../middleware/multer.js';
import { errorLogger, errorResponder, failSafeError } from '../middleware/error.js';

const ProductRoute = express.Router();


/**
 * *  
 * 
 *  * 
 *  Restaurant owner /restaurant/
 *  CRUD for menu
 *  create/update/
 *  filter his menu
 *  read all his menu
 *  read one dish from a menu
 *  delete
 * 
 * restaurant/foods/new --> create a food.
 * restaurant/food/{foodId} -> get by Id
 * restaurant/food/{foodId} -> update by Id
 * restaurant/food/{foodId} -> delete by Id
 * restaurant/foods -> get without filters
 * restaurant/foods -> post (get all the food based on filters)
 *
 * Update a dish ( /dish/dishId)
 *      - name
 *      - type:forHumanity, veg/non-veg
 *      - image
 *      - descirption
 *      - price
 * 
 * Read all dish(/dish/all)/Read a dish(dish/dishId)
 *      - name
 *      - type:forHumanity, veg/non-veg
 *      - image
 *      - descirption
 *      - price
 *      - noOfTimesOrdered// future
 *      - ratings // future
 * 
 * Delete a dish(dish/dishId)
 *      - dishId
 * 
 * filters 
 *     - filters 
 */



ProductRoute.post('/restaurant/item/new',upload.single('image'),FoodController.createANewItem);
ProductRoute.route('/restaurant/item/:id').get(
    FoodController.getAFoodItem
)
.put(upload.single('image'),FoodController.updateAFoodItem)
.delete(FoodController.deleteAItem);

ProductRoute.route('/getItems/restaurant').get(FoodController.getAllItemInARestaurant);


export default ProductRoute;