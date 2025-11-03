import React, { useState } from 'react';
import './CreateTaskForm.css';
import './button.css';

export function CreateTaskForm(): React.JSX.Element {

    return (
        <div>
            <p>Task Name</p>
            <input type="text"></input>
            <p>Task Description</p>
            <input type="text"></input>
            <button type="button" className="button">Submit</button>
        </div>
    )
}