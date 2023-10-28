// const addTask = document.getElementById("addTask");
// const taskForm = document.getElementById("todo-form")

// taskForm.addEventListener("mouseover", runAddTask)

// newHeader = document.createElement('h1')
// taskForm.appendChild(newHeader)


// function runAddTask(e) {
//     newHeader.textContent = `MouseX : ${e.offsetX}, MouseY : ${e.offsetY} EVENT-TYPE : ${e.type}
//     `
    
// document.body.style.backgroundColor = `rgba( ${e.offsetX}, ${e.offsetY}, 40)`
// }


const form = document.querySelector(".todo-form");
const taskInput = document.querySelector("#task-input");
const filterInput = document.querySelector("#filter-input");
const clearBtn = document.querySelector('.clear-btn');
const taskList = document.querySelector('#task-list');

loadAllEventListeners();

function loadAllEventListeners() {
    //DOM Load EVENT
    document.addEventListener("DOMContentLoaded",getTasks)
    // add task event
    form.addEventListener("submit", addTask)
    // delete task
    taskList.addEventListener("click", removeTask)
    // clear task 
    clearBtn.addEventListener("click", clearTasks)
    // filter task
    filterInput.addEventListener("keyup",filterTask)
}

// get task from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }

    tasks.forEach(function(task){
        const li = document.createElement("li")
        li.appendChild(document.createTextNode(task))
        li.className = "task-item"
        const deleteBtn = document.createElement("span");
        deleteBtn.className = "cancel-button";
        deleteBtn.textContent = "X"
        li.appendChild(deleteBtn)

        taskList.appendChild(li);

    })
}

function addTask(e) {
    if(taskInput.value === "") {
        alert("Add a task")
    } else {
        const li = document.createElement("li")
        li.appendChild(document.createTextNode(taskInput.value))
        li.className = "task-item"
        const deleteBtn = document.createElement("span");
        deleteBtn.className = "cancel-button";
        deleteBtn.textContent = "X"
        li.appendChild(deleteBtn)
    
        taskList.appendChild(li);

        // store in localStorage
        storeInLocalStorage(taskInput.value)
    
        taskInput.value = ""
    }

    e.preventDefault()
}

function storeInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task)
    localStorage.setItem("tasks",JSON.stringify(tasks))
}

function removeTask(e) {
    if(e.target.classList.contains("cancel-button")) {
        if (confirm("Are you sure?")) {
            e.target.parentElement.remove()
            
            // remove from LS
         
      }
    }
}

function clearTasks() {
    // taskList.innerHTML = ""

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }

    clearLocalStorage()
}

function clearLocalStorage() {
    localStorage.clear()
}

function filterTask(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".task-item").forEach(function(task){
        const item = task.firstChild.textContent;
        console.log(item)
        if(item.toLocaleLowerCase().indexOf(text) != -1){
           task.style.display = "flex"
        } else {
            task.style.display = "none"
        }
    })
    // console.log(text)
}




