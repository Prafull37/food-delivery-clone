import {v4 as uuidV4} from 'uuid';

import AWSUploader from "../config/cloud/aws/aws.config.js";
import FoodQuery from "../query/food.query.js";
import { generateFileNameFromFileObject, getFileName } from "../utils/fileUtils.js";

class FoodController{
       static async createANewItem(req,res,next){
              try{
                     const body = req.body;
                     const file = req.file;
                     const doesFileExists = !!file;

                     const {userid:userId,restaurantid:restaurantId,restaurantownerid:restaurantOwnerId}=req.headers;

                     const updatedFileObject = doesFileExists ? generateFileNameFromFileObject(file,{userId,restaurantId,restaurantOwnerId}):{};
                     const filename = doesFileExists ? getFileName(updatedFileObject):'';
                     
                     doesFileExists && await AWSUploader.uploadToS3(updatedFileObject);

                     const updatedDetails={
                            ...body,
                            createdBy:userId,
                            restaurantId:restaurantId,
                            restaurantOwnerId:restaurantOwnerId,
                            createdTime:new Date(Date.now()).toISOString(),
                            filename:filename,
                            id:uuidV4(),
                     }

                     const updatedData = await FoodQuery.createNewItem(updatedDetails);
                     const {filename:updatedFileName,...restFileName} = updatedData;
                     const presigendUrl = doesFileExists ? await AWSUploader.getAwsPresignedUrl(updatedFileName):'';
              
                     return res.send({
                            data:{...updatedData,fileUrl:presigendUrl},
                     });
              }catch(e){
                     next(e);
              }   
       } 
       
       static async getAFoodItem(req,res,next){
          try{
              const {restaurantid:restaurantId,restaurantownerid:restaurantOwnerId} = req.headers;
              const {id} = req.params;

              const foodItem = await FoodQuery.getItem({id,restaurantId,restaurantOwnerId,permanentlyDeleted:false});

              const {filename,...rest} = foodItem;
              const doesFileExists = !!filename;
              const presigendUrl = doesFileExists?await AWSUploader.getAwsPresignedUrl(filename):'';

              const body =  {
                     ...rest,
                     fileUrl:presigendUrl,
              };

              return res.send({
                     data:body
              })
          }catch(e){
              next(e);
          }

       }

       static async updateAFoodItem(req,res,next){
          try{
              const {id} = req?.params;
              const file = req?.file ;
              const doesFileExists = !!file;
              const body = req.body;
              const {userid:userId,restaurantid:restaurantId,restaurantownerid:restaurantOwnerId}=req.headers;

              const foodData =await FoodQuery.getItem({id,restaurantId,restaurantOwnerId,permanentlyDeleted:false});

              const updatedFileObject =doesFileExists ?generateFileNameFromFileObject(file,{userId,restaurantId,restaurantOwnerId}):{};
              const filename = doesFileExists ? getFileName(updatedFileObject):(foodData.filename || '');
              
              doesFileExists&&await AWSUploader.uploadToS3(updatedFileObject);

              const updatedDetails={
                     ...foodData,
                     ...body,
                     updatedBy:userId,
                     restaurantId:restaurantId,
                     restaurantOwnerId:restaurantOwnerId,
                     updatedTime:new Date(Date.now()).toISOString(),
                     filename:filename,
              }

              const updatedData = await FoodQuery.updateAItem(updatedDetails,{id,restaurantId,restaurantOwnerId});
              const {filename:updatedFileName,...restFileName} = updatedData;
              const presigendUrl =doesFileExists? await AWSUploader.getAwsPresignedUrl(updatedFileName):"";

              return res.send({
                     data:{...updatedData,fileUrl:presigendUrl},
              });
          }catch(e){
              next(e);
          }
       }

       static async deleteAItem(req,res,next){
          try{
              const {id} = req?.params;
              const {restaurantid:restaurantId,restaurantownerid:restaurantOwnerId,userid:userId } = req.headers;
              const item = await FoodQuery.getItem({id,restaurantId,restaurantOwnerId,permanentlyDeleted:false});

              const {fileName } = item;
              const doesFileExists=!!fileName;
              doesFileExists && await AWSUploader.deleteFileFromS3(fileName);

              const body={
                     permanentlyDeleted:true,
                     permanentlyDeletedBy:userId,
                     updatedTime:new Date(Date.now()).toISOString(),
              }

              await FoodQuery.updateAItem(body,{id,restaurantid:restaurantId,restaurantownerid:restaurantOwnerId});

              return res.send({message:"Deleted sucessfully"});
          }
          catch(e){
              next(e)
          }
       }

       static async getAllItemInARestaurant(req,res,next){
         try{
              const {restaurantid:restaurantId,restaurantownerid:restaurantOwnerId}= req.headers;

              const foodItem = await FoodQuery.getItem({restaurantId,restaurantOwnerId,permanentlyDeleted:false});
              let updatedFoodItem=[];
              for(let food of foodItem){
                     const {filename,...restDetails}=food;
                     const doesFileExists = !!filename
                     const presigendUrl = doesFileExists?await AWSUploader.getAwsPresignedUrl(filename):'';
                     updatedFoodItem.push({...restDetails,fileUrl:presigendUrl})
              }
              res.send({data:updatedFoodItem});
         }
         catch(e){
              next(e);
         }
       }   
}



export default FoodController;