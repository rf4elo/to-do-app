import { prisma } from "../config/database.ts";

import * as userService from "./userService.ts";
import { decodeJwt } from "jose";



export async function GetTasks(userId: number) {

    if(!userId) throw new Error("UserId is missing.");

    const userTasks = await prisma.task.findMany({ where: { "userId": userId } });

    
    return userTasks;
    
}

export async function CreateTask(token:string, title:string) {

    if(!token || !title) throw new Error("Token or title is missing.");

    const decodedToken = await decodeJwt(token);
    const user = await userService.GetUser(decodedToken.email as string);

    if(!user) throw new Error("User not found.");

    
    const task = {
        "userId": user.id,
        "title": title,
        "isCompleted": false
    }

    const createdTask = await prisma.task.create({
        data: {
            userId: task.userId,
            title: task.title,
            isComplete: task.isCompleted
        },
        select: {
            id: false,
            userId: true,
            title: true,
            isComplete: false
        }
    });

    
    return createdTask;

}

