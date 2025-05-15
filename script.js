let date =new Date();
let formatedDate = date.toLocaleString('default', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
  
function addTask() {
  //get the value of the input 
  let task = document.getElementById("task").value;
  //create the list element to display the task
  let list = document.createElement("li");
  let listText = document.createTextNode(task);
  let textContainer = document.createElement("p");
  textContainer.appendChild(listText);
  checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  list.appendChild(checkBox);
  checkBox.classList.add("checkBox");
  list.appendChild(textContainer);
  if (task === "") {
    alert("please input a task");
    return;
  }

  
  //create a delete and edit buttons
  let editBtn = document.createElement("button");
  let delBtn = document.createElement("button");
  let buttons = document.createElement("div");
  //add text content and style them
  delBtn.innerHTML = '<i class="fa fa-trash icon"></i>';
  editBtn.innerHTML = "<i class='fa fa-pencil icon'></i>";
  //give them a class name foe styling 
  delBtn.classList.add("delBtn");
  editBtn.classList.add("editBtn");
  buttons.classList.add("btn-cont");
  textContainer.classList.add("text");
  //their functions 
  delBtn.onclick = () => {
    list.remove();
  };
  editBtn.onclick = () => {
    let newTask = prompt("Make your changes", task);
    if (newTask === "") {
      alert("please input a task");
      return;
    }
    listText.nodeValue = newTask;
  }
  //create date/time 
  /*let date = document.createElement("p");
  date.textContent = formatedDate;
  date.classList.add("date");*/
  
  
  //add then to the list
  buttons.appendChild(editBtn);
  buttons.appendChild(delBtn);
  //buttons.appendChild(date);
  list.appendChild(buttons);
  
  
  
  //get the ul element and add the list element as child 
  let main = document.querySelector("ul").appendChild(list);
  localStorage.getItem = list;
  //document.getElementById("task").value = "";
}
