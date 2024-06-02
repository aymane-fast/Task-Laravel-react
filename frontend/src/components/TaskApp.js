import React, { useState, useEffect } from "react";
import axios from "axios";

function TaskApp() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: "", description: "" });
    useEffect(() => {
        fetchTasks();
    }, []);
    //function to fetch tasks from the backend api
    const fetchTasks = async () => {
        try {
            const response = await axios.get("/tasks/");
            setTasks(response.data);
        } catch (error) {
            console.error("error fetching the data", error);
        }
    };
    //function to handle input changes for the new tasks form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
        
    };
    // //function to handle form submission (creating a new task)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/tasks", newTask);
            setTasks([...tasks, response.data]); //add the new task to the list of tasks
            setNewTask({ title: "", description: "" }); //clear the form
        } catch (error) {
            console.error("we have error creating teh tasks", error);
        }
    };

    // //function to handle deleting a task
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/tasks/${id}`);
            setTasks(tasks.filter((task) => task.id !== id)); //delete the task usign the id
        } catch (error) {
            console.error("error ducint deleting ", error);
        }
    };
    return (
        <div>
            <h1>Task Manager</h1>
            {/* Form to create a new task */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newTask.title}
                    onChange={handleInputChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={newTask.description}
                    onChange={handleInputChange}
                />
                <button type="submit">Add Task</button>
            </form>

            {/* List of tasks */}
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <button onClick={() => handleDelete(task.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default TaskApp;
