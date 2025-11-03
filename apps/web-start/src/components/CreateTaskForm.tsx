import React, { useState } from 'react';
import './CreateTaskForm.css';
import './button.css';

export function CreateTaskForm(): React.JSX.Element {
    const [taskName, setTaskName] = useState<string>("");
    const [taskDescription, setTaskDescription] = useState<string>("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // prevent page reload
        console.log("Created Task: " + taskName + "\n" + taskDescription);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Task Name</label>
            <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                id="taskName">
            </input>
            <label>Task Description</label>
            <input
                type="text"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                id="taskDescription">
            </input>
            <button type="submit" className="button">Submit</button>
        </form>
    )
}