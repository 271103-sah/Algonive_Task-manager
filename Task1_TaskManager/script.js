let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const today = new Date();
const dueDate = new Date(task.date);

const diffTime = dueDate - today;
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

if(diffDays === 1){
alert("Reminder: Task '" + task.title + "' is due tomorrow!");
}

    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;

    const li = document.createElement("li");
    li.dataset.index = index;

    if (task.completed) {
      li.style.textDecoration = "line-through";
    }

    li.innerHTML = `
      <strong>${task.title}</strong><br>
      ${task.description}<br>
      Due: ${task.date}<br>
      <button class="completeBtn">Complete</button>
      <button class="editBtn">Edit</button>
      <button class="deleteBtn">Delete</button>
    `;

    taskList.appendChild(li);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("dueDate").value;

  tasks.push({
    title: title,
    description: description,
    date: date,
    completed: false
  });

  saveTasks();
  renderTasks();
  form.reset();
});

taskList.addEventListener("click", function (e) {

  const li = e.target.parentElement;
  const index = li.dataset.index;

  if (e.target.classList.contains("completeBtn")) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }

  if (e.target.classList.contains("editBtn")) {

    const newTitle = prompt("Edit task title:", tasks[index].title);
    const newDescription = prompt("Edit description:", tasks[index].description);

    if (newTitle !== null) tasks[index].title = newTitle;
    if (newDescription !== null) tasks[index].description = newDescription;

    saveTasks();
    renderTasks();
  }

  if (e.target.classList.contains("deleteBtn")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
});

function filterTasks(type) {
  renderTasks(type);
}

renderTasks();

