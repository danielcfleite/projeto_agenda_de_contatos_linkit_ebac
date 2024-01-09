const addButton = document.querySelector("#add-button");
const favoritesButton = document.querySelector("#favorites-button");
const backgroundButton = document.querySelector("#background-button");
const contactsList = document.querySelector("#list-of-contacts");
const groupsList = document.querySelector("#list-of-groups");
const createNewGroupButton = document.querySelector("#create-new-group");
const newGroupForm = document.querySelector(".new-group");
const selectGroupAll = document.querySelector("#select-group-item");
const newContactForm = document.querySelector("#form");
const addContactSpan = document.querySelector("#add-contact-span");
const backgroundSelectionPage = document.querySelector("#background-selection");
const bodyElement = document.querySelector("body");
const backgrounds = document.querySelectorAll(".bg");
const name = document.querySelector("#name");
const phoneNumber = document.querySelector("#phone-number");
const selectGroupCheck = document.querySelector("#select-group");
const newGroup = document.querySelector("#new-group");
const sendFormButton = document.querySelector("#send-form");
const modalChoiceOfGroups = document.querySelector("#modal-choice-of-groups");
const selectGroupMessage = document.querySelector("#select-group-message");
const selectGroupFirstChoice = document.querySelector(
  "#select-group-first-choice"
);
const selectGroupSecondChoice = document.querySelector(
  "#select-group-second-choice"
);
const cancelGroupSelectionButton = document.querySelector(
  "#cancel-select-group"
);
const modalNumberAlreadyExists = document.querySelector(
  "#modal-number-already-exists"
);
const numberAlreadyExistsMessage = document.querySelector(
  "#number-already-exists-message"
);
const numberAlreadyExistsFirstChoice = document.querySelector(
  "#number-already-exists-first-choice"
);

const cancelNumberAlreadyExists = document.querySelector(
  "#cancel-number-already-exists"
);

const isFavoriteCheckBox = document.querySelector("#is-favorite");

// -- form variables
let isGroupNew = false;
let isCreatingNewContact = false;
let isSelected = false;

//--

//-- Buttons to navigate the menu --
createNewGroupButton.addEventListener("click", (event) => {
  backgroundSelectionPage.classList.add("hidden");
  if (!isGroupNew) {
    event.preventDefault();
    newGroupForm.classList.remove("hidden");
    selectGroupAll.classList.add("hidden");
    createNewGroupButton.innerHTML = "Selecionar Grupo";
    isGroupNew = true;
  } else {
    isGroupNew = false;
    event.preventDefault();
    newGroupForm.classList.add("hidden");
    selectGroupAll.classList.remove("hidden");
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
    addContactSpan.innerHTML = "Adicionar";
    isCreatingNewContact = false;
  }
});
let isAtFavorite = false;

favoritesButton.addEventListener("click", (event) => {
  event.preventDefault();
  let isFavoritesUpdate = true;
  if (isAtFavorite === false) {
    updateContactList(isFavoritesUpdate, getFavorites());
    isAtFavorite = true;
    console.log(isAtFavorite);
  } else if (isAtFavorite === true) {
    updateContactList();
    isAtFavorite = false;
    console.log(isAtFavorite);
  }
});

sendFormButton.addEventListener("click", (event) => {
  event.preventDefault();
  getDataFromForm();
});

//--

// -- lists and storage

let contacts = [];
let groups = [];
let favorites = [];

updateGroups();

// -- check if there are already contacts, if there are are, update

const contactsAlreadyExist = JSON.parse(localStorage.getItem("contacts"));

if (contactsAlreadyExist) {
  contacts = contactsAlreadyExist;
  updateContactList();
} else {
  contacts = [];
}

//--

function createContactWithNewGroup() {
  const nameValue = name.value;
  const phoneValue = phoneNumber.value;
  const newGroupValue = newGroup.value;
  const id = generateUniqueIdentifier();
  const favorite = isFavoriteCheckBox.checked;
  if (nameValue && phoneValue && newGroupValue && id) {
    const contactData = {
      name: nameValue,
      phoneNumber: phoneValue,
      group: newGroupValue,
      id,
      favorite,
    };
    createNewContact(contactData);
  } else {
    alert("Favor preencher todos os campos");
  }
}

function createContactWithExistingGroup() {
  const nameValue = name.value;
  const phoneValue = phoneNumber.value;
  const groupChecked = selectGroupCheck.value;
  const id = generateUniqueIdentifier();
  const favorite = isFavoriteCheckBox.checked;
  if (nameValue && phoneValue && groupChecked && id) {
    const contactData = {
      name: nameValue,
      phoneNumber: phoneValue,
      group: groupChecked,
      id,
      favorite,
    };
    createNewContact(contactData);
  } else {
    alert("favor preencher todos os campos");
  }
}

function getDataFromForm() {
  const isNewGroup = newGroup.value;

  if (!isNewGroup && selectGroupCheck.value === "none") {
    alert("grupos são obrigatórios");
  } else if (isNewGroup && selectGroupCheck.value !== "none") {
    selectGroupMessage.innerHTML = `Você escolheu dois grupos: \n
    ${newGroup.value} e ${selectGroupCheck.value}\n
    qual gostaria de usar para esse contato?`;
    selectGroupFirstChoice.innerHTML = `${newGroup.value}`;
    selectGroupSecondChoice.innerHTML = `${selectGroupCheck.value}`;
    modalChoiceOfGroups.classList.remove("hidden");

    selectGroupFirstChoice.addEventListener("click", (event) => {
      event.preventDefault();
      createContactWithNewGroup();
      generateUniqueIdentifier();
      modalChoiceOfGroups.classList.add("hidden");
    });

    selectGroupSecondChoice.addEventListener("click", (event) => {
      event.preventDefault();
      createContactWithExistingGroup();
      generateUniqueIdentifier();
      modalChoiceOfGroups.classList.add("hidden");
    });

    cancelGroupSelectionButton.addEventListener("click", () => {
      modalChoiceOfGroups.classList.add("hidden");
    });
  } else if (!isNewGroup) {
    createContactWithExistingGroup();
    generateUniqueIdentifier();
  } else if (isNewGroup) {
    createContactWithNewGroup();
    generateUniqueIdentifier();
  } else if (!isNewGroup && selectGroupCheck.value === "none") {
    alert("gay");
  }
}

function generateUniqueIdentifier() {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substr(2, 9); // Random alphanumeric string
  const id = `${timestamp}-${random}`;
  return id;
}

function createNewContact(contactData) {
  checkIfNumberAlreadyExists(contactData.phoneNumber); //aoba
  if (phoneNumberExists) {
    numberAlreadyExistsMessage.innerHTML = `O usuário ${phoneNumberExists.name} tem o mesmo número de telefone, gostaria de continuar ainda assim?`;
    numberAlreadyExistsFirstChoice.innerHTML = "SIM";
    cancelNumberAlreadyExists.innerHTML = "NÃO";
    modalNumberAlreadyExists.classList.remove("hidden");

    numberAlreadyExistsFirstChoice.addEventListener("click", (event) => {
      event.preventDefault();
      contacts.push(contactData);
      updateContactList();
      updateGroups();
      clearFormData();
      modalNumberAlreadyExists.classList.add("hidden");
      return;
    });

    cancelNumberAlreadyExists.addEventListener("click", () => {
      modalNumberAlreadyExists.classList.add("hidden");
    });

    return;
  }
  contacts.push(contactData);
  updateGroups();
  updateContactList();
  clearFormData();
}

function clearFormData() {
  name.value = "";
  phoneNumber.value = "";
  selectGroupCheck.selectedIndex = 0;
  newGroup.value = "";
}

function removeContactFromContactList(id) {
  const confirmDelete = window.confirm("Remover usuário?");
  if (confirmDelete) {
    contacts = contacts.filter((contact) => contact.id !== id);
    updateContactList();
    updateGroups();
  }
}

function checkIfNumberAlreadyExists(phoneNumbertoBeChecked) {
  phoneNumberExists = contacts.find(
    (contact) => contact.phoneNumber === phoneNumbertoBeChecked
  );
  return phoneNumberExists;
}

function toggleFavorite(id) {
  contactToChange = contacts.find((contact) => contact.id === id);
  contactToChange.favorite = !contactToChange.favorite;
  updateContactList();
}

function getFavorites() {
  const favoritesList = contacts.filter((contact) => contact.favorite === true);
  return favoritesList;
}

function updateContactList(isFavoritesUpdate, favorites) {
  if (!isFavoritesUpdate) {
    contactsList.innerHTML = "";
    contacts.forEach((contact) => {
      const li = document.createElement("li");
      li.innerHTML = `
    <span class="name-li">${contact.name}</span
    ><span class="phone-li">${contact.phoneNumber}</span>
    <button class="favorite" data-id=${
      contact.id
    } onclick="toggleFavorite(this.dataset.id)">
      ${
        contact.favorite
          ? '<i class="ph-fill ph-star"></i>'
          : '<i class="ph ph-star"></i>'
      }
    </button>
    <button class="remove" data-id=${
      contact.id
    } onclick="removeContactFromContactList(this.dataset.id)">
      <i class="ph ph-trash"></i>
    </button>`;
      contactsList.appendChild(li);
    });
    localStorage.setItem("contacts", JSON.stringify(contacts));
  } else {
    contactsList.innerHTML = "";
    favorites.forEach((favoriteContact) => {
      const li = document.createElement("li");
      li.innerHTML = `
    <span class="name-li">${favoriteContact.name}</span
    ><span class="phone-li">${favoriteContact.phoneNumber}</span>
    <button class="favorite" data-id=${
      favoriteContact.id
    } onclick="toggleFavorite(this.dataset.id)">
      ${
        favoriteContact.favorite
          ? '<i class="ph-fill ph-star"></i>'
          : '<i class="ph ph-star"></i>'
      }
    </button>
    <button class="remove" data-id=${
      favoriteContact.id
    } onclick="removeContactFromContactList(this.dataset.id)">
      <i class="ph ph-trash"></i>
    </button>`;
      contactsList.appendChild(li);
    });
  }
}

function updateContactsByGroup(group) {
  contactsByGroup = contacts.filter((contact) => contact.group === group);
  if (isSelected === false) {
    contactsByGroup.forEach((contact) => {
      contactsList.innerHTML = "";
      const li = document.createElement("li");
      li.innerHTML = `
  <span class="name-li">${contact.name}</span
  ><span class="phone-li">${contact.phoneNumber}</span>
  <button class="favorite" data-id=${
    contact.id
  } onclick="toggleFavorite(this.dataset.id)">
    ${
      contact.favorite
        ? '<i class="ph-fill ph-star"></i>'
        : '<i class="ph ph-star"></i>'
    }
  </button>
  <button class="remove" data-id=${
    contact.id
  } onclick="removeContactFromContactList(this.dataset.id)">
    <i class="ph ph-trash"></i>
  </button>`;
      contactsList.appendChild(li);
      console.log(isSelected);
      isSelected = true;
    });
  } else if (isSelected === true) {
    isSelected = false;
    updateContactList();
    console.log(isSelected);
  }
}
function getGroups() {
  const uniqueGroups = new Set();
  contacts.forEach((contact) => {
    uniqueGroups.add(contact.group);
  });
  groups = uniqueGroups;
  createGroupsOptions(groups);
}

function updateGroups() {
  getGroups();
  groupsList.innerHTML = " ";
  groups.forEach((group) => {
    const li = document.createElement("li");
    li.onclick = function () {
      updateContactsByGroup(group.toString());
    };

    li.innerHTML = `${group.toString()}`;
    groupsList.appendChild(li);
  });
}

function createGroupsOptions(groups) {
  selectGroupCheck;
  groups.forEach((group) => {
    const option = document.createElement("option");
    option.value = group;
    option.text = group;
    selectGroupCheck.appendChild(option);
  });
  //working
}

// -- Validate Phone Number

const handlePhone = (event) => {
  let input = event.target;
  input.value = phoneMask(input.value);
};

const phoneMask = (value) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
};

//--

// ----- Background Selection

// -- Check if there is a background already saved --

const previousBackground = localStorage.getItem("background");
if (previousBackground) {
  bodyElement.style.backgroundImage = previousBackground;
}

// --

backgroundButton.addEventListener("click", (event) => {
  contactsList.classList.add("hidden");
  newContactForm.classList.add("hidden");
  backgroundSelectionPage.classList.remove("hidden");
});

backgrounds.forEach((bg) => {
  bg.addEventListener("click", () => {
    const backgroundSrc = `url(${bg.src})`;
    bodyElement.style.backgroundImage = backgroundSrc;
    localStorage.setItem("background", `${backgroundSrc}`);
  });
});

function resetContactsDeveloper() {
  localStorage.setItem("contacts", JSON.stringify(""));
}

updateGroups();

//--
