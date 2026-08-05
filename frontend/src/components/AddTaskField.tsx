import '../styles/AddTaskField.css';
import api from '../services/axios';
import { useState } from 'react';


export function AddTaskField() {

    const [title, setTitle] = useState("");

    async function CreateTask() {
        try {
        const formData = {
            "title":title
        };
        const response = await api.post("/api/tasks", formData);
        console.log(response);
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


