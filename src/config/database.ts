import { UserDTO } from "../models/userModel.ts";


export interface UserDB {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface TasksDB {
    id: number;
    userId: number;
    title: string;
    isCompleted: boolean;
}

export const users_db: UserDB[] = [];

export const tasks_db: TasksDB[] = [];

