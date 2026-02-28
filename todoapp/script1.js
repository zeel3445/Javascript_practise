document.addEventListener("DOMContentLoaded", () => {
  let todo_input = document.getElementById("todo-input");
  let todo_button = document.getElementById("add-task-btn");
  let task_list = document.getElementById("todo-list");

  let task = JSON.parse(localStorage.getItem("task")) || [];
  task.array.forEach((task) => rendertask(task));
  todo_button.addEventListener("click", () => {
    let inputvalue = todo_input.value;
    if (inputvalue === "") return;

    const newtask = {
      id: Date.now(),
      text: inputvalue,
      completed: false,
    };
    task.push(newtask);
    saveTask();
    rendertask(newtask);
    inputvalue - "";
  });
  function rendertask(task) {
    let li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
        <span>${task.text}</span>
        <button>Delete</button>`;

    li.addEventListener("click", (e) => {
      if (e.target.tagName == "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTask();
    });
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      task = task.filter((t) => t.id !== task.id);
      li.remove();
      saveTask();
    });
    task_list.appendChild(li);
  }

  function saveTask() {
    localStorage.setItem("task", JSON.stringify(task));
  }
});
