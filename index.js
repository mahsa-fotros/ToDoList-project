const submitButton = document.querySelector(".todo-submit");
const todoInput = document.querySelector(".todo-input");
const showTodoList = document.querySelector("fieldset");
const todoList = document.querySelector(".todo-list");
const todoSection = document.querySelector(".todo-container");
const completedTodoSection = document.querySelector(
  ".completed-todo-container"
);
const completedTodoList = document.querySelector(".completed-todo-list");
const filterOption = document.querySelector("#todo-filter");

//Event listener
submitButton.addEventListener("click", addTodo);
todoList.addEventListener("click", (event) => {
  editRemove(event, "uncompleted");
});
completedTodoList.addEventListener("click", (event) => {
  editRemove(event, "completed");
});
filterOption.addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded", getLocalTodos);
//functions
function addTodo(task) {
  task.preventDefault();
  showTodoList.style.opacity = "1";
  todoSection.style.display = "block";
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = `<li>${todoInput.value}</li>
                <span>
                  <i class="fa-solid fa-square-check fa-lg"></i>
                </span>
                <span>
                  <i class="fas fa-trash-alt fa-lg"></i>
                </span>`;
  todoDiv.innerHTML = newTodo;
  todoList.appendChild(todoDiv);
  saveLocalTodos("uncompleted");
  todoInput.value = "";
}
function editRemove(event, state) {
  const classList = [...event.target.classList];
  const item = event.target;
  const todo = item.parentElement.parentElement;
  if (classList[1] === "fa-square-check") {
    if (state === "uncompleted") {
      completedTodoSection.style.display = "block";
      todo.remove();
      completedTodoList.appendChild(todo);
      todo.classList.toggle("completed");
      saveLocalTodos("completed");
    } else {
      todoSection.style.display = "block";
      todo.remove();
      todo.classList.remove("completed");
      todoList.appendChild(todo);
      saveLocalTodos("uncompleted");
    }
  } else if (classList[1] === "fa-trash-alt") {
    todo.remove();
  }
  removeLocalTodos(todo, state);
  if (todoList.children.length === 0) {
    todoSection.style.display = "none";
  }
  if (completedTodoList.children.length === 0) {
    completedTodoSection.style.display = "none";
  }
  if (
    todoList.children.length === 0 &&
    completedTodoList.children.length === 0
  ) {
    showTodoList.style.opacity = "0";
  }
}

function filterTodos(event) {
  switch (event.target.value) {
    case "all":
      if (todoList.children.length !== 0) {
        todoSection.style.display = "block";
      }
      if (completedTodoList.children.length !== 0) {
        completedTodoSection.style.display = "block";
      }
      break;
    case "completed":
      todoSection.style.display = "none";
      if (completedTodoList.children.length !== 0) {
        completedTodoSection.style.display = "block";
      }
      break;
    case "uncompleted":
      completedTodoSection.style.display = "none";
      if (todoList.children.length !== 0) {
        todoSection.style.display = "block";
      }
      break;
  }
}

function saveLocalTodos(state) {
  if (state === "completed") {
    let savedTodos = localStorage.getItem("completed")
      ? JSON.parse(localStorage.getItem("completed"))
      : [];
    savedTodos.push(completedTodoList.children[(completedTodoList.children.length)-1].children[0].innerText);
    localStorage.setItem("completed", JSON.stringify(savedTodos));
  } else {
    let savedTodos = localStorage.getItem("uncompleted")
      ? JSON.parse(localStorage.getItem("uncompleted"))
      : [];
    savedTodos.push(
      todoList.children[(todoList.children.length)- 1].children[0].innerText
    );
    localStorage.setItem("uncompleted", JSON.stringify(savedTodos));
  }
}
function getLocalTodos() {
  let savedUncompletedTodos = localStorage.getItem("uncompleted")
    ? JSON.parse(localStorage.getItem("uncompleted"))
    : [];
  if (savedUncompletedTodos.length !== 0) {
    showTodoList.style.opacity = "1";
  }
  savedUncompletedTodos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = `<li>${todo}</li>
                <span>
                  <i class="fa-solid fa-square-check fa-lg"></i>
                </span>
                <span>
                  <i class="fas fa-trash-alt fa-lg"></i>
                </span>`;
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
  });
  let savedCompletedTodos = localStorage.getItem("completed")
    ? JSON.parse(localStorage.getItem("completed"))
    : [];
  if (savedCompletedTodos.length !== 0) {
    showTodoList.style.opacity = "1";
    completedTodoSection.style.display="block";
  }
  savedCompletedTodos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = `<li>${todo}</li>
                <span>
                  <i class="fa-solid fa-square-check fa-lg"></i>
                </span>
                <span>
                  <i class="fas fa-trash-alt fa-lg"></i>
                </span>`;
    todoDiv.innerHTML = newTodo;
    completedTodoList.appendChild(todoDiv);
    todoDiv.classList.add("completed");
  });
}
function removeLocalTodos(todo,state){
  let savedTodos = localStorage.getItem(state)
    ? JSON.parse(localStorage.getItem(state))
    : [];
    const filteredTodos= savedTodos.filter((task)=> task !== todo.children[0].innerText
    );
  localStorage.setItem(state, JSON.stringify(filteredTodos));
}
