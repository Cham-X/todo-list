"use strict";

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
var form = document.querySelector(".todo-form");
var taskInput = document.querySelector("#task-input");
var filterInput = document.querySelector("#filter-input");
var clearBtn = document.querySelector('.clear-btn');
var taskList = document.querySelector('#task-list');
loadAllEventListeners();

function loadAllEventListeners() {
  //DOM Load EVENT
  // add task event
  form.addEventListener("submit", addTask); // delete task

  taskList.addEventListener("click", removeTask); // clear task 

  clearBtn.addEventListener("click", clearTasks); // filter task

  filterInput.addEventListener("keyup", filterTask);
} // get task from LS


function getLocalStorage() {
  var tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("task"));
  }
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  } else {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(taskInput.value));
    li.className = "task-item";
    var deleteBtn = document.createElement("span");
    deleteBtn.className = "cancel-button";
    deleteBtn.textContent = "X";
    li.appendChild(deleteBtn);
    taskList.appendChild(li); // store in localStorage

    storeInLocalStorage("RIDE");
    taskInput.value = "";
  }

  e.preventDefault();
}

function storeInLocalStorage(task) {
  var tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.classList.contains("cancel-button")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.remove(); // remove from LS
    }
  }
}

function clearTasks() {
  // taskList.innerHTML = ""
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

function filterTask(e) {
  var text = e.target.value.toLowerCase();
  document.querySelectorAll(".task-item").forEach(function (task) {
    var item = task.firstChild.textContent;
    console.log(item);

    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  }); // console.log(text)
}