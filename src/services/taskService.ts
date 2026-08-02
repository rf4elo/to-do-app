import { tasks_db, TasksDB } from "../config/database.ts";

import * as userService from "./userService.ts";
import { decodeJwt } from "jose";


export async function CreateTask(token:string, title:string) {

    if(!token || !title) throw new Error("Token or title is missing.");

    const decodedToken = await decodeJwt(token);
    const user = await userService.GetUser(decodedToken.email as string);

    const task:TasksDB = {
        "id": Date.now(),
        "userId": user.id,
        "title": title,
        "isCompleted": false
    }
    tasks_db.push(task);

    return task;

}

