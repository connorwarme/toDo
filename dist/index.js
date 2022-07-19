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
// ToDo button listener functions
const checkboxFn = (input) => {
    // could just toggle back and forth (i.e. no if clause)
    // if (input.checked == true)
    // get card and toggle class
    input.parentElement.parentElement.classList.toggle('completedToDo');
}
let expand = false;
const expandToggle = () => {
    expand = !expand;
}
const expandFn = (input) => {
    let extendedCard = input.parentElement.nextElementSibling;
    if (expand == false) {
    extendedCard.style.display = "block";
    } else {
        extendedCard.style.display = "none";
        if (edit == false) {
            cancelEditFn(extendedCard.parentElement);
            editToggle();
        }
    }
    expandToggle();
    // extendedCard.classList.toggle('displayExtended');
    // removing displayEdit also needs to cancel inputs...
    // extendedCard.nextElementSibling.classList.remove('displayEdit');
}
let edit = true;
const editToggle = () => {
    edit = !edit;
}
const editFn = (input) => {
    let toDo = input.parentElement.parentElement;
    if (edit == true) {
    // expand form
        extendCard(toDo);
        expand = false;
    // change title and notes into inputs
        let titleDiv = toDo.children[0].children[1];
        editDisplayInput(titleDiv);
        let notesDiv = toDo.children[1].children[0];
        editDisplayInput(notesDiv);
    } else if (edit == false) {
        cancelEditFn(toDo);
    }
    editToggle();
    expandToggle();
}
const extendCard = (cardDiv) => {
    cardDiv.classList.add('cardEdit');
    cardDiv.children[1].style.display = "block";
    cardDiv.children[2].classList.add('displayEdit');
}
const minimizeCard = (cardDiv) => {
    cardDiv.classList.remove('cardEdit');
    cardDiv.children[1].style.display = "none";
    cardDiv.children[2].classList.remove('displayEdit');
}
const editDisplayInput = (container) => {
    container.children[0].style.display = "none";
    container.children[1].style.display = "block";
    container.children[2].style.display = "block";
}
// populate inputs with current object data!

const editHideInput = (container) => {
    container.children[0].style.display = "flex";
    container.children[1].style.display = "none";
    container.children[2].style.display = "none";
}
// cancel edit button
// clear inputs, change title and notes input to display, card to regular size
const cancelEditFn = (cardDiv) => {
    clearEditInputs(cardDiv);
    editHideInput(cardDiv.children[0].children[1]);
    editHideInput(cardDiv.children[1].children[0]);
    minimizeCard(cardDiv);
}
const clearEditInputs = (cardDiv) => {
    let inputArray = Array.from(cardDiv.querySelectorAll('input'));
    for (i=0; i<inputArray.length; i++) {
        inputArray[i].value = null;
    }
}
// for submit
// take inputs and modify object
// with updated object, update ToDo display
// how to identify object and key?
//
const editGetInput = (input) => {
    let userInput = input.select();
    return userInput;
}
const editUpdateObject = (object, key, input) => {
    object[`${key}`] = input;
}
const deleteFn = (input) => {
    console.log('delete');
    removeCardListeners(input);
    let toDo = input.parentElement.parentElement;
    // needs access to "body" !!
    body.removeChild(toDo);
}
const priorityFn = (cardDiv) => {
    let priorityBtns = Array.from(cardDiv.querySelector('input[type="radio'));
    let selection = radioSelection(priorityBtns);
    return selection;
}
// find and return the "checked" radio button
const radioSelection = (input) => {
    for (i=0; i<input.length; i++) {
        if (input[i].checked) {
            return input[i];
        }
    }
}
const removeCardListeners = (input) => {
    input.removeEventListener('click', () => {
        checkboxFn(input);
    })
    input.removeEventListener('click', () => {
        expandFn(input);
    })
    input.removeEventListener('click', () => {
        editFn(input);
    })
    input.removeEventListener('click', () => {
        deleteFn(input);
    })
}

// create ToDo
const createCard = (object) => {
    let card;
    let checked;
    let expandCard;
    let editCard;
    let deleteCard;
    const makeCard = (object) => {
        card = createElement('div', {"class": "card"});
        const regularSize = createElement('div', {"class": "regularSize"});
        const extendedSize = createElement('div', {"class": "extendedSize"});
        const editSize = createElement('div', {"class": "editSize"});
        checked = createElement('input', {"type": "checkbox", "class": "checkbox", 'aria-label': "Checkbox"});
        const titleContainer = createElement('div', {"class": "titleContainer"})
        const title = createElement('div', {"class": "title"});
        title.textContent = `${object.title}`;
        const titleEditLabel = createElement('label', {"for": "titleEdit", "class": "hideTitleEdit"});
        titleEditLabel.textContent = "Title:";
        const titleEditInput = createElement('input', {"type": "text", "class": "hideTitleEdit", "id": "titleEdit"});
        const spacerDiv = createElement('div', {"class": "spacerDiv"});
        const priority = createElement('div', {"class": "priority", "id": `${object.priority}`});
        priority.textContent = `${object.priority}`;
        expandCard = createElement('button', {"id": "expand", "class": "expand", "aria-label": "Expand Card"});
        const date = createElement('div', {"class": "date"});
        date.textContent = `${object.dueDate}`;
        editCard = createElement('button', {"class": "editCard", "aria-label": "Edit Card"});
        deleteCard = createElement('button', {"class": "deleteCard", "aria-label": "Delete Card"});
        const notesContainer = createElement('div', {"class": "notesContainer"});
        const notes = createElement('div', {"class": "notes"});
        notes.textContent = `Notes: ${object.notes}`;
        const notesEditLabel = createElement('label', {"for": "notesEdit"});
        notesEditLabel.textContent = "Notes:";
        const notesEditInput = createElement('input', {"type": "textarea", "id": "notesEdit"});
        const projectTag = createElement('div', {'class': 'projectTag'});
        if (object.project != "") {
            projectTag.textContent = `Project: ${object.project}`;
        }
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
        const submitEditContainer = createElement('div', {"class": "submitContainer"});
        const cancelEditBtn = createElement('button', {"class": "cancelEditBtn", "aria-label": "Cancel Edit"});
        cancelEditBtn.textContent = "Cancel";
        const submitEditBtn = createElement('button', {"class": "submitEditBtn", "aria-label": "Submit Edit"})
        submitEditBtn.textContent = "Submit";
        card.appendChild(regularSize);
        regularSize.appendChild(checked);
        regularSize.appendChild(titleContainer);
        titleContainer.appendChild(title);
        titleContainer.appendChild(titleEditLabel);
        titleContainer.appendChild(titleEditInput);
        regularSize.appendChild(spacerDiv);
        regularSize.appendChild(priority);
        regularSize.appendChild(expandCard);
        regularSize.appendChild(date);
        regularSize.appendChild(editCard);
        regularSize.appendChild(deleteCard);
        card.appendChild(extendedSize);
        extendedSize.appendChild(notesContainer);
        notesContainer.appendChild(notes);
        notesContainer.appendChild(notesEditLabel);
        notesContainer.appendChild(notesEditInput);
        extendedSize.appendChild(projectTag);
        card.appendChild(editSize);
        editSize.appendChild(priorityEditContainer);
        priorityEditContainer.appendChild(priorityEditTitle);
        priorityEditContainer.appendChild(priorityEditLow);
        priorityEditContainer.appendChild(priorityEditLowLabel);
        priorityEditContainer.appendChild(priorityEditMed);
        priorityEditContainer.appendChild(priorityEditMedLabel);
        priorityEditContainer.appendChild(priorityEditHigh);
        priorityEditContainer.appendChild(priorityEditHighLabel);
        priorityEditContainer.appendChild(priorityEditDefcon);
        priorityEditContainer.appendChild(priorityEditDefconLabel);
        editSize.appendChild(submitEditContainer);
        submitEditContainer.appendChild(cancelEditBtn);
        submitEditContainer.appendChild(submitEditBtn);
        return card;
    }
    let createdCard = makeCard(object);
    // const addListeners = () => {
        // checkbox
        checked.addEventListener('click', () => {
            checkboxFn(checked);
        });
        // expand ToDo
        expandCard.addEventListener('click', () => {
            expandFn(expandCard);
        })
        // edit ToDo
        editCard.addEventListener('click', () => {
            editFn(editCard);
        })
        // delete ToDo
        deleteCard.addEventListener('click', () => {
            deleteFn(deleteCard);
        })
        // priority level (radio buttons)
        let priorityBtns = Array.from(card.querySelectorAll('input[type="radio"]'));
        console.log(priorityBtns);
        priorityBtns.forEach(index => {
            index.addEventListener('click', () => {
                priorityFn(card);
            })
        })
    // }
    body.appendChild(createdCard);
}
createCard(first);
// body.appendChild(createCard(first));
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
