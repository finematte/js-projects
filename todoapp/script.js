let input = document.querySelector(".entered-list");
let addButton = document.querySelector(".add-list");
let tasks = document.querySelector(".tasks");

const addTask = () => {
  if (input.value.trim() != 0) {
    let newItem = document.createElement("div");
    newItem.classList.add("item");
    newItem.innerHTML = `
    <p>${input.value}</p>
    <div class="item-button">
      <i class="fa-solid fa-pen-to-square"></i>
      <i class="fa-solid fa-trash-can"></i>
    </div>`;
    tasks.appendChild(newItem);
    addButton.classList.remove("active");
    input.value = "";
  } else {
    alert("Please enter a task!");
  }
};

input.addEventListener("keyup", () => {
  if (input.value.trim() != 0) {
    addButton.classList.add("active");
  } else {
    addButton.classList.remove("active");
  }
});

addButton.addEventListener("click", () => {
  addTask();
});

document.querySelector(".entered-list").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    addTask();
  }
});

tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash-can")) {
    e.target.parentElement.parentElement.remove();
  }
});

tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-pen-to-square")) {
    e.target.parentElement.parentElement.classList.toggle("completed");
  }
});
