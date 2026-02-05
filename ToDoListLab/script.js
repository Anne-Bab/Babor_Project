const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

window.addEventListener('DOMContentLoaded', loadTasks);

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() { 
    const taskText = taskInput.value.trim();   
    if (!taskText) { 
        alert("Please enter a task!"); 
        return; }  
        
        createTaskElement(taskText);
        saveTasks(); 
        taskInput.value = ''; 
    }

    function createTaskElement(taskText, completed = false) {
        const li = document.createElement('li');
        li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-btn">Delete</button>
        `;

        if (completed) li.classList.add('completed');

        li.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON') return;
            li.classList.toggle('completed');
            saveTasks();
        });
        
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function () {
            taskList.removeChild(li);
            saveTasks();
        });
        
        taskList.appendChild(li);        
    }
    
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('.task-text').textContent,
                completed: li.classList.contains('completed')
            });
        });
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
           const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        
        });
    }    
   



        



    