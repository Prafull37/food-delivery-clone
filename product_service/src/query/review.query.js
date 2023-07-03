
import ReviewModal from "../modal/review.modal.js";
import { expand, getColumnsKeysAndValues, getValueForUpdateInPostgressQuery, getValuesStringInPostgresQuery, query } from "../database/pg.js";

class ReviewQuery{
    static async createAReview(body){
        const foodObject = new ReviewModal(body).getColumns();
        const {columns,values} = getColumnsKeysAndValues(foodObject);

        const queryString =`INSERT INTO reviewstatus(${columns.join(",")}) VALUES (${getValuesStringInPostgresQuery(columns)}) RETURNING * `;
        const response = await query(queryString,values);
        return response;
    }

    static async createReviews(body){
        const firstObject = body[0];
        const reviewbjectColumns = new ReviewModal(firstObject).getColumns();
        const {columns} = getColumnsKeysAndValues(reviewbjectColumns);
        let valuesToAdd =[];
        for(let item of body){
            const foodObject = new ReviewModal(item).getColumns();
            const {values} = getColumnsKeysAndValues(foodObject);
            valuesToAdd.push(values);
        }
        const valuesArray =  expand(valuesToAdd.length,columns.length);
        const flattenValues = valuesToAdd.flat();
        const queryString = `INSERT INTO reviewstatus(${columns.join(",")}) VALUES ${valuesArray} RETURNING *`;
        const response = await query(queryString,flattenValues);
        return response; 
    }

    static async getAReview(matcher){
        const reviewObject = new ReviewModal(matcher).getColumns();
        const {columns,values} = getColumnsKeysAndValues(reviewObject);
        const matcherArray = getValueForUpdateInPostgressQuery(columns)
        const queryString =`SELECT * FROM reviewstatus WHERE ${matcherArray.join(' AND ')}`;
        const response = await query(queryString,values);
        return response[0];
    }

    static async getReviews(items,matchingKey){
        const queryString= `SELECT * FROM reviewstatus WHERE $1 in $2`;
        const response = await query(queryString,[matchingKey,items]);
        return response
    }

    static async deleteAReview(items, matchingKey){
      const queryString = `DELETE FROM reviewstatus WHERE $1 = $2`
      const response = await query(queryString,[matchingKey,items]);
      return response
    }

    static async deleteReviews(items, matchingKey){
        const queryString = `DELETE FROM reviewstatus WHERE $1 in $2`
        const response = await query(queryString,[matchingKey,items]);
        return response
      }
  
    static async updateAReview(body,matcher){
        const reviewObject = new ReviewModal(body).getColumns();
        const {columns,values}= getColumnsKeysAndValues(reviewObject);
        const columnsForUpdate = getValueForUpdateInPostgressQuery(columns)
        const valuesLength = values.length;
        const matcherObject = new ReviewModal(matcher).getColumns();
        const {columns:matcherColumns,values:matcherValues}= getColumnsKeysAndValues(matcherObject);
        const matcherArray = getValueForUpdateInPostgressQuery(matcherColumns,valuesLength)
        const queryString= `UPDATE  reviewstatus SET  ${columnsForUpdate.join(",")} WHERE ${matcherArray.join(" AND ")} RETURNING *`;
        const response = await query(queryString,[...values,...matcherValues]);
        return response;
    }
}

export default ReviewQuery;