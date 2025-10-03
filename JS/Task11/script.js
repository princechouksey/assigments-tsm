const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const completedList = document.getElementById("completed-list");


const tasks =JSON.parse(localStorage.getItem("tasks")) || [];
addBtn.addEventListener("click", ()=>{
    const taskText =taskInput.value.trim();
    if(taskText){
        tasks.push({
            text:taskText,
            completed:false
        })  
        taskInput.value = "";
        saveTasks();
        renderTasks();
    }
})
function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTasks(){
    todoList.innerHTML = ""
    completedList.innerHTML = "";
    tasks.forEach((task, index)=>{
        const li = document.createElement("li");
        li.innerHTML =
        `
        <span>${task.text}</span>
        <span class= "due">Due today</span>
        <div>
        <button class="complete-btn">✔</button>
        <button class="delete-btn">✖</button>
        </div>
       
        `;
        if(task.completed){
            li.classList.add("completed");
            completedList.appendChild(li)
        }
        else{
            todoList.appendChild(li);
        }


      li.querySelector(".complete-btn").addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    // Delete task
    li.querySelector(".delete-btn").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });




    })
}
renderTasks();