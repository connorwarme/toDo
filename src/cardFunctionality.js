import { createElement } from "./utility";

// To-Do card button listener functions
// get card and toggle class
// might need update - to check object.checked / then to update it !!!
const checkboxFn = (input) => {
    input.parentElement.parentElement.classList.toggle('completedToDo');
    updateObjectCheck(input);
}
const expand = (() => {
    // expand card
    // or, if it's expanded already, minimize card
    const mainFn = (input) => {
        let extendedCard = input.parentElement.nextElementSibling;
        if (expand == false) {
        extendedCard.style.display = "flex";
        } else {
            extendedCard.style.display = "none";
            if (edit == false) {
                edit.resetCard(extendedCard.parentElement);
                edit.toggle();
            }
        }
        toggle();
    }
    // toggle
    let expand = false;
    const toggle = () => {
        expand = !expand;
    }
    return { mainFn, toggle, expand }
})();

// edit card
const edit = (() => {
    const mainFn = (input) => {
        let toDoCard = input.parentElement.parentElement;
        if (edit == true) {
            // expand form
            editableCard(toDoCard);
            expand = false;
            // display input fields
            displayInputs(toDoCard);
            // populate the input fields with current object data... needs object as argument !!!
            // needs object passed as argument...need to figure that out!
            edit.populateInput(toDoCard, first);
        } else if (edit == false) {
            resetCard(toDoCard);
        }
        toggle();
        expand.toggle();
    }
    // toggle 
    let edit = true;
    const toggle = () => {
        edit = !edit;
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
        let currentNotes = cardDiv.querySelector('input#notesEdit');
        currentNotes.value = object.notes;
        let optionsArray = project.populateInput(projectArray, cardDiv);
        project.markSelected(optionsArray, object);
        priority.editRadioSelection(cardDiv, object); 
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
        resetCard(cardDiv);
        edit = true;
        expand.expand = false;
        // needs to be updated to be able to receive other objects (?)
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
    return { mainFn, toggle, resetCard, edit, populateInput, cancelEditFn  }
})();
// for submit
const submit = (() => {
    // gather inputs, update object, update To-Do card display
    const mainFn = (cardDiv, object) => {
        let inputArray = _getInput(cardDiv);
        updateObject(object, inputArray);
        _displayInput(cardDiv, inputArray);
        edit.cancelEditFn(cardDiv);
    }
    // updates card display
    const _displayInput = (cardDiv, array) => {
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
    const _getInput = (cardDiv) => {
        let titleInput = cardDiv.children[0].children[1].children[2].value;
        let notesInput = cardDiv.children[1].children[0].children[2].value;
        let priorityInput = priority.currentSelection(btns).value;
        let projectInput = `Project: ${project.getInput(cardDiv)}`;
        let array = [titleInput, projectInput, priorityInput, "", notesInput, ""];
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
const deleteFn = (input) => {
    let toDoCard = input.parentElement.parentElement;
    listeners.removeAll(toDoCard);
    // needs access to "body" !!! did this fix work? (parentElement)
    toDoCard.parentElement.removeChild(toDoCard);
}
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
        for (i=0; i<priorityBtns.length; i++) {
            priorityBtns[i].checked = false;
        }
    }
    // not sure about this: editCurrentSelection returns the btn (need condition...if btn == null, don't worry about it);
    // display the current selection (in edit mode)
    const editCurrentSelection = (cardDiv, object) => {
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
    const currentSelection = (input) => {
        for (i=0; i<input.length; i++) {
            if (input[i].checked) {
                return input[i];
            }
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
    const markSelected = (array, object) => {
        let selectedProject = object.project;
        let selectedOption = array.find(index => {
            return index.value === selectedProject;
        });
        selectedOption.selected = true;
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
        let optionsArray = Array.from(select.children);
        let selection = optionsArray.find(index => {
            return index.selected === true;
        })
        return selection.value;
    }
    // + button: opens input to add project to the dropdown list
    // click + button, display input field and cancel and save buttons
    // cancel - clears the input field, hides display of input, cancel, save
    // save - gathers input, adds project to array, hides display^^, reruns creating dropdown menu (with the new addition)
    const addBtnFn = (cardDiv) => {
        cardDiv.children[1].children[1].children[3].style.display = "none";
        cardDiv.children[1].children[1].children[4].style.display = "block";
    }
    const addInputFn = (cardDiv) => {
        let project = cardDiv.children[1].children[1].children[4].children[0].value;
        if (project != "") {
            projectArray.push(project);
        }
        // push project into projectArray
    }
    // clear input field value; show "add new project" button; hide input, cancel, and save.
    const addCancelFn = (cardDiv) => {
        cardDiv.children[1].children[1].children[4].children[0].value = "";
        cardDiv.children[1].children[1].children[3].style.display = "block";
        cardDiv.children[1].children[1].children[4].style.display = "none";
    }
    const addSaveFn = (cardDiv) => {
        addInputFn(cardDiv);
        // reset display
        addCancelFn(cardDiv);
        // remove and recreate dropdown menu
        clearOptions(cardDiv);
        // these need the project array and the object of the card !!!
        let optionsArray = populateInput(projectArray, cardDiv);
        markSelected(optionsArray, second);
    }
    return { hideInput, displayInput, populateInput, getInput, addBtnFn, clearOptions, addSaveFn }
})();

// date functionality
const date = (() => {
    const mainFn = () => {

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
    const addInput = (cardDiv) => {
        let date = cardDiv.children[0].children[5].children[2].value;
        // need to format date; currently goes yyyy-mm-dd
        console.log(date);
    }
    return { mainFn, hideInput, displayInput, clearInput, addInput}
})();
// object operations
const updateObject = (object, array) => {
    for (i=0; i<array.length; i++) {
        object[object.properties[i]] = array[i];
    }
}
const updateObjectCheck = (input) => {
    let object = getObject(input.parentElement.parentElement);
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

const listeners = (checkboxBtn, expandBtn, editBtn, deleteBtn, projAddBtn, projAddCancelBtn, projAddSaveBtn, cancelEditBtn, submitEditBtn, cardDiv, object) => {
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
        deleteFn(deleteBtn);
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
        project.addSaveFn(cardDiv);
    })
    // cancel
    cancelEditBtn.addEventListener('click', () => {
        edit.cancelEditFn(cardDiv);
    })
    // submit -> needs to have the object as an argument !!! needs updating !!!
    submitEditBtn.addEventListener('click', () => {
        submit.mainFn(cardDiv, object);
    })
    // remove all listeners (used when deleting the card);
    // need to test if this is working... !!!
    const removeAll = () => {
        checkboxBtn.removeEventListener('click', () => {
            checkboxFn(checkboxBtn);
        })
        expandBtn.removeEventListener('click', () => {
            expand.mainFn(expandBtn);
        })
        editBtn.removeEventListener('click', () => {
            edit.mainFn(editBtn);
        })
        deleteBtn.removeEventListener('click', () => {
            deleteFn(deleteBtn);
        })
        // I think it can piggyback on the previous priorityBtns array !!!
        // let priorityBtns = Array.from(cardDiv.querySelectorAll('input[type="radio"]'));
        priorityBtns.forEach(index => {
            index.removeEventListener('click', () => {
                priority.mainFn(cardDiv);
            })
        })
        projAddBtn.removeEventListener('click', () => {
            project.addBtnFn(cardDiv);
        })
        projAddCancelBtn.removeEventListener('click', () => {
            project.addCancelFn(cardDiv);
        })
        projAddSaveBtn.removeEventListener('click', () => {
            project.addSaveFn(cardDiv);
        })
        cancelEditBtn.removeEventListener('click', () => {
            edit.cancelEditFn(cardDiv);
        })
        submitEditBtn.removeEventListener('click', () => {
            submit.mainFn(cardDiv, object);
        })
    }
    return { removeAll };
}
export { listeners };