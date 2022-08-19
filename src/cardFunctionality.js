import { createElement } from "./utility";
import { objectOps } from "./objectOps";
import { ls } from "./localStorage";
import { format, parseISO, parse } from "date-fns";
import { navbar } from "./navbar";

// "to-do" card functionality
// checkbox: get card and toggle class
// -> update object.checked
const checkboxFn = (input) => {
    input.classList.toggle('checked');
    input.parentElement.parentElement.classList.toggle('completedToDo');
    objectOps.updateCheck(input);
}
// expand card: reveal notes and project
// -> or, if it's expanded already, minimize card
// -> or, if it's in edit mode, cancel edit and minimize card
const expand = (() => {
    const mainFn = (input) => {
        let extendedCard = input.parentElement.nextElementSibling;
        let object = objectOps.getObject(extendedCard.parentElement);
        if (object.expanded == false) {
            extendedCard.style.display = "flex";
            object.expanded = true;
        } else {
            extendedCard.style.display = "none";
            object.expanded = false;
            if (object.editable == false) {
                edit.cancelEditFnLite(extendedCard.parentElement)
            }
        }
    }
    return { mainFn }
})();

// edit card: go into edit mode (reveal input fields)
// -> or, if it's in edit mode, cancel edit and go back to regular view
const edit = (() => {
    const mainFn = (input) => {
        let toDoCard = input.parentElement.parentElement;
        let object = objectOps.getObject(toDoCard);
        if (object.editable == true) {
            // expand form
            editableCard(toDoCard);
            object.expanded = true;
            object.editable = false;
            // display input fields
            displayInputs(toDoCard);
            // populate the input fields with current object data
            populateInput(toDoCard, object);
        } else if (object.editable == false) {
            resetCard(toDoCard);
            object.expanded = false;
            object.editable = true;
        }
    }
    // card expanded into edit mode
    const editableCard = (cardDiv) => {
        cardDiv.classList.add('cardEdit');
        cardDiv.children[1].style.display = "flex";
        cardDiv.children[2].classList.add('displayEdit');
    }
    // card minimized: hide notes & project, priority buttons and cancel/submit
    const minimizeCard = (cardDiv) => {
        cardDiv.classList.remove('cardEdit');
        cardDiv.children[1].style.display = "none";
        cardDiv.children[2].classList.remove('displayEdit');
    }
    // switch from text display to input fields
    const _displayInput = (containerDiv) => {
        containerDiv.children[0].style.display = "none";
        containerDiv.children[1].style.display = "block";
        containerDiv.children[2].style.display = "block";
    }
    const displayInputs = (cardDiv) => {
        // change title and notes into inputs
        let titleDiv = cardDiv.children[0].children[1];
        _displayInput(titleDiv);
        let notesDiv = cardDiv.children[1].children[0];
        _displayInput(notesDiv);
        // display date input
        date.displayInput(cardDiv);
        // display project input (dropdown)
        project.displayInput(cardDiv); 
    }
    // populate inputs with current object data
    const populateInput = (cardDiv, object) =>  {
        let currentTitle = cardDiv.querySelector('input.titleEdit');
        currentTitle.value = object.title;
        let currentNotes = cardDiv.querySelector('textarea#notesEdit');
        currentNotes.value = object.notes;
        let optionsArray = project.populateInput(objectOps.projectArray, cardDiv);
        project.markSelected(optionsArray, object);
        priority.editCurrentSelection(cardDiv, object);
        date.populateInput(cardDiv, object); 
    }
    // switch from input fields to text display
    const _hideInput = (containerDiv) => {
        containerDiv.children[0].style.display = "flex";
        containerDiv.children[1].style.display = "none";
        containerDiv.children[2].style.display = "none";
    }
    // cancel edit button functionality
    // -> if the object hasn't been given a title, delete card & object 
    // -> (i.e. when user clicked to add new card, then decided to cancel)
    const cancelEditFn = (cardDiv) => {
        let object = objectOps.getObject(cardDiv);
        if (object.title == "") {
            deleteFn.mainFn(cardDiv.children[0].lastChild);
        } else {
        resetCard(cardDiv);
        object.editable = true;
        object.expanded = false;
        }
    }
    const cancelEditFnLite = (cardDiv) => {
        let object = objectOps.getObject(cardDiv);
        resetCard(cardDiv);
        object.editable = true;
        object.expanded = false;
    }
    // reset: clears inputs, hides them, displays text, minimizes card to normal size
    const resetCard = (cardDiv) => {
        _clearInputs(cardDiv);
        _hideInput(cardDiv.children[0].children[1]);
        _hideInput(cardDiv.children[1].children[0]);
        project.hideInput(cardDiv);
        date.hideInput(cardDiv);
        minimizeCard(cardDiv);
    }
    // clears values from input fields
    const _clearInputs = (cardDiv) => {
        clearTextInputs(cardDiv);
        priority.clearSelection(cardDiv);
        project.clearOptions(cardDiv);
        date.clearInput(cardDiv);
    }
    const clearTextInputs = (cardDiv) => {
        cardDiv.children[0].children[1].children[2].value = null;
        cardDiv.children[1].children[0].children[2].value = null;
    }
    return { mainFn, resetCard, populateInput, cancelEditFn, cancelEditFnLite  }
})();
// submit
const submit = (() => {
    // gather inputs, update object, update To-Do card display
    const mainFn = (cardDiv, object) => {
        // check if user added new project but didn't save it yet
        project.checkProjListing(cardDiv, object);
        // get new input values
        let btns = Array.from(cardDiv.querySelectorAll('input[type="radio"]'));
        let inputArray = _getInput(cardDiv, btns);
        console.log(inputArray);
        // update the object with new values
        let index = objectOps.getObjIndex(cardDiv);
        objectOps.update(object, inputArray, index);
        console.log(objectOps.objectArray);
        // display the new values on to-do card
        _displayInput(cardDiv, inputArray);
        // change card out of edit/input mode
        edit.cancelEditFn(cardDiv);
    }
    // updates card display
    const _displayInput = (cardDiv, array) => {
        let titleText = cardDiv.children[0].children[1].children[0];
        titleText.textContent = array[0];
        let notesText = cardDiv.children[1].children[0].children[0];
        notesText.textContent = _emptyInputCheck(array[4], 'Notes');
        let priorityText = cardDiv.children[0].children[3];
        priority.updateDisplay(priorityText, array[2]);
        priorityText.textContent = array[2];
        let projectText = cardDiv.children[1].children[1].children[0];
        projectText.textContent = _emptyInputCheck(array[1], 'Project');
        let dateText = cardDiv.children[0].children[4].children[0];
        dateText.textContent = array[3];
    }
    // if input value is empty, return "none" for text display
    const _emptyInputCheck = (input, section) => {
        if (input == false || input == "" || input == undefined) {
            return `${section}: none`;
        } else {
            return `${section}: ${input}`;
        }
    }
    // collect input values, returns array (indexes mimic position in object)
    const _getInput = (cardDiv, btnsArray) => {
        let titleInput = cardDiv.children[0].children[1].children[2].value;
        let notesInput = cardDiv.children[1].children[0].children[2].value;
        // recent.edit
        let priorityInput = priority.currentSelection(btnsArray)
        if (priorityInput != "") {
            priorityInput = priorityInput.value;
        };
        let projectInput = project.getInput(cardDiv);
        let dateInput = date.getInput(cardDiv);
        let array = [titleInput, projectInput, priorityInput, dateInput, notesInput];
        return array;
    }
    return { mainFn };
})();
// delete "to-do" card
const deleteFn = (() => {
    const mainFn = (input) => {
        let toDoCard = input.parentElement.parentElement;
        // remove from arrays (& from local storage)
        let object = objectOps.getObject(toDoCard);
        objectOps.deleteFromProjectArray(object);
        objectOps.deleteFromObjectArray(object);
        // delete display
        deleteDisplay(toDoCard);
    }
    const deleteDisplay = (cardDiv) => {
        // remove listeners
        listeners.removeAll(cardDiv);
        // remove card from parentDiv
        cardDiv.parentElement.removeChild(cardDiv);   
    }
    return { mainFn, deleteDisplay };
})();
// priority level input
const priority = (() => {
    // finds/returns selected priority level
    const mainFn = (cardDiv) => {
        let priorityBtns = Array.from(cardDiv.querySelectorAll('input[type="radio"]'));
        let selection = currentSelection(priorityBtns);
        markLabel(selection, cardDiv);
        return selection;
    }
    // clear radio selection
    const clearSelection = (cardDiv) => {
        let priorityBtns = Array.from(cardDiv.querySelectorAll('input[type="radio"]'));
        for (let i=0; i<priorityBtns.length; i++) {
            priorityBtns[i].checked = false;
        }
    }
    // display the current selection (in edit mode)
    const editCurrentSelection = (cardDiv, object) => {
        let priorityBtns = Array.from(cardDiv.querySelectorAll('input[type="radio"]'));
        let btn;
        if (object.priority != "" && object.priority != undefined) {
            btn = priorityBtns.find(index => {
                return index.value === object.priority;
            });
            btn.checked = "checked";
            markLabel(btn);
        } else {
            btn = "";
        }
        return btn;
    }
    // find and return the "checked" radio button aka selected priority level
    const currentSelection = (input) => {
        let checked = input.find(index => {
            return index.checked;
        })
        if (checked != undefined) {
            return checked;
        } else {
            return "";
        }
    }
    // update the priority display in regular view
    const updateDisplay = (element, value) => {
        element.removeAttribute('class');
        if(!(value == "")) {
            element.classList.add(value);
        } else {
            element.classList.add('none');
        }
    }
    // indicate which radio button is selected
    // -> add 'active' id, which allows for unique styling of that button/label
    const markLabel = (radio) => {
        // clear labels of active class
        let container = radio.parentElement;
        let labels = Array.from(container.querySelectorAll('label'));
        labels.forEach(index => {
            index.removeAttribute('id');
        })
        // put active on checked radio button label
        let checkedLabel = labels.find(index => {
            return index.textContent == radio.value;
        })
        checkedLabel.setAttribute('id', `active${checkedLabel.textContent}`);
    }
    return { mainFn, clearSelection, currentSelection, editCurrentSelection, updateDisplay };
})();

// project input
// -> populate display, clear input, gather input
// -> dropdown, w/ option to add
const project = (() => {
    const hideInput = (cardDiv) => {
        cardDiv.children[1].children[1].children[0].style.display = "block";
        cardDiv.children[1].children[1].children[1].style.display = "none";
        cardDiv.children[1].children[1].children[2].style.display = "none";
        cardDiv.children[1].children[1].children[3].style.display = "none";
        cardDiv.children[1].children[1].children[4].style.display = "none"; 
    }
    const displayInput = (cardDiv) => {
        cardDiv.children[1].children[1].children[0].style.display = "none";
        cardDiv.children[1].children[1].children[1].style.display = "block";
        cardDiv.children[1].children[1].children[2].style.display = "block";
        cardDiv.children[1].children[1].children[3].style.display = "flex";
    }
    // take projectArray and make each project an <option> in dropdown
    const populateInput = (array, cardDiv) => {
        if (array == null || array == undefined) {
            return false;
        } else {
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
    }
    // set the current object.project value as the selected dropdown value
    const markSelected = (array, object) => {
        let selectedOption;
        if (object.project != "") {
            selectedOption = array.find(index => {
                return index.value === object.project;
            });
            selectedOption.selected = true;
        }
    }
    // project: clear dropdown input (for cancel button)
    const clearOptions = (cardDiv) => {
        let select = cardDiv.children[1].children[1].children[2];
        let optionsArray = Array.from(select.children);
        optionsArray.forEach(index => {
            select.removeChild(index);
        })
    }
    // project: gather input (for submit button)
    // -> returns project name
    const getInput = (cardDiv) => {
        let select = cardDiv.children[1].children[1].children[2];
        if (select.children.length > 0) {
            let optionsArray = Array.from(select.children);
            let selection = optionsArray.find(index => {
                return index.selected === true;
            })
            return selection.value;
        } else {
            return false;
        }
    }
    // project: + (add new) button (opens input to add project to the dropdown list)
    // -> click + button, display input field and cancel and save buttons
    // -> cancel: clears the input field, hides display of input, cancel, save
    // -> save: gathers input, adds project to array, hides display^^, reruns creating dropdown menu (with the new addition)
    const addBtnFn = (cardDiv) => {
        cardDiv.children[1].children[1].children[2].style.display = "none";
        cardDiv.children[1].children[1].children[3].style.display = "none";
        cardDiv.children[1].children[1].children[4].style.display = "flex";
        cardDiv.children[1].children[1].children[4].children[0].focus();
    }
    // get input value
    // if it's a new project, add it to projectArray & update current object.project value
    const addInputFn = (cardDiv, object) => {
        let input = cardDiv.children[1].children[1].children[4].children[0].value;
        if (input != "" && !(checkAlreadyInArray(input))) {
            objectOps.addSingleToProjectArray(input);
            objectOps.updateSingle(object, `project`, input);
            return true;
        } else {
            return false;
        }
    }
    // check if a project already exists in projectArray
    // (don't want duplicates in the array)
    const checkAlreadyInArray = (input) => {
        let already = objectOps.projectArray.find(index => {
            return index == input;
        });
        if (already == undefined) {
            return false;
        } else {
            return true;
        }
    }
    // clear input field value; show "add new project" button; hide input, cancel, and save
    const addCancelFn = (cardDiv) => {
        cardDiv.children[1].children[1].children[4].children[0].value = "";
        cardDiv.children[1].children[1].children[2].style.display = "block";
        cardDiv.children[1].children[1].children[3].style.display = "flex";
        cardDiv.children[1].children[1].children[4].style.display = "none";
    }
    // save new project button
    const addSaveFn = (cardDiv, object) => {
        // add new project
        addInputFn(cardDiv, object)
        // add to navbar
        navbar.newProject(object.project);
        // reset display
        addCancelFn(cardDiv);
        // remove and recreate dropdown menu, selecting object.project value
        clearOptions(cardDiv);
        let optionsArray = populateInput(objectOps.projectArray, cardDiv);
        markSelected(optionsArray, object);
    }
    // check if user added a project (but didn't click to save it yet)
    // note: this fn got complicated, as it has to deal with multiple scenarios:
    // 1) an empty "new project" input field
    // 2) an unsaved "new project" input value
    // 3) an input value that matches an existing project
    // then reset the display for the project section
    const checkProjListing = (cardDiv, object) => {
        let input = cardDiv.children[1].children[1].children[4].children[0];
        // if input is empty, bail out
        if (input.value == "") {
            return false;
        }
        // if input isn't empty and the project doesn't exist in projectArray
        // add it to projArray, update the object, add project to navbar
        let already = checkAlreadyInArray(input.value);
        if (input.value != "" && already == false) {
            objectOps.addSingleToProjectArray(input.value);
            objectOps.updateSingle(object, `project`, input.value);
            navbar.newProject(object.project);
            }
        // if already in projectArray, update object with this project value
        if (already == true) {
            objectOps.updateSingle(object, `project`, input.value);
            }
        // reset the "to-do" card's project section
        addCancelFn(cardDiv);
        clearOptions(cardDiv);
        let optionsArray = populateInput(objectOps.projectArray, cardDiv);
        markSelected(optionsArray, object);
    }
    return { hideInput, displayInput, populateInput, getInput, markSelected, addBtnFn, addCancelFn, clearOptions, addSaveFn, checkProjListing }
})();

// date functionality
const date = (() => {
    // regular view: text display (no input field)
    const hideInput = (cardDiv) => {
        cardDiv.children[0].children[4].children[0].style.display = "block";
        cardDiv.children[0].children[4].children[1].style.display = "none";
        cardDiv.children[0].children[4].children[2].style.display = "none";
    }
    // edit mode: input field (no text display)
    const displayInput = (cardDiv) => {
        cardDiv.children[0].children[4].children[0].style.display = "none";
        cardDiv.children[0].children[4].children[1].style.display = "block";
        cardDiv.children[0].children[4].children[2].style.display = "block";
    }
    const clearInput = (cardDiv) => {
        cardDiv.children[0].children[4].children[2].value = "";
    }
    // get value from input field, format it
    const getInput = (cardDiv) => {
        let input = cardDiv.children[0].children[4].children[2].value;
        if (input != "") {
            let date = format(parseISO(input), 'MM/dd/yyyy');
            return date;
        } else {
            return input;
        }
    }
    // when user goes to edit "to-do", show current due date on input
    const populateInput = (cardDiv, object) => {
        let input = cardDiv.children[0].children[4].children[2];
        if (object.dueDate != "") {
            let currentDate = format(parse(object.dueDate, 'MM/dd/yyyy', new Date()), 'yyyy-MM-dd');
            input.value = currentDate;
        }
    }
    return { hideInput, displayInput, clearInput, getInput, populateInput}
})();

const listeners = (() => {
    const elementsArray = [];
    // note: I can't remember why I had to implement the following method, 
    // utilizing the elementsArray for removeEventListener functions
    // I remember troubleshooting for a long while, and this works (I think?)
    // I think it had to do with making sure that I was removing listeners from the same DOM items
    // i.e. to make sure it was the same card (removing the listeners from the same DOM items that had received listeners via "addAll" on that card)
    // I don't think I explained that well...
    // ..basically each card has a "listeners.removeAll" fn that will remove the listeners from that card's buttons
    function addAll (checkboxBtn, expandBtn, editBtn, deleteBtn, projAddBtn, projAddCancelBtn, projAddSaveBtn, cancelEditBtn, submitEditBtn, cardDiv, object) {
        for (let i = 0; i<arguments.length; i++) {
            elementsArray.push(arguments[i]);
        }
        // checkbox
        checkboxBtn.addEventListener('click', () => {
            checkboxFn(checkboxBtn);
        })
        // expand ToDo
        expandBtn.addEventListener('click', () => {
            expand.mainFn(expandBtn);
        })
        // edit ToDo
        editBtn.addEventListener('click', () => {
            edit.mainFn(editBtn);
        })
        // delete ToDo
        deleteBtn.addEventListener('click', () => {
            deleteFn.mainFn(deleteBtn);
        })
        // priority level (radio buttons)
        let priorityBtns = Array.from(cardDiv.querySelectorAll('input[type="radio"]'));
        priorityBtns.forEach(index => {
            index.addEventListener('click', () => {
                priority.mainFn(cardDiv);
            })
        })
        // add project
        projAddBtn.addEventListener('click', () => {
            project.addBtnFn(cardDiv);
        })
        // cancel adding project
        projAddCancelBtn.addEventListener('click', () => {
            project.addCancelFn(cardDiv);
        })
        // save new project
        projAddSaveBtn.addEventListener('click', () => {
            project.addSaveFn(cardDiv, object);
        })
        // cancel
        cancelEditBtn.addEventListener('click', () => {
            edit.cancelEditFn(cardDiv);
        })
        // submit -> needs to have the object as an argument !!! needs updating !!!
        submitEditBtn.addEventListener('click', () => {
            submit.mainFn(cardDiv, object);
        })
    }
    // remove all listeners (used when deleting the card);
    const removeAll = () => {
        elementsArray[0].removeEventListener('click', () => {
            checkboxFn(elementsArray[0]);
        })
        elementsArray[1].removeEventListener('click', () => {
            expand.mainFn(elementsArray[1]);
        })
        elementsArray[2].removeEventListener('click', () => {
            edit.mainFn(elementsArray[2]);
        })
        elementsArray[3].removeEventListener('click', () => {
            deleteFn.mainFn(elementsArray[3]);
        })
        let priorityBtns = Array.from(elementsArray[9].querySelectorAll('input[type="radio"]'));
        priorityBtns.forEach(index => {
            index.removeEventListener('click', () => {
                priority.mainFn(elementsArray[9]);
            })
        })
        elementsArray[4].removeEventListener('click', () => {
            project.addBtnFn(elementsArray[9]);
        })
        elementsArray[5].removeEventListener('click', () => {
            project.addCancelFn(elementsArray[9]);
        })
        elementsArray[6].removeEventListener('click', () => {
            project.addSaveFn(elementsArray[9], elementsArray[10]);
        })
        elementsArray[7].removeEventListener('click', () => {
            edit.cancelEditFn(elementsArray[9]);
        })
        elementsArray[8].removeEventListener('click', () => {
            submit.mainFn(elementsArray[9], elementsArray[10]);
        })
    }
    return { addAll, removeAll };
})();
export { checkboxFn, listeners, edit, deleteFn };