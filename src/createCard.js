import { createElement } from "./utility";
import { checkboxFn, listeners } from "./cardFunctionality";
import Delete from "./icons/trash.svg";
import Edit from "./icons/edit.svg";
import Expand from "./icons/expand.svg";
import Add from "./icons/add.svg";
import Cancel from "./icons/close.svg";
import Save from "./icons/check.svg";

// create a "to-do" card, via DOM
const craftCard = (() => {
// I have these declared right away to be available in multiple functions...)
    let checked;
    let expandCard;
    let editCard;
    let deleteCard;
    let projectAdd;
    let projectAddCancel;
    let projectAddSave;
    let cancelEditBtn;
    let submitEditBtn;

    const initial = () => {
        const card = createElement('div', {"class": "card"});
        return card;
    }
    // use a count to differentiate each card's group of priority (radio) btns
    let count = -1;
    // make "to-do" card
    const card = (object, cardDiv) => {
        cardDiv.value = object;
        count++;
        // -> 3 zones (regular, extended, and editable)
        const regularSize = createElement('div', {"class": "regularSize"});
        const extendedSize = createElement('div', {"class": "extendedSize"});
        const editSize = createElement('div', {"class": "editSize"});
        cardDiv.appendChild(regularSize);
        cardDiv.appendChild(extendedSize);
        cardDiv.appendChild(editSize);
        // build card
        // regular size
        checked = createElement('div', {"class": "checkbox", 'aria-label': "Checkbox", "id": "checkbox"});
        let title = _title(object);
        const spacerDiv = createElement('div', {"class": "spacerDiv"});
        let priority = _priority(object);
        let date = _date(object);
        expandCard = createElement('button', {"id": "expand", "class": "expand", "aria-label": "Expand Card", "title": "Expand"});
        const expandIcon = createElement('img', {"src": `${Expand}`, "alt": "Expand"});
        editCard = createElement('button', {"class": "editCard", "aria-label": "Edit Card", "title": "Edit"});
        const editIcon = createElement('img', {"src": `${Edit}`, "alt": "Edit"});
        deleteCard = createElement('button', {"class": "deleteCard", "aria-label": "Delete Card", "title": "Delete"});
        const deleteIcon = createElement('img', {"src": `${Delete}`, "alt": "Delete"});
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
        regularSize.appendChild(date);
        regularSize.appendChild(expandCard);
        expandCard.appendChild(expandIcon);
        regularSize.appendChild(editCard);
        editCard.appendChild(editIcon);
        regularSize.appendChild(deleteCard);
        deleteCard.appendChild(deleteIcon);
        extendedSize.appendChild(note);
        extendedSize.appendChild(project);
        editSize.appendChild(priorityEdit);
        editSize.appendChild(submitEdit);
        // add listeners to all the buttons
        listeners.addAll(checked, expandCard, editCard, deleteCard, projectAdd, projectAddCancel, projectAddSave, cancelEditBtn, submitEditBtn, cardDiv, object)
        // check for checkbox
        if (object.checked) {
            checkboxFn(checked);
        }
    }
    // helper fns
    // title: container, text (regular view), input and label (edit mode)
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
    // priority: display to-do's priority level
    const _priority = (object) => {
        const priority = createElement('div', {"id": "priority", "class": `${object.priority}`});
        priority.textContent = `${object.priority}`;
        return priority;
    } 
    // date: display to-do's due date
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
    // notes: display notes
    const _notes = (object) => {
        const notesContainer = createElement('div', {"class": "notesContainer"});
        const notes = createElement('div', {"class": "notes"});
        notes.textContent = `Notes: ${object.notes}`;
        const notesEditLabel = createElement('label', {"for": "notesEdit"});
        notesEditLabel.textContent = "Notes:";
        const notesEditInput = createElement('textarea', {"id": "notesEdit", "rows": "2", "cols": "30"});
        notesContainer.appendChild(notes);
        notesContainer.appendChild(notesEditLabel);
        notesContainer.appendChild(notesEditInput);
        return notesContainer;
    }
    // project: display project dropdown (in regular view), 
    // button to add new project (which reveals input field, cancel btn and save btn)
    const _project = (object) => {
        const projectContainer = createElement('div', {'class': 'projectContainer'});
        const projectText = createElement('div', {"class": "projectText"});
        if (object.project != "") {
            projectText.textContent = `Project: ${object.project}`;
        }
        const projectEditLabel = createElement('label', {"class": "projectEditLabel", "for": "projectDropdown"});
        projectEditLabel.textContent = "Project:";
        const projectSelect = createElement('select', {"class": "projectSelect", "id": "projectDropdown"});
        projectAdd = createElement('button', {"class": "projectAddBtn", "aria-label": "Add Project"});
        const projectAddIcon = createElement('img', {"src": `${Add}`, "alt": "Add Project"});
        const projectAddContainer = createElement('div', {"class": "projectAddContainer"});
        const projectAddInput = createElement('input', {"type": "text", "class": "projectAddInput", "aria-label": "Add New Project"});
        projectAddCancel = createElement('button', {"class": "projectAddCancel", "aria-label": "Cancel"});
        const projectCancelIcon = createElement('img', {"src": `${Cancel}`, "alt": "Cancel"});
        projectAddSave = createElement('button', {"class": "projectAddSave"});
        const projectSaveIcon = createElement('img', {"src": `${Save}`, "alt": "Save Project"});
        projectContainer.appendChild(projectText);
        projectContainer.appendChild(projectEditLabel);
        projectContainer.appendChild(projectSelect);
        projectContainer.appendChild(projectAdd);
        projectAdd.appendChild(projectAddIcon);
        projectContainer.appendChild(projectAddContainer);
        projectAddContainer.appendChild(projectAddInput);
        projectAddContainer.appendChild(projectAddCancel);
        projectAddCancel.appendChild(projectCancelIcon);
        projectAddContainer.appendChild(projectAddSave);
        projectAddSave.appendChild(projectSaveIcon);
        return projectContainer;
    }
    // priority: radio buttons & corresponding labels
    // had to differentiate each card's group of radio buttons
    // did this using the "count" value in the name
    const _priorityEdit = () => {
        const priorityEditContainer = createElement('div', {"class": "priorityEditContainer"});
        const priorityEditTitle = createElement('div', {"class": "priorityEditTitle"});
        priorityEditTitle.textContent = "Priority:"
        const priorityEditLow = createElement('input', {"type": "radio", "name": `priorityEditBtns${count}`, "id": `priorityEditLow${count}`, "value": "Low"});
        const priorityEditLowLabel = createElement('label', {"for": `priorityEditLow${count}`, "class": "Low"});
        priorityEditLowLabel.textContent = "Low";
        const priorityEditMed = createElement('input', {"type": "radio", "name": `priorityEditBtns${count}`, "id": `priorityEditMed${count}`, "value": "Medium"});
        const priorityEditMedLabel = createElement('label', {"for": `priorityEditMed${count}`, "class": "Medium"});
        priorityEditMedLabel.textContent = "Medium";
        const priorityEditHigh = createElement('input', {"type": "radio", "name": `priorityEditBtns${count}`, "id": `priorityEditHigh${count}`, "value": "High"});
        const priorityEditHighLabel = createElement('label', {"for": `priorityEditHigh${count}`, "class": "High"});
        priorityEditHighLabel.textContent = "High";
        const priorityEditDefcon = createElement('input', {"type": "radio", "name": `priorityEditBtns${count}`, "id": `priorityEditDefcon${count}`, "value": "Defcon"});
        const priorityEditDefconLabel = createElement('label', {"for": `priorityEditDefcon${count}`, "class": "Defcon"});
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
    // submit: container, cancel and submit buttons
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
    return { initial, card }
})();
// create initial div, then build the card, then return it
const createCard = (object) => {
    let card = craftCard.initial();
    craftCard.card(object, card);
    return card;
}
// export for use in openingModal.js, navbar.js, and addToDo.js
export { createCard }