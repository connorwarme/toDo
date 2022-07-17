const noteFactory = (title, project, priority, dueDate, notes, checked) => {
    return { title, project, priority, dueDate, notes, checked }
}
let first = noteFactory('update README', '', 'high', '07/14/22', 'kinda like the other dudes', false);

let body = document.querySelector('div.body');

const projectFactory = (name) => {
    return { name };
}
let fine = {
    id: '0',
}
let primo = projectFactory('primo');
console.log(primo);

const addToProject = (project, object) => {
    let x = Object.keys(project).length;
    project[x] = object;
}
addToProject(primo, fine);
console.log(primo);
addToProject(primo, first);

// DOM functions
// helper functions to create DOM element and add attributes
const createElement = (type, attributes) => {
    const newElement = document.createElement(`${type}`);
    if (attributes == null) return newElement;
    setAttributes(newElement, attributes);
    return newElement;
}
const setAttributes = (element, attributes) => {
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    })
}
// create ToDo
const createCard = (object) => {
    const card = createElement('div', {"class": "card"});
    const checked = createElement('button', {"type": "checkbox", "class": "checkbox"});
    const title = createElement('div', {"class": "title"});
    title.textContent = `${object.title}`;
    const priority = createElement('div', {"class": "priority", "id": `${object.priority}`});
    priority.textContent = `${object.priority}`;
    const expandbtn = createElement('input', {"type": "button", "id": "expand", "class": "expand"});
    const expandbtnLabel = createElement('label', {"for": "expand"});
    const date = createElement('div', {"class": "date"});
    date.textContent = `${object.date}`;
    const editCard = createElement('button', {"class": "editCard"});
    const deleteCard = createElement('button', {"class": "deleteCard"});
    card.appendChild(checked);
    card.appendChild(title);
    card.appendChild(priority);
    card.appendChild(expandbtnLabel);
    expandbtnLabel.appendChild(expandbtn);
    card.appendChild(editCard);
    card.appendChild(deleteCard);
    return card;
}


body.appendChild(createCard(first));
// let firstMent = createElement('div', {"id": "first", "class": "firstdiv"});
// body.appendChild(firstMent);

// initial attempt at creating note
// const addNoteForm = () => {
//     const addNote = document.createElement('div');
//     addNote.classList.add('addNote');
//     body.appendChild(addNote);
//     const form = document.createElement('form');
//     form.classList.add('formNew');
//     const headerContainer = document.createElement('div');
//     headerContainer.classList.add('formNewHeaderContainer');
//     const header = document.createElement('div');
//     header.classList.add('formNewHeader');
//     header.textContent = "CheckMate";
//     const headerClose = document.createElement('div');
//     headerClose.classList.add('formNewHeaderClose');
//     headerClose.textContent = "X";
//     const noteContainer = document.createElement('div');
//     noteContainer.classList.add('formNewNoteContainer');
//     const titleInputLabel = document.createElement('label');
//     titleInputLabel.setAttribute('for', 'titleInput');
//     titleInputLabel.textContent = "Title:";
//     const titleInput = document.createElement('input');
//     titleInput.classList.add('titleInput');
//     titleInput.setAttribute('id', 'titleInput');
//     const priorityInputList = document.createElement('div');
//     priorityInputList.classList.add('priorityInputList');
//     const priorityLabel = document.createElement('div');
//     priorityLabel.classList.add('priorityInputLabel');
//     priorityLabel.textContent = "Priority:";
//     const lowbtn = document.createElement('input');
//     lowbtn.setAttribute('type', 'radio');
//     lowbtn.setAttribute('name', 'priorityInput');
//     lowbtn.setAttribute('id', 'lowbtn');
//     lowbtn.setAttribute('value', "Low");
//     lowbtn.classList.add('lowbtn');
//     const lowbtnLabel = document.createElement('label');
//     lowbtnLabel.setAttribute('for', 'lowbtn');
//     lowbtnLabel.textContent = "Low";
//     const medbtn = document.createElement('input');
//     medbtn.setAttribute('type', 'radio');
//     medbtn.setAttribute('name', 'priorityInput');
//     medbtn.setAttribute('id', 'medbtn');
//     medbtn.setAttribute('value', "Med");
//     medbtn.classList.add('medbtn');
//     const medbtnLabel = document.createElement('label');
//     medbtnLabel.setAttribute('for', 'medbtn');
//     medbtnLabel.textContent = "Medium";
//     const highbtn = document.createElement('input');
//     highbtn.setAttribute('type', 'radio');
//     highbtn.setAttribute('name', 'priorityInput');
//     highbtn.setAttribute('id', 'highbtn');
//     highbtn.setAttribute('value', "High");
//     highbtn.classList.add('highbtn');
//     const highbtnLabel = document.createElement('label');
//     highbtnLabel.setAttribute('for', 'highbtn');
//     highbtnLabel.textContent = "High";
//     const defconbtn = document.createElement('input');
//     defconbtn.setAttribute('type', 'radio');
//     defconbtn.setAttribute('name', 'priorityInput');
//     defconbtn.setAttribute('id', 'defconbtn');
//     defconbtn.setAttribute('value', "Defcon");
//     defconbtn.classList.add('defconbtn');
//     const defconbtnLabel = document.createElement('label');
//     defconbtnLabel.setAttribute('for', 'defconbtn');
//     defconbtnLabel.textContent = "Defcon";
//     const dateInputLabel = document.createElement('label');
//     dateInputLabel.setAttribute('for', 'dateInput');
//     dateInputLabel.textContent = "Due Date:";
//     const dateInput = document.createElement('input');
//     dateInput.setAttribute('type', 'date');
//     dateInput.setAttribute('id', 'dateInput');
//     const textareaLabel = document.createElement('label');
//     textareaLabel.setAttribute('for', 'textarea');
//     textareaLabel.classList.add('textareaLabel')
//     textareaLabel.textContent = "Notes:";
//     const textarea = document.createElement('textarea');
//     textarea.setAttribute('id', 'textarea');
//     const submitContainer = document.createElement('div');
//     submitContainer.classList.add('formNewSubmitContainer');
//     const submitLabel = document.createElement('label');
//     submitLabel.setAttribute('for', 'formNewSubmit');
//     submitLabel.setAttribute('id', 'formNewSubmitLabel');
//     submitLabel.textContent = "Submit Label"
//     const submitbtn = document.createElement('input');
//     submitbtn.setAttribute('id', 'formNewSubmit');
//     submitbtn.setAttribute('type', 'submit');
//     submitbtn.classList.add('formNewSubmit');
//     submitbtn.setAttribute('value', 'Submit');
//     addNote.appendChild(form);
//     form.appendChild(headerContainer);
//     headerContainer.appendChild(header);
//     headerContainer.appendChild(headerClose);
//     form.appendChild(noteContainer);
//     noteContainer.appendChild(titleInputLabel);
//     noteContainer.appendChild(titleInput);
//     noteContainer.appendChild(priorityInputList);
//     priorityInputList.appendChild(priorityLabel);
//     priorityInputList.appendChild(lowbtn);
//     priorityInputList.appendChild(lowbtnLabel);
//     priorityInputList.appendChild(medbtn);
//     priorityInputList.appendChild(medbtnLabel);
//     priorityInputList.appendChild(highbtn);
//     priorityInputList.appendChild(highbtnLabel);
//     priorityInputList.appendChild(defconbtn);
//     priorityInputList.appendChild(defconbtnLabel);
//     noteContainer.appendChild(dateInputLabel);
//     noteContainer.appendChild(dateInput);
//     noteContainer.appendChild(textareaLabel);
//     noteContainer.appendChild(textarea);
//     noteContainer.appendChild(submitContainer);
//     submitContainer.appendChild(submitLabel);
//     submitContainer.appendChild(submitbtn);
// }
// addNoteForm();

// const checkListener = (input) => {
//     input.setAttribute('onclick', 'checkboxFn()')
// }
// const checkboxFn = () => {
//     console.log('checked!')
// }
// const deleteListener = (input) => {
//     input.addEventListener('click', (e) => {deleteFn(e)});
// }
// const deleteFn = (event) => {
//     body.removeChild(event.target.parentElement);
// }

// const makeNote = (object) => {
//     let card = document.createElement('div');
//     card.classList.add('card');
//     let checkbox = document.createElement('button');
//     checkbox.classList.add('checkbox');
//     checkbox.setAttribute('id', 'checkbox');
//     checkbox.setAttribute('aria-label', "Unchecked");
//     if (object.checked == true) {
//         checkbox.classList.toggle('checked');
//         checkbox.setAttribute('aria-label', 'Checked');
//     }
//     checkListener(checkbox);
//     let title = document.createElement('div');
//     title.classList.add('title');
//     title.textContent = object.title;
//     let priority = document.createElement('div');
//     priority.classList.add('priority');
//     priority.textContent = object.priority;
//     let date = document.createElement('div');
//     date.classList.add('div');
//     date.textContent = object.dueDate;
//     let deletebtn = document.createElement('button');
//     deletebtn.classList.add('delete');
//     deletebtn.setAttribute('aria-label', 'Delete');
//     deleteListener(deletebtn);
//     deletebtn.textContent = 'Delete';
//     body.appendChild(card);
//     card.appendChild(checkbox);
//     card.appendChild(title);
//     card.appendChild(priority);
//     card.appendChild(date);
//     card.appendChild(deletebtn);
// }
// makeNote(first);
