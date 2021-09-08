
let collection = new Map();
let currentList = "";
const todoList = document.getElementById("list");
const addBtn = document.getElementById("addBtn");
const inputTask = document.getElementById("input-task");
const todoWrapper = document.querySelector(".todo-wrapper");

function init() {
   if(localStorage.collection){
      collection = new Map(JSON.parse(localStorage.collection));
   }
   if(localStorage.currentList){
     currentList = localStorage.currentList;
   }
   console.log(collection.keys());
   updateLists();
   onSelectChange();
   fillList();
}

function save() {
   localStorage.collection = JSON.stringify(Array.from(collection.entries()));
   localStorage.currentList = currentList;
   updateLists();
   //console.log(collection);
}

function addList() {
   const newList = document.getElementById("myInput").value;
   if(newList === "")
      alert("The field is empty, please enter text!");
   else
      collection.set(newList, []);
   save();
   document.getElementById("myInput").value = "";
}

function updateLists(){
   todoList.innerHTML = "";
   collection.forEach((value, key) => {
      addOption(key);
   });
   todoList.value = currentList;
}

function addOption(value) {
   todoList.innerHTML += `<option ${value}>${value}</option>`
}

function onSelectChange(){
   currentList =  todoList.value;
   //console.log(currentList);
   fillList();
   save();
}

let tasks = [];
let todoItemElems = [];

function Task(description) {
  this.description = description;
  this.completed = false;
}

const createTemplate = (task, index) => {
    return `
    <div class="todo-item" ${task.completed ? "checked" : ""}>
      <div class="description">${task.description}</div>
        <div class="buttons">
          <input  onclick = "completeTask(${index})"class="btn-complete" type="checkbox"
            ${task.completed ? "checked" : ""}>
          <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
        </div>
      </div>
    `
  }

const filterTasks = () => {
  const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
  const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
  tasks = [...activeTasks, ...completedTasks];
}

const fillList = () => {
   tasks = collection.get(currentList);
  todoWrapper.innerHTML = "";
  if(tasks.length > 0) {
    filterTasks();
      tasks.forEach((item, index) => {
          todoWrapper.innerHTML += createTemplate(item, index);
    });
    todoItemElems = document.querySelectorAll('.todo-item');
  }
}

const updateTasks = () => {
   collection.set(currentList, tasks);
   save();
}

const completeTask = index => {

    tasks[index].completed = !tasks[index].completed;
      if(tasks[index].completed){
        todoItemElems[index].classList.add("checked");
      }else{
        todoItemElems[index].classList.remove("checked");
      }
      updateTasks();
      fillList();
    }

addBtn.addEventListener('click', () => {
  if(inputTask.value.length > 0){
    tasks.push(new Task(inputTask.value));
    updateTasks();
    fillList();
    inputTask.value = "";
  }
  else
    alert("The field is empty, please enter text!");
});

const deleteTask = index => {

    todoItemElems[index].classList.add('deletion');
      setTimeout(() => {
        tasks.splice(index, 1);
        updateTasks();
        fillList();
       },100);
 }

