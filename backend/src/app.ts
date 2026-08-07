import express, { Request, Response } from "express";

import ProtectedRoutes from "./routes/protectedRoutes.ts";
import UserRoutes from "./routes/userRoutes.ts";

import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.ts";


const App: express.Application = express();


App.use(express.urlencoded({ extended: true }));
App.use(express.json());


const allowedOrigins = ['http://localhost:5173'];
App.use(cors({
    origin: function(origin, callback) {
        if(!origin || allowedOrigins.indexOf(origin) != -1) {
            callback(null, true);
        } else {
            callback(new Error('Blocked by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
}));
App.use(cookieParser());

// App.options("*", cors());

App.use('/api', authRoute);
App.use('/api', UserRoutes);
App.use('/api', ProtectedRoutes);

export default App;
