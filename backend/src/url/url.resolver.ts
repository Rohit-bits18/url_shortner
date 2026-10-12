import { addUrl } from "./url.service.js"

export const urlResolver = {
    Query:{
      getAllUrl:()=>'hello'
    },
    Mutation:{
        createUrl:async (_:any,args:{url:string,aliase?:string})=>{
            const result = await addUrl(args);
            return result;
        }
    }
}