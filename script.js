let tasks = [];

function renderTasks(filter = 'all') {
    const taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = '';

    tasks
        .filter(task => filter === 'all' || task.status === filter)
        .forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task-item');
            if (task.status === 'completed') {
                taskElement.classList.add('completed');
            }

            taskElement.innerHTML = `
                <h3>${task.name}</h3>
                <p>${task.description}</p>
                <p>Status: ${task.status}</p>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
                <button onclick="toggleTaskStatus(${index})">
                    Mark as ${task.status === 'completed' ? 'Pending' : 'Completed'}
                </button>
            `;

            taskContainer.appendChild(taskElement);
        });
}

function addTask() {
    const taskName = document.getElementById('taskName').value.trim();
    const taskDescription = document.getElementById('taskDescription').value.trim();

    if (!taskName) {
        alert('Task name is required!');
        return;
    }

    const newTask = {
        name: taskName,
        description: taskDescription,
        status: 'pending'
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    document.getElementById('taskName').value = '';
    document.getElementById('taskDescription').value = '';
}

function editTask(index) {
    const newName = prompt('Enter new task name:', tasks[index].name);
    const newDescription = prompt('Enter new task description:', tasks[index].description);

    if (newName) tasks[index].name = newName;
    if (newDescription) tasks[index].description = newDescription;

    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleTaskStatus(index) {
    tasks[index].status = tasks[index].status === 'completed' ? 'pending' : 'completed';
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('filterStatus').addEventListener('change', (e) => renderTasks(e.target.value));

loadTasks();
renderTasks();
