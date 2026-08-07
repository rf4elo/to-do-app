import '../styles/ListTasks.css';
import api from '../services/axios';

import { useLoaderData } from 'react-router-dom';
import { useRevalidator } from 'react-router-dom';


export async function todoListLoader() {
    try {
        const response = await api.get("/api/tasks");
        return response.data.tasks;
    } catch(error) {
        return console.error("Error to search task: ", error);
    }
}

interface Task {
    id: number,
    userId: number,
    title: string,
    isComplete: boolean
}

export function ListTasks() {
    
    const revalidator = useRevalidator();


    async function DeleteTask(taskId:any) {
        if(!taskId) return console.error("Invalid item to delete.");
        try {
            const response = await api.delete(`/api/tasks/${taskId}`);
            revalidator.revalidate();
            alert(`${response.status} - ${response.statusText}${response.data?.message ? ` | ${response.data.message}` : ''}`);
        } catch (error) {
            console.error(error);
        }
    }

    async function SetCompleteTask(taskId:any) {
        try {
            const response = await api.put(`/api/tasks/${taskId}`);
            revalidator.revalidate();
            alert(`${response.status} - ${response.statusText}${response.data?.message ? ` | ${response.data.message}` : ''}`);
        } catch (error) {
            return console.error("Error: ", error);
        }
    }

    const tasks = useLoaderData() as Task[];
    
    return (
        <div className="list-tasks">
            <h1>List Tasks</h1>

            <div className="tasks-field">
                {
                    tasks == null ? '<p>No one task</p>' :
                    tasks.map((item: Task) => (
                        <div key={item.id} className={`item ${item.isComplete ? 'checked' : ''}`} >
                            <span><input type="checkbox" onChange={() => SetCompleteTask(item.id)} checked={item.isComplete} /> {item.title}</span>
                            <button onClick={() => DeleteTask(item.id)} >Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
