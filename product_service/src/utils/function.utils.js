

//string
export function isString(string){ return typeof string ==='string'};

//array
export function isArray(array){return Array.isArray(array)};

export function head(array){
    if(Array.isArray(array)) return array[0]
    return;
}

//Object
export function isObject (object){return object instanceof Object;}; 
export function keys (object){return Object.keys(object)};


//collection
export function size(collection){
    if( isString(collection) || isArray(collection)){
        return collection.length
    }
    if(isObject(collection)){
        keys(collection).length
    }
   return 0;
}

export function isEmpty(collection){
    if(collection === null || collection === undefined) return true;
    if( isString(collection) || isArray(collection)){
        return size(collection)===0
    }
    if(isObject(collection)){
        return keys(collection).length
    }
    return false;
}


//function
export function noop(){};
export function identity(...params){
  return  size(params)>0?params:_head(params);
}



