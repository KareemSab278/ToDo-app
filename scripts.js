let data = {        //this object will be holding the data. gotta move to json file and find a way to delete data by id or something.
    tasks: []       //probably will get the indexOf and then delete by the element position but that seems overkill.
};                  

let idCount = 1; // this will be the id of the task, starting from 0
let todoForm = document.getElementById("todo-form");
let todoText = document.getElementById("todo-text");
let output = document.getElementById("output"); // the p element will hold this text

function renderTask(task) {
  const list = document.getElementById('task-list');
  const taskElement = document.createElement('div');
  taskElement.className = 'task';
  taskElement.dataset.id = task.id;

  const taskText = document.createElement('span');
  taskText.className = 'task-text';
  taskText.textContent = `${task.id} - ${task.details}`;

  const taskDate = document.createElement('small');
  taskDate.className = 'task-date';
  taskDate.textContent = `${new Date(task.date).toLocaleString('en-GB', { timeZone: 'UTC' })}`;

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.dataset.id = task.id;
  removeButton.textContent = 'Finished';
  removeButton.addEventListener('click', () => deleteTask(removeButton));

  taskElement.appendChild(taskText);
  taskElement.appendChild(taskDate);
  taskElement.appendChild(removeButton);
  list.appendChild(taskElement);
}

window.addEventListener('load', () => {
  let storedData = localStorage.getItem('data');
  if (storedData) {
    data = JSON.parse(storedData);
    idCount = data.tasks.length > 0 ? data.tasks[data.tasks.length - 1].id + 1 : 1;
    data.tasks.forEach(task => renderTask(task));
  }
});


todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  if (!todoText.value) {
      return;
  } else {
      let todo = new ToDo(idCount, todoText.value, new Date());

      data.tasks.push(todo);
      localStorage.setItem('data', JSON.stringify(data));

      renderTask(todo);
      idCount++;  

      todoText.value = '';
      return data;
  }
  return data;
});


const deleteTask = (btn) => {
  const taskId = btn.getAttribute('data-id');
  let taskIndex = -1;

  for (let i = 0; i < data.tasks.length; i++) {
      if (data.tasks[i].id === parseInt(taskId)) {
          taskIndex = i;
          break;
      }
  }

  if (taskIndex !== -1) {
      data.tasks.splice(taskIndex, 1);
  }

  const taskElement = document.querySelector(`.task[data-id="${taskId}"]`);
  if (taskElement) {
      taskElement.remove();
  }
  let data_serialized = JSON.stringify(data); //serialize the object to json
  localStorage.setItem("data", data_serialized); //store the object in local storage
  let data_deserialized = JSON.parse(localStorage.getItem("data")); //parse the object back to json
  return data_deserialized;
};


class ToDo {
  constructor(id, details, date) {
      this.id = id;
      this.details = details;
      this.date = date;
  }
}