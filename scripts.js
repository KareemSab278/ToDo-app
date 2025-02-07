// THIS TASK WAS DONE FOR ME TO UNDERSTAND OBJECT ORIENTED PROGRAMMING BETTER. ALL CODE WAS WRITTEN BY ME, NO TUTORIAL WAS USED.

// Add Unique IDs to Tasks => DONE
// Modify the ToDo class to include a unique ID for each task. => DONE
// Increment the ID each time a new task is created. => DONE

// Implement Task Deletion by ID

// Update the deleteTask function to delete tasks based on their unique ID.
// This ensures that the correct task is removed from both the UI and the data array.
// Save and Load Tasks from Local Storage

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


//======================================================================= HANDLING THE INPUT FORM

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  if (!todoText.value) {
      console.error("trying to procrastinate, are we?");
  } else {
      let todo = new ToDo(idCount, todoText.value, new Date());

      document.getElementById("output").innerHTML += `<p class="task" data-id="${idCount}"><br>${idCount} - ${todoText.value} - ${new Date().toLocaleString('en-GB', { timeZone: 'UTC' })} 
      <button data-id="${idCount}" onclick="deleteTask(this)">finished task</button></br></p>`;
      idCount++; // increment on every new task

      data.tasks.push(todo);

      console.log("Added new task: ", todoText.value); // on submit
  }
  console.log(data);
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

  console.log("Removed task with ID:", taskId);
};


class ToDo {
  constructor(id, details, date) {
      this.id = id;
      this.details = details;
      this.date = date;
  }
}

  
  