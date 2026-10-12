export const baseAlgo = async function(shortId:Number){
    const alphabet = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    const baseVal = 62;
    let result = ''
    let id = Number(shortId)
    while(id > 0){
        let index = id%baseVal;
         result = result + alphabet[index];
         id = Math.floor(id/62);
    }

    return result;
} 