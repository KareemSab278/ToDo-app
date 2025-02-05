//=======================================================================

let data = {
    tasks: []       //this object will be holding the data. gotta move to json file and find a way to delete data by id or something.
};                  //probably will get the indexOf and then delete by the element position but that seems overkill.

let todoForm = document.getElementById("todo-form");
let todoText = document.getElementById("todo-text");
let output = document.getElementById("output"); // the p element will hold this text


//======================================================================= HANDLING THE INPUT FORM

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (!todoText.value) {

      console.error("trying to procrastinate, are we?")

    } else {

        let todo = new ToDo(details = todoText.value, date = new Date());

        document.getElementById("output").innerHTML += `<p class="task"><br> ${details} - ${date.toLocaleString('en-GB', { timeZone: 'UTC' })} 
        <button onclick="deleteTask(this)">finished task</button></br></p>`;

        data.tasks.push(todo)

        
        console.log("Added new task: ", details) // on submit
    }
    console.log(data)
    return data;
});

const deleteTask = (btn) => {
    btn.parentElement.remove(); // removes a task when button is clicked from "output" in index
    console.log("Removed task") // on delete
};


class ToDo {
    constructor() {
      this.details = todoText.value;
      this.date = new Date();
    }
  }

  
  