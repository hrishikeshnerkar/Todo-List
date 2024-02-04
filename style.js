let tasksList = [];
const addBtn = document.querySelector("#add_btn");
let newTaskInput = document.querySelector("#wrapper input");
let taskListsContainer = document.getElementById("taskList");


addBtn.addEventListener("click", () => {

  const taskName = newTaskInput.value.trim();
  if (taskName === "") {
    document.getElementById('error').style.display = 'block';
    return;
  }
  document.getElementById('error').style.display = 'none';

  let task = [];
  task.push(tasksList.length.toString());
  task.push(newTaskInput.value.trim());
  newTaskInput.value = "";
  task.push(Date.now().toString());
  tasksList.push(task);

  const taskElement = document.createElement('div');
  taskElement.setAttribute("id", tasksList.length.toString());
  taskElement.classList.add('task');
  taskElement.innerHTML = `
    <input type="checkbox" class="task-check">
    <span class="taskname">${task[1]}</span>
    <button class="edit">
      <i class="fa-regular fa-pen-to-square"></i>
    </button> 
    <button class="delete">
      <i class="fa-solid fa-x"></i>
    </button>
  `;

  const editButton = taskElement.querySelector('.edit');
  const deleteButton = taskElement.querySelector('.delete');
  const checkbox = taskElement.querySelector('.task-check');

  editButton.addEventListener("click", () => {
    const taskNameElement = taskElement.querySelector('.taskname');
    const currentName = taskNameElement.textContent;

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = currentName;

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.classList.add('save');

    saveButton.addEventListener("click", () => {
      const newName = inputField.value.trim();
      if (newName !== "") {
        task[1] = newName;
        taskNameElement.textContent = newName;
      }
      taskNameElement.removeChild(inputField);
      taskNameElement.removeChild(saveButton);
    });

    taskNameElement.innerHTML = '';
    taskNameElement.appendChild(inputField);
    taskNameElement.appendChild(saveButton);
  });

  deleteButton.addEventListener("click", () => {
    const taskId = taskElement.getAttribute("id");
    tasksList = tasksList.filter(task => task[0] !== taskId);
    taskElement.remove();
  });

  checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
      taskElement.classList.add('completed');
    } else {
      taskElement.classList.remove('completed');
    }
  });

  taskListsContainer.appendChild(taskElement);
});
