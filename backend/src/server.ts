import { ApolloServer,gql } from "apollo-server";
import { resolvers } from "./app/root-resolver.js";
import { typeDefs } from "./app/root-schema.js";
import "reflect-metadata";
import { config } from "dotenv";
import { appDataSource } from "./config/db.config.js";
import express from "express";
import cors from 'cors'
const app = express();
config();
const server = new ApolloServer({
    typeDefs,
    resolvers
})


try {
    const connection = await appDataSource.initialize();
    console.log(process.env.DATABASE)
    console.log('db is connected');
} catch (error) {
    console.log("error",error)
}

app.use('/graphql',cors(),express.json(),expressMiddleware(server))




server.listen().then(({url})=>{
    console.log(`server running at port ${url}`)
})