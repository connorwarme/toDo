import { createElement } from "./utility";
import { objectOps } from "./objectOps";
import { ls } from "./localStorage";
import { format, parseISO, parse } from "date-fns";

// To-Do card button listener functions
// get card and toggle class
// might need update - to check object.checked / then to update it !!!
const checkboxFn = (input) => {
    input.parentElement.parentElement.classList.toggle('completedToDo');
    objectOps.updateCheck(input);
}
const expand = (() => {
    // expand card
    // or, if it's expanded already, minimize card
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

// edit card
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
            // populate the input fields with current object data... needs object as argument !!!
            // needs object passed as argument...need to figure that out!
            populateInput(toDoCard, object);
        } else if (object.editable == false) {
            resetCard(toDoCard);
            object.expanded = false;
            object.editable = true;
        }
    }
    // card expanded to allow edits
    const editableCard = (cardDiv) => {
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
        // project input
        project.displayInput(cardDiv); 
    }
    // populate inputs with current object data
    // have to pass it the projectArray?? !!! regardless, it needs access.
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
    // other option, both need access to DOM and object
    // so I have to pass title and object.title for it to work...
    // const editPopulateInput = (inputDOM, value) => {
    //     inputDOM.value = value;
    // }
    // switch from input fields to text display
    const _hideInput = (containerDiv) => {
        containerDiv.children[0].style.display = "flex";
        containerDiv.children[1].style.display = "none";
        containerDiv.children[2].style.display = "none";
    }
    // cancel edit button
    const cancelEditFn = (cardDiv) => {
        let object = objectOps.getObject(cardDiv);
        if (object.title == "") {
            deleteFn.mainFn(cardDiv.children[0].lastChild);
        } else {
        resetCard(cardDiv);
        object.editable = true;
        object.expanded = false;
        }
        // needs to be updated to be able to receive other objects (?)
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
    // clears edits from input sources
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
// for submit
const submit = (() => {
    // gather inputs, update object, update To-Do card display
    const mainFn = (cardDiv, object) => {
        let btns = Array.from(cardDiv.querySelectorAll('input[type="radio'));
        let inputArray = _getInput(cardDiv, btns);
        objectOps.update(object, inputArray);
        console.log(object);
        _displayInput(cardDiv, inputArray);
        edit.cancelEditFn(cardDiv);
    }
    // updates card display
    const _displayInput = (cardDiv, array) => {
        let titleText = cardDiv.children[0].children[1].children[0];
        titleText.textContent = array[0];
        let notesText = cardDiv.children[1].children[0].children[0];
        notesText.textContent = _emptyInputCheck(array[4], 'Notes');
        let priorityText = cardDiv.children[0].children[3];
        priorityText.textContent = array[2];
        let projectText = cardDiv.children[1].children[1].children[0];
        projectText.textContent = _emptyInputCheck(array[1], 'Project');
        let dateText = cardDiv.children[0].children[5].children[0];
        dateText.textContent = array[3];
    }
    const _emptyInputCheck = (input, section) => {
        let empty = "";
        if (input == false || input == "" || input == undefined) {
            return empty;
        } else {
            return `${section}: ${input}`;
        }
    }
    // collect input values, returns array (indexes mimic position in object)
    // needs updating - project, date, checked !!!
    const _getInput = (cardDiv, btnsArray) => {
        let titleInput = cardDiv.children[0].children[1].children[2].value;
        let notesInput = cardDiv.children[1].children[0].children[2].value;
        let priorityInput = priority.currentSelection(btnsArray).value;
        let projectInput = project.getInput(cardDiv);
        let dateInput = date.getInput(cardDiv);
        let array = [titleInput, projectInput, priorityInput, dateInput, notesInput, ""];
        return array;
    }
    return { mainFn };
})();
// not using...do I need this? !!!
// const editUpdateObject = (object, key, input) => {
//     object[`${key}`] = input;
// }
// deletes To-Do card
// should run a function to delete object too? !!! or to remove it from array of objects?
const deleteFn = (() => {
    const mainFn = (input) => {
        let toDoCard = input.parentElement.parentElement;
        // remove from arrays
        let object = objectOps.getObject(toDoCard);
        objectOps.deleteFromProjectArray(object);
        objectOps.deleteFromObjectArray(object);
        // remove from local storage
        console.log(`deletefn ${objectOps.objectArray} and ${objectOps.projectArray}`);
        // delete display
        deleteDisplay(toDoCard);
    }
    const deleteDisplay = (cardDiv) => {
        // remove listeners
        listeners.removeAll(cardDiv);
        // remove from parentDiv
        cardDiv.parentElement.removeChild(cardDiv);   
    }
    return { mainFn, deleteDisplay };
})();
// priority level input
const priority = (() => {
    // finds/returns selected priority level
    const mainFn = (cardDiv) => {
        let priorityBtns = Array.from(cardDiv.querySelector('input[type="radio'));
        let selection = currentSelection(priorityBtns);
        return selection;
    }
    // clear radio selection
    const clearSelection = (cardDiv) => {
        let priorityBtns = Array.from(cardDiv.querySelectorAll('input[type="radio"]'));
        for (let i=0; i<priorityBtns.length; i++) {
            priorityBtns[i].checked = false;
        }
    }
    // not sure about this: editCurrentSelection returns the btn (need condition...if btn == null, don't worry about it);
    // display the current selection (in edit mode)
    const editCurrentSelection = (cardDiv, object) => {
        let priorityBtns = Array.from(cardDiv.querySelectorAll('input[type="radio"]'));
        let btn;
        if (object.priority != "") {
            btn = priorityBtns.find(index => {
                return index.value === object.priority;
            });
            btn.checked = "checked";
        } else {
            btn = "";
        }
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
    const currentSelection = (input) => {
        let checked = input.find(index => {
            return index.checked;
        })
        // for (let i=0; i<input.length; i++) {
        //     if (input[i].checked) {
        //         return input[i];
        //     }
        // }
        if (checked == undefined) {
            return "";
        } else {
            return checked;
        }
    }
    return { mainFn, clearSelection, currentSelection, editCurrentSelection };
})();

// project input
// -> populate display, clear input, gather input
// -> do dropdown? w/ option to add?
// -> or text input, and run a check to see if project already exists. if not, pop-up suggesting creating one..?
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
        cardDiv.children[1].children[1].children[3].style.display = "block";
    }
    // might want to separate forEach fn on its own... !!!
    // another fn to find object.property value and to select it (set "option.selected = true")
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
    const markSelected = (array, object) => {
        // does this need another check - for when no project is selected? !!!
        let selectedOption;
        if (object.project != "") {
            selectedOption = array.find(index => {
                return index.value === object.project;
            });
            selectedOption.selected = true;
        }
    }
    // project clear input (for cancel button)
    const clearOptions = (cardDiv) => {
        let select = cardDiv.children[1].children[1].children[2];
        let optionsArray = Array.from(select.children);
        optionsArray.forEach(index => {
            select.removeChild(index);
        })
    }
    // project gather input (for submit button)
    // returns project name
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
    // + button: opens input to add project to the dropdown list
    // click + button, display input field and cancel and save buttons
    // cancel - clears the input field, hides display of input, cancel, save
    // save - gathers input, adds project to array, hides display^^, reruns creating dropdown menu (with the new addition)
    const addBtnFn = (cardDiv) => {
        cardDiv.children[1].children[1].children[3].style.display = "none";
        cardDiv.children[1].children[1].children[4].style.display = "block";
    }
    const addInputFn = (cardDiv, object) => {
        let input = cardDiv.children[1].children[1].children[4].children[0].value;
        if (input != "" && !(checkAlreadyInArray(input))) {
            objectOps.addSingleToProjectArray(input);
            objectOps.updateSingle(object, `project`, input);
        }
    }
    const checkAlreadyInArray = (input) => {
        let already = objectOps.projectArray.find(index => {
            return index == input;
        });
        if (already == undefined) {
            return false;
        } else {
            console.log('already there!');
            // this could fire an alert or something !!!
            return true;
        }
    }
    // clear input field value; show "add new project" button; hide input, cancel, and save.
    const addCancelFn = (cardDiv) => {
        cardDiv.children[1].children[1].children[4].children[0].value = "";
        cardDiv.children[1].children[1].children[3].style.display = "block";
        cardDiv.children[1].children[1].children[4].style.display = "none";
    }
    const addSaveFn = (cardDiv, object) => {
        addInputFn(cardDiv, object);
        // reset display
        addCancelFn(cardDiv);
        // remove and recreate dropdown menu
        clearOptions(cardDiv);
        // these need the project array and the object of the card !!!
        let optionsArray = populateInput(objectOps.projectArray, cardDiv);
        markSelected(optionsArray, object);
    }
    return { hideInput, displayInput, populateInput, getInput, markSelected, addBtnFn, addCancelFn, clearOptions, addSaveFn }
})();

// date functionality
const date = (() => {
    const mainFn = (cardDiv) => {
        let dateInput = getInput(cardDiv);
        // do I need a mainFn?
        // need a function to populate the input with current dueDate

    }
    const hideInput = (cardDiv) => {
        cardDiv.children[0].children[5].children[0].style.display = "block";
        cardDiv.children[0].children[5].children[1].style.display = "none";
        cardDiv.children[0].children[5].children[2].style.display = "none";
    }
    const displayInput = (cardDiv) => {
        cardDiv.children[0].children[5].children[0].style.display = "none";
        cardDiv.children[0].children[5].children[1].style.display = "block";
        cardDiv.children[0].children[5].children[2].style.display = "block";
    }
    const clearInput = (cardDiv) => {
        cardDiv.children[0].children[5].children[2].value = "";
    }
    const getInput = (cardDiv) => {
        let input = cardDiv.children[0].children[5].children[2].value;
        if (input != "") {
            let date = format(parseISO(input), 'MM/dd/yyyy');
            return date;
        } else {
            return input;
        }
    }
    // when user goes to edit to-do, show current due date on input
    const populateInput = (cardDiv, object) => {
        let input = cardDiv.children[0].children[5].children[2];
        if (object.dueDate != "") {
            let currentDate = format(parse(object.dueDate, 'MM/dd/yyyy', new Date()), 'yyyy-MM-dd');
            input.value = currentDate;
        }
    }
    return { mainFn, hideInput, displayInput, clearInput, getInput, populateInput}
})();
// // object operations
// const updateObject = (object, array) => {
//     for (let i=0; i<array.length; i++) {
//         object[object.properties[i]] = array[i];
//     }
// }
// const updateObjectCheck = (input) => {
//     let object = getObject(input.parentElement.parentElement);
//     if (input.checked) {
//         object.checked = true;
//     } else {
//         object.checked = false;
//     }
// }
// // needs updating once I have multiple objects... !!!
// // needs to be passed the project as well..? or should it just sort through the main array of objects?
// const getObject = (cardDiv) => {
//     let theTitle = cardDiv.children[0].children[1].children[0].textContent;
//     let object = objectArray.find(index => {
//         return index.title === theTitle;
//     });
//     // this works, but tried using find instead...can delete later 
//     // for (i=0; i<objectArray.length; i++) {
//     //     if (objectArray[i].title == title) {
//     //         object = objectArray[i];
//     //     }
//     // }
//     return object;
// }

const listeners = (() => {
    const elementsArray = [];
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
    // need to test if this is working... !!!
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
        // I think it can piggyback on the previous priorityBtns array !!!
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
export { listeners, edit, deleteFn };