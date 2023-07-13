
import FoodModal from "../modal/food.modal.js";
import { getColumnsKeysAndValues, getValueForUpdateInPostgressQuery, getValuesStringInPostgresQuery, query } from "../database/pg.js";

class FoodQuery{
    static async createNewItem(body){
        const foodObject = new FoodModal(body).getColumns();
        const {columns,values} = getColumnsKeysAndValues(foodObject);

        const queryString =`INSERT INTO food_table(${columns.join(",")}) VALUES (${getValuesStringInPostgresQuery(columns)}) RETURNING * `;
        const response = await query(queryString,values);
        return response;
    }

    static async getItem(matcher){
        const foodObject = new FoodModal(matcher).getColumns();
        const {columns,values}= getColumnsKeysAndValues(foodObject);
        const matcherArray = getValueForUpdateInPostgressQuery(columns)
        const queryString= `SELECT * FROM food_table WHERE ${matcherArray.join(' AND ')}`;
        const response = await query(queryString,values);
        return response;
    }

    static async updateAItem(body,matcher){
        const foodObject = new FoodModal(body).getColumns();
        const {columns,values}= getColumnsKeysAndValues(foodObject);
        const columnsForUpdate = getValueForUpdateInPostgressQuery(columns)
        const valuesLength = values.length;
        const matcherObject = new FoodModal(matcher).getColumns();
        const {columns:matcherColumns,values:matcherValues}= getColumnsKeysAndValues(matcherObject);
        const matcherArray = getValueForUpdateInPostgressQuery(matcherColumns,valuesLength)
        const queryString= `UPDATE  food_table SET  ${columnsForUpdate.join(",")} WHERE ${matcherArray.join(" AND ")} RETURNING *`;
        const response = await query(queryString,[...values,...matcherValues]);
        return response;
    }
}

export default FoodQuery;