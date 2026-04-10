const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

let todos = [];
let currentFilter = "all";

function createTodoElement(todo) {
  const li = document.createElement("li");
  li.classList.add("todo-item");

  if (todo.completed) {
    li.classList.add("completed");
  }

  li.setAttribute("data-id", todo.id);

  li.innerHTML = `
    <span class="todo-text">${todo.text}</span>
    <button class="delete-btn">Delete</button>
  `;

  return li;
}

function renderTodos() {
  todoList.innerHTML = "";

  let filteredTodos = todos;

  if (currentFilter === "active") {
    filteredTodos = todos.filter(todo => !todo.completed);
  }

  if (currentFilter === "completed") {
    filteredTodos = todos.filter(todo => todo.completed);
  }

  filteredTodos.forEach(todo => {
    const todoElement = createTodoElement(todo);
    todoList.appendChild(todoElement);
  });

  updateStats();
}

function addTodo(text) {
  const todo = {
    id: Date.now(),
    text: text,
    completed: false
  };

  todos.push(todo);
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      return {
        ...todo,
        completed: !todo.completed
      };
    }
    return todo;
  });

  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

function updateStats() {
  const remaining = todos.filter(todo => !todo.completed).length;
  itemsLeft.textContent = `${remaining} item${remaining !== 1 ? "s" : ""} left`;
}

function filterTodos(filter) {
  currentFilter = filter;

  filters.forEach(button => {
    button.classList.remove("active");
  });

  document.querySelector(`[data-filter="${filter}"]`).classList.add("active");

  renderTodos();
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const text = input.value.trim();

  if (text === "") {
    alert("Please enter a task");
    return;
  }

  addTodo(text);
  input.value = "";
});

todoList.addEventListener("click", function(event) {
  const li = event.target.closest(".todo-item");

  if (!li) return;

  const id = Number(li.dataset.id);

  if (event.target.classList.contains("todo-text")) {
    toggleTodo(id);
  }

  if (event.target.classList.contains("delete-btn")) {
    deleteTodo(id);
  }
});

filters.forEach(button => {
  button.addEventListener("click", function() {
    const filter = button.dataset.filter;
    filterTodos(filter);
  });
});

clearCompletedBtn.addEventListener("click", function() {
  todos = todos.filter(todo => !todo.completed);
  renderTodos();
});

renderTodos();
