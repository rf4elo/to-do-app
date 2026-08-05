import { Router, Request, Response } from "express";

import { ValidateProtectedRoutes } from "../middlewares/protect-middleware.ts";
import * as taskService from "../services/taskService.ts";

import { decodeJwt } from "jose";


const ProtectedRoutes: Router = Router();

ProtectedRoutes.get("/tasks", ValidateProtectedRoutes, async (req: Request, res: Response) => {
    const token = req.cookies.authToken;
    const decodedToken = await decodeJwt(token);

    const tasks = await taskService.GetTasks(Number(decodedToken.id));

    return res.status(200).json({ "message": "Hello, world!", "tasks":tasks });
});

ProtectedRoutes.post("/tasks", ValidateProtectedRoutes, async (req: Request, res: Response) => {
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

ProtectedRoutes.delete("/tasks/:id", ValidateProtectedRoutes, async (req: Request, res: Response) => {
    try {
        const token = await req.cookies.authToken;
        const { id } = await req.params;
        if(!id) throw new Error("TaskId is missing.");
        const response = await taskService.DeleteTask(token, +id);
        return res.status(204).json(response);
    } catch (error: any) {
        if(error.message == "UserId or taskId is missing.") return res.status(429).json({ "error":error.message });
        return res.status(404).json({ "error":error.message });
    }
});


export default ProtectedRoutes;
