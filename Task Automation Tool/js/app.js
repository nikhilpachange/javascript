// Get Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task');
const taskList = document.getElementById('task-list');
const frequencyInput = document.getElementById('frequency');

// Initialize task array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Add Task
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskName = taskInput.value.trim();
    const frequency = frequencyInput.value;

    if (taskName) {
        const task = {
            id: Date.now(),
            name: taskName,
            frequency,
        };

        tasks.push(task);
        saveToLocalStorage();
        renderTasks();
        taskInput.value = '';
    }
});

// Render Tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task.name} (${task.frequency})
            <button onclick="deleteTask(${task.id})">X</button>
        `;
        taskList.appendChild(li);
    });
}

// Delete Task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveToLocalStorage();
    renderTasks();
}

// Save to Local Storage
function saveToLocalStorage() {
    localStorage.setItem('taks', JSON.stringify(tasks));
}

// Initialize
renderTasks();
