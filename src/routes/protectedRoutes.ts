import { Router, Request, Response } from "express";

import { ValidateProtectedRoutes } from "../middlewares/protect-middleware.ts";
import * as taskService from "../services/taskService.ts";


const ProtectedRoutes: Router = Router();


ProtectedRoutes.get("/", ValidateProtectedRoutes, (req: Request, res: Response) => {
    return res.status(200).json({ "message": "Hello, world!" });
});

ProtectedRoutes.post("/", ValidateProtectedRoutes, async (req: Request, res: Response) => {
    const { title } = req.body;
    const token = await req.cookies.authToken;

    if(!title) return res.status(400).json({ "message": "Task title is required." });
    if(!token) return res.status(401).json({ "message": "Unauthorized: You must be logged in to create a task." });

    try {
        const response = await taskService.CreateTask(token, title);
        return res.status(201).json({ "message": "Task created successfully.", "task": response });
    } catch (error: unknown) {
        return res.status(422).json({ "message": error instanceof Error ? error.message : "An unknown error occurred." });
    }

});


export default ProtectedRoutes;
