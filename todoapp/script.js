document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todo-input");
  const button = document.getElementById("add-task-btn");
  const tasklist = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => renderTask(task));

  button.addEventListener("click", function () {
    const inputvalue = input.value.trim();
    if (inputvalue == "") return;

    const newTask = {
      id: Date.now(),
      text: inputvalue,
      completed: false,
    };
    tasks.push(newTask);
    saveTask();
    renderTask(newTask);
    input.value = "";
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
      <span>${task.text}</span>
      <button>delete</button>`;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTask();
    });
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); //prevent toggle from firing
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTask();
    });

    tasklist.appendChild(li);
  }
  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
