// console.log("EXECUTED! ");

// import moment from "moment";

// const currentTime = moment().format("YYYY MM DD");
// console.log(currentTime);
// const person: string = "Martin";
// const count: number = 100;

// Architectural pattern: MVC, Dependency Injection, MVP

// Design pattern: Middleware, Decotar

import dotenv from "dotenv";
dotenv.config();
import app from "./app";

// console.log("PORT:", process.env.PORT);

// console.log("MONGO_URL:",process.env.MONGO_URL);

import mongoose from "mongoose";

mongoose
.connect(process.env.MONGO_URL as string, {})
.then((data) => {
  console.log("MongoDB connection succeed");
  const PORT = process.env.PORT ?? 3003;
  app.listen(PORT,function () {
    console.log(`The server is running successfully on port: ${PORT}`);
  });
})
.catch((err) => console.log("ERROR on connection MongoDB", err));