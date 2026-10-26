import { ApolloServer } from "@apollo/server";
import { resolvers } from "./app/root-resolver.js";
import { typeDefs } from "./app/root-schema.js";
import "reflect-metadata";
import { config } from "dotenv";
import { appDataSource } from "./config/db.config.js";
import express from "express";
import { expressMiddleware } from "@as-integrations/express4";
import { getOgUrl } from "./url/url.service.js";
import httpProxy from "http-proxy";
const app = express();
config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const proxy = httpProxy.createProxyServer({
  target: "http://localhost:4000/graphql",
  secure:true,
  changeOrigin: true,
});

try {
  const connection = await appDataSource.initialize().then(async()=>{
  import('./utils/cronJob.js')});
  console.log("db is connected");

  await server.start();
  app.use("/graphql", express.json(), expressMiddleware(server));

  app.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).send("id is required");
      }

      const originalUrl = await getOgUrl(id);
      if (!originalUrl) {
        res.status(404).send("url is not present");
      }

    return  proxy.web(req,res,{
          changeOrigin:true,
          target: originalUrl.originalUrl,
          ignorePath: true,
          secure: true,
      },
      (err) => {
        console.error("Proxy error:", err);

        if (!res.headersSent) {
          res.status(502).send("Unable to fetch the destination");
        }
      })
     
    } catch (err) {
      console.log(err);
    }
  });

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000/graphql`);
  });

} catch (error) {
  console.log("error", error);
}
