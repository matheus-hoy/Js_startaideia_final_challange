let inputValue = document.getElementById("myInput");
let myUL = document.getElementById("myUL");
let listArr = [];
loadToDo();

const button = document.getElementById("btn");

button.addEventListener("click", (event) => {
  event.preventDefault();
  sendToDo(inputValue.value);
});

function deleteAll() {
  const buttonClose = document.querySelectorAll(".span-close");
  buttonClose.forEach((element) => {
    element.addEventListener("click", (event) => {
      deleteToDo(event.target.id);
      loadToDo();
    });
  });
  console.log(buttonClose);
}

function editAll() {
  const spanEdit = document.querySelectorAll(".span-edit");
  spanEdit.forEach((element) => {
    element.addEventListener("click", (event) => {
      editToDo(event.target.id, element);
    });
  });
  console.log(spanEdit);
}

async function loadToDo() {
  const response = await axios.get("http://localhost:4000/tarefas");
  console.log(response);
  listArr = response.data;
  render();
}

async function sendToDo(title) {
  const response = await axios.post("http://localhost:4000/tarefas", {
    title,
    description: title,
  });
  console.log(response);
}

async function deleteToDo(id) {
  const response = await axios.delete(`http://localhost:4000/tarefas/${id}`);
  console.log(response);
}

async function editToDo(id, element, checked=null) {
  const parent = element.parentNode;
  const p = parent.children[0];
  console.log(parent.children);
  const title = p.innerText;
  console.log(p.innerText);
  const response = await axios.put(`http://localhost:4000/tarefas/${id}`, {
    title,
    description: title,
    complete: checked===null ? element.complete : checked,
    
  });
  console.log(response);
}

async function checkTodo() {
  const checkBox = document.querySelectorAll(".check");
  checkBox.forEach((element) => {
    element.addEventListener("click", (event) => {
      console.log(event, element)
      const check = event.target.checked;
      editToDo(element.id, element, check);
      console.log(check);
    });
  });
  console.log(checkBox);
}


function render() {
  myUL.innerHTML = "";
  listArr.forEach((element) => {
    let li = document.createElement("li");
    li.innerHTML =
    li.innerHTML = `<p contenteditable="true">${element.title}</p> 
    <input class="check" id="${element.id}" type="checkbox" ${element.complete? 'checked':''}/>
    <span style="color: rgb(17, 86, 102); cursor:pointer; -webkit-text-stroke-width: thick;" class="span-close" id="${element.id}"> Excluir </span>
    <span id="${element.id}" style="color: rgb(17, 86, 102); cursor:pointer; -webkit-text-stroke-width: thick;" class="span-edit">Editar/Salvar</span>`;
    myUL.appendChild(li);
    inputValue.value = "";
  });
  deleteAll();
  editAll();
  checkTodo();
}
