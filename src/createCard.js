import { createElement } from "./utility";
let checked;
let expandCard;
let editCard;
let deleteCard;
let projectAdd;
let projectAddCancel;
let projectAddSave;
let cancelEditBtn;
let submitEditBtn;
const makeCard = (object, cardDiv) => {
    // I have these declared right away to be available in multiple functions...)
        // to-do card
        // -> 3 zones (regular, extended, and editable)
        const regularSize = createElement('div', {"class": "regularSize"});
        const extendedSize = createElement('div', {"class": "extendedSize"});
        const editSize = createElement('div', {"class": "editSize"});
        cardDiv.appendChild(regularSize);
        cardDiv.appendChild(extendedSize);
        cardDiv.appendChild(editSize);
        // build card
        // regular size
        checked = createElement('input', {"type": "checkbox", "class": "checkbox", 'aria-label': "Checkbox"});
        let title = _title(object);
        const spacerDiv = createElement('div', {"class": "spacerDiv"});
        let priority = _priority(object);
        expandCard = createElement('button', {"id": "expand", "class": "expand", "aria-label": "Expand Card"});
        let date = _date(object);
        editCard = createElement('button', {"class": "editCard", "aria-label": "Edit Card"});
        deleteCard = createElement('button', {"class": "deleteCard", "aria-label": "Delete Card"});
        // extended size
        let note = _notes(object);
        let project = _project(object);
        // editable size
        let priorityEdit = _priorityEdit();
        let submitEdit = _submitEdit();
        // append it all together
        regularSize.appendChild(checked);
        regularSize.appendChild(title);
        regularSize.appendChild(spacerDiv);
        regularSize.appendChild(priority);
        regularSize.appendChild(expandCard);
        regularSize.appendChild(date);
        regularSize.appendChild(editCard);
        regularSize.appendChild(deleteCard);
        extendedSize.appendChild(note);
        extendedSize.appendChild(project);
        editSize.appendChild(priorityEdit);
        editSize.appendChild(submitEdit);
}
// helper fns
const _title = (object) => {
    const titleContainer = createElement('div', {"class": "titleContainer"})
    const title = createElement('div', {"class": "title"});
    title.textContent = `${object.title}`;
    const titleEditLabel = createElement('label', {"for": "titleEdit", "class": "titleEdit"});
    titleEditLabel.textContent = "Title:";
    const titleEditInput = createElement('input', {"type": "text", "class": "titleEdit", "id": "titleEdit"});
    titleContainer.appendChild(title);
    titleContainer.appendChild(titleEditLabel);
    titleContainer.appendChild(titleEditInput);
    return titleContainer;
}
const _priority = (object) => {
    const priority = createElement('div', {"class": "priority", "id": `${object.priority}`});
    priority.textContent = `${object.priority}`;
    return priority;
} 
const _date = (object) => {
    const dateContainer = createElement('div', {"class": "dateContainer"});
    const dateText = createElement('div', {"class": "dateText"});
    dateText.textContent = `${object.dueDate}`;
    const dateInputLabel = createElement('label', {"for": "dateInput", "class": "dateInput"});
    dateInputLabel.textContent = "Due Date:"
    const dateInput = createElement('input', {"type": "date", "id": "dateInput", "class": "dateInput"});
    dateContainer.appendChild(dateText);
    dateContainer.appendChild(dateInputLabel);
    dateContainer.appendChild(dateInput);
    return dateContainer;
}
const _notes = (object) => {
    const notesContainer = createElement('div', {"class": "notesContainer"});
    const notes = createElement('div', {"class": "notes"});
    notes.textContent = `Notes: ${object.notes}`;
    const notesEditLabel = createElement('label', {"for": "notesEdit"});
    notesEditLabel.textContent = "Notes:";
    const notesEditInput = createElement('input', {"type": "textarea", "id": "notesEdit"});
    notesContainer.appendChild(notes);
    notesContainer.appendChild(notesEditLabel);
    notesContainer.appendChild(notesEditInput);
    return notesContainer;
}
const _project = (object) => {
    const projectContainer = createElement('div', {'class': 'projectContainer'});
    const projectText = createElement('div', {"class": "projectText"});
    if (object.project != "") {
        projectText.textContent = `Project: ${object.project}`;
    }
    const projectEditLabel = createElement('label', {"class": "projectEditLabel", "for": "projectDropdown"});
    const projectSelect = createElement('select', {"class": "projectSelect", "id": "projectDropdown"});
    projectAdd = createElement('button', {"class": "projectAddBtn", "aria-label": "Add Project"});
    const projectAddContainer = createElement('div', {"class": "projectAddContainer"});
    const projectAddInput = createElement('input', {"type": "text", "class": "projectAddInput", "aria-label": "Add New Project"});
    projectAddCancel = createElement('button', {"class": "projectAddCancel", "aria-label": "Cancel"});
    projectAddSave = createElement('button', {"class": "projectAddSave"});
    projectContainer.appendChild(projectText);
    projectContainer.appendChild(projectEditLabel);
    projectContainer.appendChild(projectSelect);
    projectContainer.appendChild(projectAdd);
    projectContainer.appendChild(projectAddContainer);
    projectAddContainer.appendChild(projectAddInput);
    projectAddContainer.appendChild(projectAddCancel);
    projectAddContainer.appendChild(projectAddSave);
    return projectContainer;
}
const _priorityEdit = () => {
    const priorityEditContainer = createElement('div', {"class": "priorityEditContainer"});
    const priorityEditTitle = createElement('div', {"class": "priorityEditTitle"});
    priorityEditTitle.textContent = "Priority:"
    const priorityEditLow = createElement('input', {"type": "radio", "name": "priorityEditBtns", "id": "priorityEditLow", "value": "Low"});
    const priorityEditLowLabel = createElement('label', {"for": "priorityEditLow"});
    priorityEditLowLabel.textContent = "Low";
    const priorityEditMed = createElement('input', {"type": "radio", "name": "priorityEditBtns", "id": "priorityEditMed", "value": "Medium"});
    const priorityEditMedLabel = createElement('label', {"for": "priorityEditMed"});
    priorityEditMedLabel.textContent = "Medium";
    const priorityEditHigh = createElement('input', {"type": "radio", "name": "priorityEditBtns", "id": "priorityEditHigh", "value": "High"});
    const priorityEditHighLabel = createElement('label', {"for": "priorityEditHigh"});
    priorityEditHighLabel.textContent = "High";
    const priorityEditDefcon = createElement('input', {"type": "radio", "name": "priorityEditBtns", "id": "priorityEditDefcon", "value": "Defcon"});
    const priorityEditDefconLabel = createElement('label', {"for": "priorityEditDefcon"});
    priorityEditDefconLabel.textContent = "Defcon";
    priorityEditContainer.appendChild(priorityEditTitle);
    priorityEditContainer.appendChild(priorityEditLow);
    priorityEditContainer.appendChild(priorityEditLowLabel);
    priorityEditContainer.appendChild(priorityEditMed);
    priorityEditContainer.appendChild(priorityEditMedLabel);
    priorityEditContainer.appendChild(priorityEditHigh);
    priorityEditContainer.appendChild(priorityEditHighLabel);
    priorityEditContainer.appendChild(priorityEditDefcon);
    priorityEditContainer.appendChild(priorityEditDefconLabel);
    return priorityEditContainer;
}
const _submitEdit = () => {
    const submitEditContainer = createElement('div', {"class": "submitContainer"});
    cancelEditBtn = createElement('button', {"class": "cancelEditBtn", "aria-label": "Cancel Edit"});
    cancelEditBtn.textContent = "Cancel";
    submitEditBtn = createElement('button', {"class": "submitEditBtn", "aria-label": "Submit Edit"})
    submitEditBtn.textContent = "Submit";
    submitEditContainer.appendChild(cancelEditBtn);
    submitEditContainer.appendChild(submitEditBtn);
    return submitEditContainer;
}
const creation = () => {
    const card = createElement('div', {"class": "card"});
    return card;
}
const createCard = (object) => {
    let card = creation();
    makeCard(object, card);
    return card;
}
export { createCard }