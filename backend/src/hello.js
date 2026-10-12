// npm install express @apollo/server @as-integrations/express5
// npm install -D @types/express
// For Apollo Server 4/5 with Express 5, your server setup can look like this:

// ts
// import express from "express";
// import cors from "cors";
// import { ApolloServer } from "@apollo/server";
// import { expressMiddleware } from "@as-integrations/express5";

// import { appDataSource } from "./config/db.config.js";
// import { typeDefs } from "./graphql/typeDefs.js";
// import { urlResolver } from "./url/url.resolver.js";
// import { getOriginalUrl } from "./url/url.service.js";

// async function startServer() {
//   await appDataSource.initialize();

//   const app = express();

//   const server = new ApolloServer({
//     typeDefs,
//     resolvers: [urlResolver],
//   });

//   await server.start();

//   app.use("/graphql", cors(), express.json(), expressMiddleware(server));

//   app.get("/:key", async (req, res) => {
//     try {
//       const originalUrl = await getOriginalUrl(req.params.key);

//       if (!originalUrl) {
//         res.status(404).send("Short URL not found");
//         return;
//       }

//       res.redirect(302, originalUrl);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Internal server error");
//     }
//   });

//   app.listen(4000, () => {
//     console.log("Server running at http://localhost:4000");
//   });
// }

// startServer().catch(console.error);
// This example uses Apollo Server 4/5 with Express 5. If you want to keep your existing apollo-server v3 setup, the redirect route can instead be added to an Express app using Apollo Server 3's Express integration.

// 3. Test it
// After saving a URL with the alias programiz, open this address in your browser:

// Your short URL

// http://localhost:4000/programiz 

// Redirect destination

// Your stored original URL

// The browser should redirect automatically.

// One important detail
// Your existing shortUrl field might store a generated code such as aB12x, while aliase stores programiz. The route above supports both:

// http://localhost:4000/aB12x

// http://localhost:4000/programiz

// Make sure you also validate aliases and generated codes for uniqueness, and validate stored destination URLs before redirecting so this endpoint cannot be abused as an open redirect.


// You said:
// is there any other way to redirect the url wihout using http

// ChatGPT said:
// Yes, but it depends on what you mean by “without using HTTP.” For your URL shortener, if you want a user to enter localhost:4000/abc123 in a browser and automatically open the original website, you need an HTTP redirect or an equivalent browser navigation mechanism.

// Here are your alternatives.

// 1. Redirect using GraphQL (without a separate HTTP route)
// You can create a GraphQL query that returns the original URL, then redirect the browser on the frontend using JavaScript.

// Your GraphQL query:

// ts
// Query: {
//   getOriginalUrl: async (
//     _: unknown,
//     args: { key: string }
//   ) => {
//     return await getOriginalUrl(args.key);
//   },
// }