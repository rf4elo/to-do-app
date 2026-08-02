import express, { Request, Response } from "express";

import ProtectedRoutes from "./routes/protectedRoutes.ts";
import UserRoutes from "./routes/userRoutes.ts";

import cookieParser from "cookie-parser";


const App: express.Application = express();


App.use(express.urlencoded({ extended: true }));
App.use(express.json());

App.use(cookieParser());


App.use(UserRoutes);
App.use(ProtectedRoutes);


export default App;
