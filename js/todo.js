const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.currentTarget.parentElement.parentElement;
  console.log(li);
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function editTodo(event) {
  const li = event.currentTarget.parentElement.parentElement;
  console.log(li);
  li.querySelector(".todo__text").classList.add("hidden");
  li.querySelector(".todo__tools").classList.add("disabled");
  li.querySelector("input").type = "text";
}

function editSubmit(event) {
  if (!event.target.value.trim()) return;
  const li = event.target.parentElement;
  li.querySelector(".todo__text").classList.remove("hidden");
  li.querySelector(".todo__text").innerText = event.target.value;
  li.querySelector(".todo__tools").classList.remove("disabled");
  li.querySelector("input").type = "hidden";
  toDos = toDos.map((toDo) =>
    toDo.id === parseInt(li.id) ? { ...toDo, text: event.target.value } : toDo
  );
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const text = document.createElement("div");
  text.classList.add("todo__text");
  text.innerText = newTodo.text;
  const input = document.createElement("input");
  input.type = "hidden";
  input.value = newTodo.text;
  input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") editSubmit(e);
  });
  const tools = document.createElement("div");
  tools.classList.add("todo__tools");
  const edit = document.createElement("button");
  edit.innerHTML = '<span class="material-symbols-outlined">edit</span>';
  edit.addEventListener("click", editTodo);
  const remove = document.createElement("button");
  remove.innerHTML = '<span class="material-symbols-outlined">close</span>';
  remove.addEventListener("click", deleteToDo);
  tools.appendChild(edit);
  tools.appendChild(remove);
  li.appendChild(text);
  li.appendChild(input);
  li.appendChild(tools);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
