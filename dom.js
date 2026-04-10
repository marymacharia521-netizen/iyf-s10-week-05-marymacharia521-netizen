const heading = document.querySelector("h1");
console.log(heading);

const formElement = document.getElementById("todo-form");
console.log(formElement);

const filterButtons = document.querySelectorAll(".filter");
console.log(filterButtons);

const todoContainer = document.querySelector(".container");
console.log(todoContainer.parentElement);
console.log(todoContainer.children);

heading.textContent = "My Interactive To-Do List";
heading.style.color = "#333";
heading.style.marginBottom = "20px";
