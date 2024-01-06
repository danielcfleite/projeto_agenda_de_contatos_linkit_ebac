const addButton = document.querySelector("#add-button");
const favoritesButton = document.querySelector("#favorites-button");
const backgroundButton = document.querySelector("#background-button");
const githubButton = document.querySelector("#github-button");
const contactsList = document.querySelector("#list-of-contacts");
const groupsList = document.querySelector("#list-of-groups");
const createNewGroupButton = document.querySelector("#create-new-group");
const newGroupForm = document.querySelector(".new-group");
const selectGroup = document.querySelector("#select-group-item");
const newContactForm = document.querySelector("#form");
const addContactSpan = document.querySelector("#add-contact-span");
const backgroundSelectionPage = document.querySelector("#background-selection");
const bodyElement = document.querySelector("body");
const backgrounds = document.querySelectorAll(".bg");

// function createContact(){

// }
let isGroupNew = false;
let isCreatingNewContact = false;

createNewGroupButton.addEventListener("click", (event) => {
  backgroundSelectionPage.classList.add("hidden");
  if (!isGroupNew) {
    event.preventDefault();
    newGroupForm.classList.remove("hidden");
    selectGroup.classList.add("hidden");
    createNewGroupButton.innerHTML = "Selecionar Grupo";
    isGroupNew = true;
  } else {
    isGroupNew = false;
    event.preventDefault();
    newGroupForm.classList.add("hidden");
    selectGroup.classList.remove("hidden");
    createNewGroupButton.innerHTML = "novo grupo";
    isGroupNew = false;
  }
});

addButton.addEventListener("click", (event) => {
  backgroundSelectionPage.classList.add("hidden");
  if (!isCreatingNewContact) {
    event.preventDefault();
    contactsList.classList.add("hidden");
    newContactForm.classList.remove("hidden");
    addButton.innerHTML = "<i class='ph-fill ph-x'></i>";
    addContactSpan.innerHTML = "Fechar";
    isCreatingNewContact = true;
  } else {
    event.preventDefault();
    contactsList.classList.remove("hidden");
    newContactForm.classList.add("hidden");
    addButton.innerHTML = "<i class='ph-fill ph-plus'></i>";
    addContactSpan.innerHTML = "Adicionar Contato";
    isCreatingNewContact = false;
  }
});

favoritesButton.addEventListener("click", (event) => {
  event.preventDefault();
  alert("clicou em favoritos");
});

githubButton.addEventListener("click", (event) => {
  event.preventDefault();
  alert("clicou em github");
});

// ----- Background Selection

backgroundButton.addEventListener("click", (event) => {
  contactsList.classList.add("hidden");
  newContactForm.classList.add("hidden");
  backgroundSelectionPage.classList.remove("hidden");
  console.log(backgrounds[0].src);
});

backgrounds.forEach((bg) => {
  bg.addEventListener("click", () => {
    console.log(bg.src);
    bodyElement.style.backgroundImage = `url(${bg.src})`;
  });
});

// function selectBackground (currentBackGround)
