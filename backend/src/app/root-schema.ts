import { gql } from "apollo-server";
import { urlSchema } from "../url/url.schema.js";

 const schema= `#graphql
  type Query {
    getAllUrl:[url]
  }
  type Mutation {
   createUrl(url:String,aliase:String):url
  }
`

export const typeDefs = gql`
  ${schema}
  ${urlSchema}
`