import express, { Request, Response } from "express";

import ProtectedRoutes from "./routes/protectedRoutes.ts";
import UserRoutes from "./routes/userRoutes.ts";

import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.ts";


const App: express.Application = express();


App.use(express.urlencoded({ extended: true }));
App.use(express.json());


App.use(cookieParser());
App.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// App.options("*", cors());

App.use('/api', authRoute);
App.use('/api', UserRoutes);
App.use('/api', ProtectedRoutes);

export default App;
