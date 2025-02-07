document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("task");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let tasks = getTasks();
    tasks.push({ text: taskText, completed: false });
    saveTasks(tasks);
    taskInput.value = "";
    renderTasks();
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    let tasks = getTasks();
    
    tasks.forEach((task, index) => {
        if (filter === "completed" && !task.completed) return;
        if (filter === "pending" && task.completed) return;

        let li = document.createElement("li");
        li.className = "flex justify-between items-center bg-gray-200 p-2 rounded";

        let span = document.createElement("span");
        span.textContent = task.text;
        span.className = task.completed ? "line-through text-gray-500" : "";
        span.onclick = () => toggleTask(index);
        
        let actions = document.createElement("div");
        
        let editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.className = "text-yellow-500 px-2";
        editBtn.onclick = () => editTask(index);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.className = "text-red-500 px-2";
        deleteBtn.onclick = () => deleteTask(index);

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        
        li.appendChild(span);
        li.appendChild(actions);
        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    let tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks();
}

function editTask(index) {
    let tasks = getTasks();
    let newText = prompt("Edit your task:", tasks[index].text);
    if (newText) {
        tasks[index].text = newText.trim();
        saveTasks(tasks);
        renderTasks();
    }
}

function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}

function filterTasks(filter) {
    renderTasks(filter);
}

function loadTasks() {
    renderTasks();
}
