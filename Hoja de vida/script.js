document.addEventListener("DOMContentLoaded", () => {
    loadItems("academic-list", "academicData");
    loadItems("work-list", "workData");
    loadItems("skills-list", "skillsData");
});

function addItem(listId, inputId, storageKey, typeId) {
    let inputField = document.getElementById(inputId);
    let typeField = document.getElementById(typeId);
    let itemText = inputField.value.trim();
    let typeText = typeField.value;

    if (itemText !== "") {
        let fullText = `${itemText} (${typeText})`;
        addListItem(listId, fullText, storageKey);
        saveItem(storageKey, fullText);
        inputField.value = "";
    }
}

function addListItem(listId, itemText, storageKey) {
    let list = document.getElementById(listId);
    let li = document.createElement("li");
    li.className = "list-group-item";
    
    let span = document.createElement("span");
    span.textContent = itemText;
    
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger";
    deleteBtn.textContent = "Borrar";
    deleteBtn.onclick = function () {
        li.remove();
        removeItem(storageKey, itemText);
    };
    
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
}

function saveItem(storageKey, itemText) {
    let items = JSON.parse(localStorage.getItem(storageKey)) || [];
    items.push(itemText);
    localStorage.setItem(storageKey, JSON.stringify(items));
}

function loadItems(listId, storageKey) {
    let items = JSON.parse(localStorage.getItem(storageKey)) || [];
    items.forEach(item => {
        addListItem(listId, item, storageKey);
    });
}

function removeItem(storageKey, itemText) {
    let items = JSON.parse(localStorage.getItem(storageKey)) || [];
    let updatedItems = items.filter(item => item !== itemText);
    localStorage.setItem(storageKey, JSON.stringify(updatedItems));
}

