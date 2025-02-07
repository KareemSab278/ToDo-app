// THIS TASK WAS DONE FOR ME TO UNDERSTAND OBJECT ORIENTED PROGRAMMING BETTER. ALL CODE WAS WRITTEN BY ME, NO TUTORIAL WAS USED.

// Add Unique IDs to Tasks => DONE
// Modify the ToDo class to include a unique ID for each task. => DONE
// Increment the ID each time a new task is created. => DONE
// Implement Task Deletion by ID => DONE
// Update the deleteTask function to delete tasks based on their unique ID. => DONE

// serialize the obj using JSON.stringify and then parse it back to obj using JSON.parse
// https://www.youtube.com/watch?v=AUOzvFzdIk4

// Save and Load Tasks from Local Storage using localStorage

// Implement functions to save tasks to localStorage whenever they are added or deleted.
// Load tasks from localStorage when the app initializes to persist data across sessions.

//=======================================================================

let data = {        //this object will be holding the data. gotta move to json file and find a way to delete data by id or something.
    tasks: []       //probably will get the indexOf and then delete by the element position but that seems overkill.
};                  

let idCount = 1; // this will be the id of the task, starting from 0
let todoForm = document.getElementById("todo-form");
let todoText = document.getElementById("todo-text");
let output = document.getElementById("output"); // the p element will hold this text

//=======================================================================

// Load tasks from localStorage when the app initializes
window.addEventListener('load', () => {
  let storedData = localStorage.getItem("data");
  if (storedData) {
    data = JSON.parse(storedData);
    idCount = data.tasks.length > 0 ? data.tasks[data.tasks.length - 1].id + 1 : 1;
    data.tasks.forEach(task => {
      document.getElementById("output").innerHTML += `<p class="task" data-id="${task.id}"><br>${task.id} - ${task.details} - ${new Date(task.date).toLocaleString('en-GB', { timeZone: 'UTC' })} 
      <button data-id="${task.id}" onclick="deleteTask(this)" class="button">finished task</button></br></p>`;
    });
  }
});

//======================================================================= HANDLING THE INPUT FORM

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  if (!todoText.value) {
      console.error("trying to procrastinate, are we?");
  } else {
    // document.getElementById("output").innerHTML = ""; // clear the output on every new task
      let todo = new ToDo(idCount, todoText.value, new Date());

      document.getElementById("output").innerHTML += `<p class="task" data-id="${idCount}"><br>${idCount} - ${todoText.value} - ${new Date().toLocaleString('en-GB', { timeZone: 'UTC' })} 
      <button data-id="${idCount}" onclick="deleteTask(this)" class = "button">finished task</button></br></p>`;
      idCount++; // increment on every new task

      data.tasks.push(todo);
      let data_serialized = JSON.stringify(data); //serialize the object to json
      localStorage.setItem("data", data_serialized); //store the object in local storage
      let data_deserialized = JSON.parse(localStorage.getItem("data")); //parse the object back to json
      //test:
      console.log(data_deserialized)
      return data_deserialized;
      // console.log("Added new task: ", todoText.value); // on submit
  }
  // console.log(data.tasks);
  return data;
});

//======================================================================= HANDLING THE OUTPUT


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
  //test:
  console.log(data_deserialized)
  return data_deserialized;
  // console.log("Removed task with ID:", taskId);
  // console.log(data.tasks);
};


class ToDo {
  constructor(id, details, date) {
      this.id = id;
      this.details = details;
      this.date = date;
  }
}

//======================================================================= LOCAL STORAGE 


// window.addEventListener('load', () => {
//   let storedData = localStorage.getItem("data");
//   if (storedData) {
//     data = JSON.parse(storedData);
//     idCount = data.tasks.length > 0 ? data.tasks[data.tasks.length - 1].id + 1 : 1;
//     data.tasks.forEach(task => {
//       document.getElementById("output").innerHTML += `<p class="task" data-id="${task.id}"><br>${task.id} - ${task.details} - ${new Date(task.date).toLocaleString('en-GB', { timeZone: 'UTC' })} 
//       <button data-id="${task.id}" onclick="deleteTask(this)" class = "button">finished task</button></br></p>`;
//     });
//   }
// });


