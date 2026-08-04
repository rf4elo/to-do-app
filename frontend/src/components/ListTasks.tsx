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
        console.error("Error to search task: ", error);
    }
}



export function ListTasks() {

    const tasks = useLoaderData() as Task[];

    console.log(tasks);

    return (
        <div className="list-tasks">
            <h1>List Tasks</h1>


            <div className="tasks-field">

                {
                    tasks == null ? '<p>No one task</p>' :
                    tasks.map((item: Task) => (
                        <div key={item.id} className="item">
                            <span>{item.title}</span>
                            <button>Delete</button>
                        </div>
                    ))
                }

            </div>

        </div>
    );
}


