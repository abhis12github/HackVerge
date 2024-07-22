import React, { useState, useEffect } from 'react';
import storage from '../utils/storage';

const DailyGrowthChecklist = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        task: "",
        status: false
    });

    useEffect(() => {
        storage.get('dailyGrowthTasks', (result) => {
            if (result.dailyGrowthTasks) {
                setTasks(JSON.parse(result.dailyGrowthTasks));
            }
        });
    }, []);


    const addTask = () => {
        if (newTask.task.trim() !== "") {
            const updatedTasks = [...tasks, { id: Date.now(), text: newTask.task, completed: newTask.status }];
            setTasks(updatedTasks);
            setNewTask({ task: "", status: false });
            storage.set({ dailyGrowthTasks: JSON.stringify(updatedTasks) });
            
        }
    };

    const toggleTaskCompletion = (id) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        storage.set({ dailyGrowthTasks: JSON.stringify(updatedTasks) });
    };

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        storage.set({ dailyGrowthTasks: JSON.stringify(updatedTasks) });
    };

    const handleAddTaskKey = (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    };

    return (
        <div className="daily-growth-checklist flex flex-col h-full bg-white shadow-lg rounded-lg p-6 w-full mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-green-600">Daily Growth Checklist</h3>
            <div className="mb-4">
                <div className='flex items-stretch gap-3'>
                    <input
                        type="text"
                        value={newTask.task}
                        onKeyPress={handleAddTaskKey}
                        onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
                        placeholder="New task"
                        className="w-full px-2 py-1 text-base border border-gray-300 rounded mb-2 focus:outline-none"
                    />
                </div>
                <button
                    onClick={addTask}
                    className="w-full bg-green-500 text-white font-medium tracking-wide py-2 rounded hover:bg-green-600 transition duration-300"
                >
                    Add Task
                </button>
            </div>
            <ul className="task-list space-y-2">
                {tasks.map(task => (
                    <li key={task.id} className="flex justify-between items-center p-3 border rounded bg-gray-50">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTaskCompletion(task.id)}
                                className="mr-2"
                            />
                            <span className={task.completed ? "line-through text-gray-500" : ""}>{task.text}</span>
                        </div>
                        <button
                            onClick={() => deleteTask(task.id)}
                            className="text-red-500 hover:text-red-700 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DailyGrowthChecklist;
