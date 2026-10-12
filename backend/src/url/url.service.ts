import { randomInt } from "crypto";
import { appDataSource } from "../config/db.config.js";
import { baseAlgo } from "../utils/baseAlgoritm.js";
import { urlEntity } from "./url.entity.js";
export const urlRepository = appDataSource.getRepository(urlEntity);
export const addUrl = async function (args: { url: string; aliase?: string }) {
  const create = urlRepository.create({
    originalUrl: args.url,
  });
  if (!args.aliase) {
    const randomNo = Math.ceil(randomInt(1000,10000) * 100000);
    const shortUrl = await baseAlgo(Number(randomNo));
    create.shortUrl = shortUrl;
  } else {
    create.shortUrl = args.aliase;
  }
  await urlRepository.save(create);
  return create;
};

export const getOgUrl =async function(key:string){
    const getData = await urlRepository.findOne({
        where:[{aliase:key},{shortUrl:key}]
    })

    if(!getData){
        throw new Error("url is not present");
    }

    return getData;
} 