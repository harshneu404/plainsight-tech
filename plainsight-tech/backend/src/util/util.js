 exports.verifyObject = (obj,keys)=>{
    const objKeys = Object.keys(obj);
    const invalidKeys = objKeys.filter((key)=> !keys.includes(key));
    return invalidKeys.length === 0;
}
