import '../styles/ListTasks.css';
import api from '../services/axios';

import { useLoaderData } from 'react-router-dom';


export interface Task {
    id: number,
    userId: number,
    title: string,
    isCompleted: boolean
}

export async function todoListLoader() {
    try {
        const response = await api.get("/api/tasks");
        return response.data.tasks;
    } catch(error) {
        return console.error("Error to search task: ", error);
    }
}

export async function DeleteTask(taskId:any) {
    if(!taskId) return console.error("Invalid item to delete.");
    // IMPLEMENT A DELETE TASK SYSTEM
}


export function ListTasks() {

    const tasks = useLoaderData() as Task[];

    return (
        <div className="list-tasks">
            <h1>List Tasks</h1>


            <div className="tasks-field">

                {
                    tasks == null ? '<p>No one task</p>' :
                    tasks.map((item: Task) => (
                        <div key={item.id} className="item">
                            <span>{item.title}</span>
                            <button onClick={() => DeleteTask(item.id)} >Delete</button>
                        </div>
                    ))
                }

            </div>

        </div>
    );
}


