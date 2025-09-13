document.addEventListener("DOMContentLoaded", () => {
    let inputText = document.getElementById("inputText");
    let addButton = document.getElementById("addBtn");
    let todoList = document.getElementById("todoList");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => renderTask(task));

    addButton.addEventListener("click", () => {
        const taskText = inputText.value.trim();
        if(taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        inputText.value = "";
    });

    function renderTask(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);

        
        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `<span>${task.text}</span>
        <button>Delete</button>`

        li.addEventListener("click", (e) => {
            if(e.target.tagName === "BUTTON") return;
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTasks();
        });

        li.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation();
            tasks = tasks.filter((t) => t.id !== task.id);
            li.remove();
            saveTasks();
        });

        todoList.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

});