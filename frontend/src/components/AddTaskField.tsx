import '../styles/AddTaskField.css';
import api from '../services/axios';

import { useState } from 'react';
import { useRevalidator } from 'react-router-dom';


export function AddTaskField() {
    
    const [title, setTitle] = useState("");
    
    const revalidator = useRevalidator();


    async function CreateTask() {
        try {
        const formData = {
            "title":title
        };
        const response = await api.post("/api/tasks", formData);
        revalidator.revalidate();
        alert(`${response.status} - ${response.statusText}${response.data?.message ? ` | ${response.data.message}` : ''}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="add-task-field" >
           <h1>Add a task</h1>

            <input
                type="text"
                placeholder='Write a task title...'
                value={title} onChange={(e) => setTitle(e.target.value)}
            />

            <input type="submit" onClick={CreateTask} value="Create" />

        </div>
    );
}


