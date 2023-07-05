
import ReviewModal from "../modal/review.modal.js";
import { expand, formatValueForArrayForBulkSearch, getColumnsKeysAndValues, getValueForUpdateInPostgressQuery, getValuesStringInPostgresQuery, query } from "../database/pg.js";

class ReviewQuery{
    static async createAReview(body){
        const foodObject = new ReviewModal(body).getColumns();
        const {columns,values} = getColumnsKeysAndValues(foodObject);

        const queryString =`INSERT INTO reviewstatus(${columns.join(",")}) VALUES (${getValuesStringInPostgresQuery(columns)}) RETURNING * `;
        const response = await query(queryString,values);
        return ReviewModal.fromParser(response);
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
        return ReviewModal.fromParser(response); 
    }

    static async getAReview(matcher){
        const reviewObject = new ReviewModal(matcher).getColumns();
        const {columns,values} = getColumnsKeysAndValues(reviewObject);
        const matcherArray = getValueForUpdateInPostgressQuery(columns)
        const queryString =`SELECT * FROM reviewstatus WHERE ${matcherArray.join(' AND ')}`;
        const response = await query(queryString,values);
        return ReviewModal.fromParser(response);
    }

    static async getReviews(items,matchingKey){
        const getAllReviews = matchingKey === 'all'

        const queryString= getAllReviews ?   `SELECT * FROM reviewstatus`:`SELECT * FROM reviewstatus WHERE ${matchingKey} in ${formatValueForArrayForBulkSearch(items)}`
        const response = await query(queryString);
        return ReviewModal.fromParser(response)
    }

    static async deleteAReview(item, matchingKey){
      const queryString = `DELETE FROM reviewstatus WHERE ${matchingKey}='${item}' AND EXISTS(SELECT ${matchingKey} FROM reviewstatus WHERE ${matchingKey}='${item}')`
      const response = await query(queryString);
      return ReviewModal.fromParser(response)
    }

    static async deleteReviews(items, matchingKey){
        const queryString = `DELETE FROM reviewstatus WHERE ${matchingKey} in  ${formatValueForArrayForBulkSearch(items)} and EXISTS (SELECT * FROM reviewstatus WHERE ${matchingKey} in ${formatValueForArrayForBulkSearch(items)})`
        const response = await query(queryString);
        return ReviewModal.fromParser(response)
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
        return ReviewModal.fromParser(response);
    }
}

export default ReviewQuery;