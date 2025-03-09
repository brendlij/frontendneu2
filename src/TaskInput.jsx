import React, { useState } from 'react';

function TaskInput({ addTask }) {
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");
    const [assignedTo, setAssignedTo] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({ task, description, status, assignedTo });
        setTask("");
        setDescription("");
        setStatus("Pending");
        setAssignedTo("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
                <label htmlFor="task" className="form-label">Task Name</label>
                <input
                    id="task"
                    type="text"
                    className="form-control"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Aufgabenname"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input
                    id="description"
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Aufgabenbeschreibung"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <select
                    id="status"
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="assignedTo" className="form-label">Assigned To</label>
                <input
                    id="assignedTo"
                    type="text"
                    className="form-control"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    placeholder="Bearbeiter"
                />
            </div>
            <button type="submit" className="btn btn-primary">Aufgabe hinzufügen</button>
        </form>
    );
}

export default TaskInput;
