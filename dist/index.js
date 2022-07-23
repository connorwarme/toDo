const noteFactory = (title, project, priority, dueDate, notes, checked) => {
    this.properties = ["title", "project", "priority", "dueDate", "notes", "checked"];
    return { title, project, priority, dueDate, notes, checked, properties }
}
let first = noteFactory('update README', 'winning', 'High', '07/14/22', 'kinda like the other dudes', false);
let second = noteFactory('doing it', "dudeage", "High", "", "all the time", false);
let body = document.querySelector('div.body');

const objectArray = [];

const addToObjectArray = (project, object) => {
    let x = Object.keys(project).length;
    project[x] = object;
}
addToObjectArray(objectArray, first);
addToObjectArray(objectArray, second);

const projectArray = [];

// this is going to need a sort function to weed out "" (empty) projects and the like. !!!
const addToProjectArray = (array) => {
    array.forEach(index => {
        projectArray.push(index.project);
    })
}
addToProjectArray(objectArray);

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
// To-Do card button listener functions
// get card and toggle class
// might need update - to check object.checked / then to update it !!!
const checkboxFn = (input) => {
    input.parentElement.parentElement.classList.toggle('completedToDo');
    updateObjectCheck(input);
}
let expand = false;
const expandToggle = () => {
    expand = !expand;
}
// expand card
// or, if it's expanded already, minimize card
const expandFn = (input) => {
    let extendedCard = input.parentElement.nextElementSibling;
    if (expand == false) {
    extendedCard.style.display = "flex";
    } else {
        extendedCard.style.display = "none";
        if (edit == false) {
            resetCard(extendedCard.parentElement);
            editToggle();
        }
    }
    expandToggle();
}
let edit = true;
const editToggle = () => {
    edit = !edit;
}
// edit card
const editFn = (input) => {
    let toDoCard = input.parentElement.parentElement;
    if (edit == true) {
    // expand form
        extendCard(toDoCard);
        expand = false;
    // change title and notes into inputs
        let titleDiv = toDoCard.children[0].children[1];
        editDisplayInput(titleDiv);
        let notesDiv = toDoCard.children[1].children[0];
        editDisplayInput(notesDiv);
    // project input
        projectDisplayInput(toDoCard);
    // populate the input fields with current object data... needs object as argument !!!
    // could potentially group these in a seperate fn to try and clean up this editFn
    // needs object passed as argument...need to figure that out!
        editPopulateInput(toDoCard, first);
        let optionsArray = projectPopulateInput(projectArray, toDoCard);
        projectMarkSelected(optionsArray, second);
        editCurrentRadioSelection(toDoCard, first);
    } else if (edit == false) {
        resetCard(toDoCard);
    }
    editToggle();
    expandToggle();
}
// card expanded to allow edits
const extendCard = (cardDiv) => {
    cardDiv.classList.add('cardEdit');
    cardDiv.children[1].style.display = "flex";
    cardDiv.children[2].classList.add('displayEdit');
}
// card minimized, hide notes & project, priority buttons and cancel/submit
const minimizeCard = (cardDiv) => {
    cardDiv.classList.remove('cardEdit');
    cardDiv.children[1].style.display = "none";
    cardDiv.children[2].classList.remove('displayEdit');
}
// switch from text display to input fields
// is it possible/advantageous to change this into a fn that works for each of these (title, notes, priority, date, project). first argument = (exact element needing to be acted upon), second arg = (what should happen to it)..? !!!
const editDisplayInput = (containerDiv) => {
    containerDiv.children[0].style.display = "none";
    containerDiv.children[1].style.display = "block";
    containerDiv.children[2].style.display = "block";
}
// populate inputs with current object data
const editPopulateInput = (cardDiv, object) =>  {
    let currentTitle = cardDiv.querySelector('input.titleEdit');
    currentTitle.value = object.title;
    let currentNotes = cardDiv.querySelector('input#notesEdit');
    currentNotes.value = object.notes; 
}
// other option, both need access to DOM and object
// so I have to pass title and object.title for it to work...
// const editPopulateInput = (inputDOM, value) => {
//     inputDOM.value = value;
// }
// switch from input fields to text display
const editHideInput = (containerDiv) => {
    containerDiv.children[0].style.display = "flex";
    containerDiv.children[1].style.display = "none";
    containerDiv.children[2].style.display = "none";
}
// cancel edit button
const cancelEditFn = (cardDiv) => {
    resetCard(cardDiv);
    edit = true;
    expand = true;
    // needs to be updated to be able to receive other objects (?)
}
// reset: clears inputs, hides them, displays text, minimizes card to normal size
const resetCard = (cardDiv) => {
    clearEditInputs(cardDiv);
    editHideInput(cardDiv.children[0].children[1]);
    editHideInput(cardDiv.children[1].children[0]);
    projectHideInput(cardDiv);
    minimizeCard(cardDiv);
}
// clears edits from input sources
const clearEditInputs = (cardDiv) => {
    clearTextInputs(cardDiv);
    clearRadioSelection(cardDiv);
    projectClearOptions(cardDiv);
}
const clearTextInputs = (cardDiv) => {
    cardDiv.children[0].children[1].children[2].value = null;
    cardDiv.children[1].children[0].children[2].value = null;
}
// for submit
// gather inputs, update object, update To-Do card display
const submitEditFn = (cardDiv, object) => {
    let inputArray = submitGetInput(cardDiv);
    updateObject(object, inputArray);
    submitDisplayInput(cardDiv, inputArray);
    cancelEditFn(cardDiv);
}
// updates card display
const submitDisplayInput = (cardDiv, array) => {
    let titleText = cardDiv.children[0].children[1].children[0];
    titleText.textContent = array[0];
    let notesText = cardDiv.children[1].children[0].children[0];
    notesText.textContent = array[4];
    let priorityText = cardDiv.children[0].children[3];
    priorityText.textContent = array[2];
    let projectText = cardDiv.children[1].children[1].children[0];
    projectText.textContent = array[1];
}
// collect input values, returns array (indexes mimic position in object)
// needs updating - project, date, checked !!!
const submitGetInput = (cardDiv) => {
    let titleInput = cardDiv.children[0].children[1].children[2].value;
    let notesInput = cardDiv.children[1].children[0].children[2].value;
    let priorityInput = radioSelection(btns).value;
    let projectInput = `Project: ${projectGetInput(cardDiv)}`;
    let array = [titleInput, projectInput, priorityInput, "", notesInput, ""];
    return array;
}
// not using...do I need this? !!!
// const editUpdateObject = (object, key, input) => {
//     object[`${key}`] = input;
// }
// deletes To-Do card
// should run a function to delete object too? !!! or to remove it from array of objects?
const deleteFn = (input) => {
    console.log('delete');
    removeCardListeners(input);
    let toDoCard = input.parentElement.parentElement;
    // needs access to "body" !!!
    body.removeChild(toDoCard);
}
// finds/returns selected priority level
const priorityFn = (cardDiv) => {
    let priorityBtns = Array.from(cardDiv.querySelector('input[type="radio'));
    let selection = radioSelection(priorityBtns);
    return selection;
}
// clear radio selection
const clearRadioSelection = (cardDiv) => {
    let priorityBtns = Array.from(cardDiv.querySelectorAll('input[type="radio"]'));
    for (i=0; i<priorityBtns.length; i++) {
        priorityBtns[i].checked = false;
    }
}
// not sure about this: editCurrentRadioSelection returns the btn (need condition...if btn == null, don't worry about it);
// display the current selection (in edit mode)
const editCurrentRadioSelection = (cardDiv, object) => {
    let priorityBtns = Array.from(cardDiv.querySelectorAll('input[type="radio"]'));
    let btn = priorityBtns.find(index => {
        return index.value === object.priority;
    });
    btn.checked = "checked";
    // this also works, tried to improve it by using array methods... can delete later
    // for (i=0; i<priorityBtns.length; i++) {
    //     if (priorityBtns[i].value == object.priority) {
    //         priorityBtns[i].checked = "checked";
    //         btn = priorityBtns[i];
    //     }
    // }
    return btn;
}
// find and return the "checked" radio button aka selected priority level
const radioSelection = (input) => {
    for (i=0; i<input.length; i++) {
        if (input[i].checked) {
            return input[i];
        }
    }
}
// project input
// -> populate display, clear input, gather input
// -> do dropdown? w/ option to add?
// -> or text input, and run a check to see if project already exists. if not, pop-up suggesting creating one..?
const projectHideInput = (cardDiv) => {
    cardDiv.children[1].children[1].children[0].style.display = "block";
    cardDiv.children[1].children[1].children[1].style.display = "none";
    cardDiv.children[1].children[1].children[2].style.display = "none";
    cardDiv.children[1].children[1].children[3].style.display = "none";
    cardDiv.children[1].children[1].children[4].style.display = "none";
}
const projectDisplayInput = (cardDiv) => {
    cardDiv.children[1].children[1].children[0].style.display = "none";
    cardDiv.children[1].children[1].children[1].style.display = "block";
    cardDiv.children[1].children[1].children[2].style.display = "block";
    cardDiv.children[1].children[1].children[3].style.display = "block";
}
// might want to separate forEach fn on its own... !!!
// another fn to find object.property value and to select it (set "option.selected = true")
const projectPopulateInput = (array, cardDiv) => {
    let select = cardDiv.children[1].children[1].children[2];
    let optionsArray = [];
    array.forEach(index => {
        let option = createElement('option', {"value": `${index}`});
        option.textContent = `${index}`;
        select.appendChild(option);
        optionsArray.push(option);
    })
    return optionsArray;
}
const projectMarkSelected = (array, object) => {
    let selectedProject = object.project;
    console.log(selectedProject);
    console.log(array);
    let selectedOption = array.find(index => {
        return index.value === selectedProject;
    });
    selectedOption.selected = true;
}
// project clear input (for cancel button)
const projectClearOptions = (cardDiv) => {
    let select = cardDiv.children[1].children[1].children[2];
    let optionsArray = Array.from(select.children);
    optionsArray.forEach(index => {
        select.removeChild(index);
    })
}
// project gather input (for submit button)
// returns project name
const projectGetInput = (cardDiv) => {
    let select = cardDiv.children[1].children[1].children[2];
    let optionsArray = Array.from(select.children);
    let selection = optionsArray.find(index => {
        return index.selected === true;
    })
    return selection.value;
}
// project: add project to the dropdown list
// click + button, display input field and cancel and save buttons
// cancel - clears the input field, hides display of input, cancel, save
// save - gathers input, adds project to array, hides display^^, reruns creating dropdown menu (with the new addition)
//
const projectAddBtnFn = (cardDiv) => {
    cardDiv.children[1].children[1].children[3].style.display = "none";
    cardDiv.children[1].children[1].children[4].style.display = "block";
}
const projectAddInputFn = (cardDiv) => {
    let project = cardDiv.children[1].children[1].children[4].children[0].value;
    // push project into projectArray
    projectArray.push(project);
}
// clear input field value; show "add new project" button; hide input, cancel, and save.
const projectAddCancelFn = (cardDiv) => {
    cardDiv.children[1].children[1].children[4].children[0].value = "";
    cardDiv.children[1].children[1].children[3].style.display = "block";
    cardDiv.children[1].children[1].children[4].style.display = "none";
}
const projectAddSaveFn = (cardDiv) => {
    projectAddInputFn(cardDiv);
    // reset display
    projectAddCancelFn(cardDiv);
    // remove and recreate dropdown menu
    projectClearOptions(cardDiv);
    // these need the project array and the object of the card !!!
    let optionsArray = projectPopulateInput(projectArray, cardDiv);
    projectMarkSelected(optionsArray, second);
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
// object operations
const updateObject = (object, array) => {
    for (i=0; i<array.length; i++) {
        object[object.properties[i]] = array[i];
    }
}
const updateObjectCheck = (input) => {
    let object = getObject(x);
    if (input.checked) {
        object.checked = true;
    } else {
        object.checked = false;
    }
}
// needs updating once I have multiple objects... !!!
// needs to be passed the project as well..? or should it just sort through the main array of objects?
const getObject = (cardDiv) => {
    let theTitle = cardDiv.children[0].children[1].children[0].textContent;
    let object = objectArray.find(index => {
        return index.title === theTitle;
    });
    // this works, but tried using find instead...can delete later 
    // for (i=0; i<objectArray.length; i++) {
    //     if (objectArray[i].title == title) {
    //         object = objectArray[i];
    //     }
    // }
    return object;
}

// create To-Do
const createCard = (object) => {
    let card;
    let checked;
    let expandCard;
    let editCard;
    let deleteCard;
    let cancelEditBtn;
    let submitEditBtn;
    const makeCard = (object) => {
        card = createElement('div', {"class": "card"});
        const regularSize = createElement('div', {"class": "regularSize"});
        const extendedSize = createElement('div', {"class": "extendedSize"});
        const editSize = createElement('div', {"class": "editSize"});
        checked = createElement('input', {"type": "checkbox", "class": "checkbox", 'aria-label': "Checkbox"});
        const titleContainer = createElement('div', {"class": "titleContainer"})
        const title = createElement('div', {"class": "title"});
        title.textContent = `${object.title}`;
        const titleEditLabel = createElement('label', {"for": "titleEdit", "class": "titleEdit"});
        titleEditLabel.textContent = "Title:";
        const titleEditInput = createElement('input', {"type": "text", "class": "titleEdit", "id": "titleEdit"});
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
        const projectContainer = createElement('div', {'class': 'projectContainer'});
        const projectText = createElement('div', {"class": "projectText"});
        if (object.project != "") {
            projectText.textContent = `Project: ${object.project}`;
        }
        const projectEditLabel = createElement('label', {"class": "projectEditLabel", "for": "projectDropdown"});
        const projectSelect = createElement('select', {"class": "projectSelect", "id": "projectDropdown"});
        const projectAdd = createElement('button', {"class": "projectAddBtn", "aria-label": "Add Project"});
        const projectAddContainer = createElement('div', {"class": "projectAddContainer"});
        const projectAddInput = createElement('input', {"type": "text", "class": "projectAddInput", "aria-label": "Add New Project"});
        const projectAddCancel = createElement('button', {"class": "projectAddCancel", "aria-label": "Cancel"});
        const projectAddSave = createElement('button', {"class": "projectAddSave"});
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
        cancelEditBtn = createElement('button', {"class": "cancelEditBtn", "aria-label": "Cancel Edit"});
        cancelEditBtn.textContent = "Cancel";
        submitEditBtn = createElement('button', {"class": "submitEditBtn", "aria-label": "Submit Edit"})
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
        extendedSize.appendChild(projectContainer);
        projectContainer.appendChild(projectText);
        projectContainer.appendChild(projectEditLabel);
        projectContainer.appendChild(projectSelect);
        projectContainer.appendChild(projectAdd);
        projectContainer.appendChild(projectAddContainer);
        projectAddContainer.appendChild(projectAddInput);
        projectAddContainer.appendChild(projectAddCancel);
        projectAddContainer.appendChild(projectAddSave);
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
        let priorityBtns = Array.from(createdCard.querySelectorAll('input[type="radio"]'));
        console.log(priorityBtns);
        priorityBtns.forEach(index => {
            index.addEventListener('click', () => {
                priorityFn(createdCard);
            })
        })
        // cancel
        cancelEditBtn.addEventListener('click', () => {
            cancelEditFn(createdCard);
        })
        // submit -> needs to have the object as an argument !!! needs updating !!!
        submitEditBtn.addEventListener('click', () => {
            submitEditFn(createdCard, first);
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
let x = document.querySelector('div.card');
let btns = Array.from(x.querySelectorAll('input[type="radio"]'));