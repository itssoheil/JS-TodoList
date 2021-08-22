//Define UI vars
let form = document.querySelector('#task-form');
let taskList = document.querySelector('.collection');
let clearTasks = document.querySelector('.clear-task');
let filter = document.querySelector('#filter');
let taskInput = document.querySelector('#task');
//Invoke all events
loadAllEvents();

//All Events function
function loadAllEvents(){

    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task Event
    form.addEventListener('submit', addTask);

    //Remove task
    taskList.addEventListener('click', removeTask);

    //Remove all tasks
    clearTasks.addEventListener('click', removeAllTasks);

    //Filter task
    filter.addEventListener('keyup', filterTasks);
}

//Add Task
function addTask(event){
    event.preventDefault();

    if(taskInput.value === ''){
        alert('Please filll  the Task feild');
    }

    let li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    let link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"><i/>';

    li.appendChild(link);
    taskList.appendChild(li);

    storeTaskInLS(taskInput.value);

    taskInput.value = '';
}

//Remove Task
function removeTask(event){
    if(event.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            event.target.parentElement.parentElement.remove();
            removeTaskFromLs(event.target.parentElement.parentElement);
        }
    }
}

//Remove all tasks
function removeAllTasks(event){
    event.preventDefault();

    //Slower way
    // taskList.innerHTML = '';


    //Faster way
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    ClearLS();
}

//Filter Tasks
function filterTasks(){
    let text = filter.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach((task) => {

        let content = task.textContent.toLowerCase();
        if(content.indexOf(text) != -1){
            console.log('yes');
            task.style.display = 'block';
        }else{
            console.log('no');
            task.style.display = 'none';
        }
    });
}

//Store task in Local Storage (LS)
function storeTaskInLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(taskItem);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Get tasks from Local Storage (LS)
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task) => {
        let li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));

        let link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"><i/>';

        li.appendChild(link);
        taskList.appendChild(li);
    });
}

//Remove Task from Local Storage (LS)
function removeTaskFromLs(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task, index) => {
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Local Storage (LS)
function ClearLS(){
    localStorage.clear();
}