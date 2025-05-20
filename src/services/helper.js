export const getToday = function (options = {} ){
    const today = new Date();
    if(options?.end){
        today.setUTCHours(23, 59, 59, 999);
    }
    else{
        today.setUTCHours(0, 0, 0, 0);
    }
    return today.toISOString();
}