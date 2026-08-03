import '../styles/AddTaskField.css';



export function AddTaskField() {
    return (
        <div className="add-task-field" >
           <h1>Add a task</h1>

           <input type="text" placeholder='Write a task title...' />

            <input type="submit" value="Create" />

        </div>
    );
}


