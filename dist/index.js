/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/addToDo.js":
/*!************************!*\
  !*** ./src/addToDo.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addToDo\": () => (/* binding */ addToDo)\n/* harmony export */ });\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility */ \"./src/utility.js\");\n/* harmony import */ var _objectOps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objectOps */ \"./src/objectOps.js\");\n/* harmony import */ var _createCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createCard */ \"./src/createCard.js\");\n/* harmony import */ var _cardFunctionality__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cardFunctionality */ \"./src/cardFunctionality.js\");\n\n\n\n\n\nconst addToDo = (() => {\n    let addBtn;\n    // count is value of the card. increments with each to-do card created. \n    // allows for identification of object from array (objectOps.getObject);\n    let count = 0;\n    const addDOM = () => {\n        // create container and button\n        const addContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {'class': 'addContainer'});\n        addBtn = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {'class': 'addBtn', 'id': 'addToDo', 'value': '+', 'aria-label': 'Add To-Do'});\n        addBtn.textContent = \"+\";\n        // const addBtnLabel = createElement('label', {'for': 'addToDo'});\n        // addBtnLabel.textContent = \"Add To-Do\";\n        // append together\n        addContainer.appendChild(addBtn);\n        // addContainer.appendChild(addBtnLabel);\n        return addContainer;\n    }\n    const mainFn = () => {\n        let newToDo = (0,_objectOps__WEBPACK_IMPORTED_MODULE_1__.cardFactory)(\"\", \"\", \"\", \"\", \"\", false, count);\n        count++;\n        _objectOps__WEBPACK_IMPORTED_MODULE_1__.objectOps.addToObjectArray(newToDo);\n        let newCard = (0,_createCard__WEBPACK_IMPORTED_MODULE_2__.createCard)(newToDo);\n        _cardFunctionality__WEBPACK_IMPORTED_MODULE_3__.edit.mainFn(newCard.children[0].children[6]);\n        return newCard;\n    }\n    const addListener = () => {\n        let btn = document.getElementById('addToDo');\n        // add listener\n        btn.addEventListener('click', () => {\n            document.querySelector('div.body').appendChild(mainFn())});\n    }\n    return { addDOM, addListener };\n})();\n\n\n//# sourceURL=webpack://todo/./src/addToDo.js?");

/***/ }),

/***/ "./src/cardFunctionality.js":
/*!**********************************!*\
  !*** ./src/cardFunctionality.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"edit\": () => (/* binding */ edit),\n/* harmony export */   \"listeners\": () => (/* binding */ listeners)\n/* harmony export */ });\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility */ \"./src/utility.js\");\n/* harmony import */ var _objectOps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objectOps */ \"./src/objectOps.js\");\n/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./localStorage */ \"./src/localStorage.js\");\n\n\n\n\n// To-Do card button listener functions\n// get card and toggle class\n// might need update - to check object.checked / then to update it !!!\nconst checkboxFn = (input) => {\n    input.parentElement.parentElement.classList.toggle('completedToDo');\n    _objectOps__WEBPACK_IMPORTED_MODULE_1__.objectOps.updateCheck(input);\n}\nconst expand = (() => {\n    // expand card\n    // or, if it's expanded already, minimize card\n    const mainFn = (input) => {\n        let extendedCard = input.parentElement.nextElementSibling;\n        let object = _objectOps__WEBPACK_IMPORTED_MODULE_1__.objectOps.getObject(extendedCard.parentElement);\n        if (object.expanded == false) {\n            extendedCard.style.display = \"flex\";\n            object.expanded = true;\n        } else {\n            extendedCard.style.display = \"none\";\n            object.expanded = false;\n            if (object.editable == false) {\n                edit.cancelEditFnLite(extendedCard.parentElement)\n            }\n        }\n    }\n    return { mainFn }\n})();\n\n// edit card\nconst edit = (() => {\n    const mainFn = (input) => {\n        let toDoCard = input.parentElement.parentElement;\n        let object = _objectOps__WEBPACK_IMPORTED_MODULE_1__.objectOps.getObject(toDoCard);\n        if (object.editable == true) {\n            // expand form\n            editableCard(toDoCard);\n            object.expanded = true;\n            object.editable = false;\n            // display input fields\n            displayInputs(toDoCard);\n            // populate the input fields with current object data... needs object as argument !!!\n            // needs object passed as argument...need to figure that out!\n            populateInput(toDoCard, object);\n        } else if (object.editable == false) {\n            resetCard(toDoCard);\n            object.expanded = false;\n            object.editable = true;\n        }\n    }\n    // card expanded to allow edits\n    const editableCard = (cardDiv) => {\n        cardDiv.classList.add('cardEdit');\n        cardDiv.children[1].style.display = \"flex\";\n        cardDiv.children[2].classList.add('displayEdit');\n    }\n    // card minimized, hide notes & project, priority buttons and cancel/submit\n    const minimizeCard = (cardDiv) => {\n        cardDiv.classList.remove('cardEdit');\n        cardDiv.children[1].style.display = \"none\";\n        cardDiv.children[2].classList.remove('displayEdit');\n    }\n    // switch from text display to input fields\n    // is it possible/advantageous to change this into a fn that works for each of these (title, notes, priority, date, project). first argument = (exact element needing to be acted upon), second arg = (what should happen to it)..? !!!\n    const _displayInput = (containerDiv) => {\n        containerDiv.children[0].style.display = \"none\";\n        containerDiv.children[1].style.display = \"block\";\n        containerDiv.children[2].style.display = \"block\";\n    }\n    const displayInputs = (cardDiv) => {\n        // change title and notes into inputs\n        let titleDiv = cardDiv.children[0].children[1];\n        _displayInput(titleDiv);\n        let notesDiv = cardDiv.children[1].children[0];\n        _displayInput(notesDiv);\n        // display date input\n        date.displayInput(cardDiv);\n        // project input\n        project.displayInput(cardDiv); \n    }\n    // populate inputs with current object data\n    // have to pass it the projectArray?? !!! regardless, it needs access.\n    const populateInput = (cardDiv, object) =>  {\n        let currentTitle = cardDiv.querySelector('input.titleEdit');\n        currentTitle.value = object.title;\n        let currentNotes = cardDiv.querySelector('input#notesEdit');\n        currentNotes.value = object.notes;\n        let optionsArray = project.populateInput(_objectOps__WEBPACK_IMPORTED_MODULE_1__.objectOps.projectArray, cardDiv);\n        project.markSelected(optionsArray, object);\n        priority.editCurrentSelection(cardDiv, object); \n    }\n    // other option, both need access to DOM and object\n    // so I have to pass title and object.title for it to work...\n    // const editPopulateInput = (inputDOM, value) => {\n    //     inputDOM.value = value;\n    // }\n    // switch from input fields to text display\n    const _hideInput = (containerDiv) => {\n        containerDiv.children[0].style.display = \"flex\";\n        containerDiv.children[1].style.display = \"none\";\n        containerDiv.children[2].style.display = \"none\";\n    }\n    // cancel edit button\n    const cancelEditFn = (cardDiv) => {\n        let object = _objectOps__WEBPACK_IMPORTED_MODULE_1__.objectOps.getObject(cardDiv);\n        if (object.title == \"\") {\n            deleteFn(cardDiv.children[0].lastChild);\n        } else {\n        resetCard(cardDiv);\n        object.editable = true;\n        object.expanded = false;\n        }\n        // needs to be updated to be able to receive other objects (?)\n    }\n    const cancelEditFnLite = (cardDiv) => {\n        let object = _objectOps__WEBPACK_IMPORTED_MODULE_1__.objectOps.getObject(cardDiv);\n        resetCard(cardDiv);\n        object.editable = true;\n        object.expanded = false;\n    }\n    // reset: clears inputs, hides them, displays text, minimizes card to normal size\n    const resetCard = (cardDiv) => {\n        _clearInputs(cardDiv);\n        _hideInput(cardDiv.children[0].children[1]);\n        _hideInput(cardDiv.children[1].children[0]);\n        project.hideInput(cardDiv);\n        date.hideInput(cardDiv);\n        minimizeCard(cardDiv);\n    }\n    // clears edits from input sources\n    const _clearInputs = (cardDiv) => {\n        clearTextInputs(cardDiv);\n        priority.clearSelection(cardDiv);\n        project.clearOptions(cardDiv);\n        date.clearInput(cardDiv);\n    }\n    const clearTextInputs = (cardDiv) => {\n        cardDiv.children[0].children[1].children[2].value = null;\n        cardDiv.children[1].children[0].children[2].value = null;\n    }\n    return { mainFn, resetCard, populateInput, cancelEditFn, cancelEditFnLite  }\n})();\n// for submit\nconst submit = (() => {\n    // gather inputs, update object, update To-Do card display\n    const mainFn = (cardDiv, object) => {\n        let btns = Array.from(cardDiv.querySelectorAll('input[type=\"radio'));\n        let inputArray = _getInput(cardDiv, btns);\n        _objectOps__WEBPACK_IMPORTED_MODULE_1__.objectOps.update(object, inputArray);\n        _displayInput(cardDiv, inputArray);\n        edit.cancelEditFn(cardDiv);\n    }\n    // updates card display\n    const _displayInput = (cardDiv, array) => {\n        let titleText = cardDiv.children[0].children[1].children[0];\n        titleText.textContent = array[0];\n        let notesText = cardDiv.children[1].children[0].children[0];\n        notesText.textContent = _emptyInputCheck(array[4], 'Notes');\n        let priorityText = cardDiv.children[0].children[3];\n        priorityText.textContent = array[2];\n        let projectText = cardDiv.children[1].children[1].children[0];\n        projectText.textContent = _emptyInputCheck(array[1], 'Project');\n    }\n    const _emptyInputCheck = (input, section) => {\n        let empty = \"\";\n        if (input == false || input == \"\" || input == undefined) {\n            return empty;\n        } else {\n            return `${section}: ${input}`;\n        }\n    }\n    // collect input values, returns array (indexes mimic position in object)\n    // needs updating - project, date, checked !!!\n    const _getInput = (cardDiv, btnsArray) => {\n        let titleInput = cardDiv.children[0].children[1].children[2].value;\n        let notesInput = cardDiv.children[1].children[0].children[2].value;\n        let priorityInput = priority.currentSelection(btnsArray).value;\n        let projectInput = project.getInput(cardDiv);\n        let array = [titleInput, projectInput, priorityInput, \"\", notesInput, \"\"];\n        return array;\n    }\n    return { mainFn };\n})();\n// not using...do I need this? !!!\n// const editUpdateObject = (object, key, input) => {\n//     object[`${key}`] = input;\n// }\n// deletes To-Do card\n// should run a function to delete object too? !!! or to remove it from array of objects?\nconst deleteFn = (input) => {\n    let toDoCard = input.parentElement.parentElement;\n    // remove from arrays\n    let object = _objectOps__WEBPACK_IMPORTED_MODULE_1__.objectOps.getObject(toDoCard);\n    _objectOps__WEBPACK_IMPORTED_MODULE_1__.objectOps.deleteFromProjectArray(object);\n    _objectOps__WEBPACK_IMPORTED_MODULE_1__.objectOps.deleteFromObjectArray(object);\n    // remove listeners\n    listeners.removeAll(toDoCard);\n    // remove from parentDiv\n    toDoCard.parentElement.removeChild(toDoCard);\n    // remove from local storage\n    console.log(`deletefn ${_objectOps__WEBPACK_IMPORTED_MODULE_1__.objectOps.objectArray} and ${_objectOps__WEBPACK_IMPORTED_MODULE_1__.objectOps.projectArray}`);\n\n}\n// priority level input\nconst priority = (() => {\n    // finds/returns selected priority level\n    const mainFn = (cardDiv) => {\n        let priorityBtns = Array.from(cardDiv.querySelector('input[type=\"radio'));\n        let selection = currentSelection(priorityBtns);\n        return selection;\n    }\n    // clear radio selection\n    const clearSelection = (cardDiv) => {\n        let priorityBtns = Array.from(cardDiv.querySelectorAll('input[type=\"radio\"]'));\n        for (let i=0; i<priorityBtns.length; i++) {\n            priorityBtns[i].checked = false;\n        }\n    }\n    // not sure about this: editCurrentSelection returns the btn (need condition...if btn == null, don't worry about it);\n    // display the current selection (in edit mode)\n    const editCurrentSelection = (cardDiv, object) => {\n        let priorityBtns = Array.from(cardDiv.querySelectorAll('input[type=\"radio\"]'));\n        let btn;\n        if (object.priority != \"\") {\n            btn = priorityBtns.find(index => {\n                return index.value === object.priority;\n            });\n            btn.checked = \"checked\";\n        } else {\n            btn = \"\";\n        }\n        // this also works, tried to improve it by using array methods... can delete later\n        // for (i=0; i<priorityBtns.length; i++) {\n        //     if (priorityBtns[i].value == object.priority) {\n        //         priorityBtns[i].checked = \"checked\";\n        //         btn = priorityBtns[i];\n        //     }\n        // }\n        return btn;\n    }\n    // find and return the \"checked\" radio button aka selected priority level\n    const currentSelection = (input) => {\n        let checked = input.find(index => {\n            return index.checked;\n        })\n        // for (let i=0; i<input.length; i++) {\n        //     if (input[i].checked) {\n        //         return input[i];\n        //     }\n        // }\n        if (checked == undefined) {\n            return \"\";\n        } else {\n            return checked;\n        }\n    }\n    return { mainFn, clearSelection, currentSelection, editCurrentSelection };\n})();\n\n// project input\n// -> populate display, clear input, gather input\n// -> do dropdown? w/ option to add?\n// -> or text input, and run a check to see if project already exists. if not, pop-up suggesting creating one..?\nconst project = (() => {\n    const hideInput = (cardDiv) => {\n        cardDiv.children[1].children[1].children[0].style.display = \"block\";\n        cardDiv.children[1].children[1].children[1].style.display = \"none\";\n        cardDiv.children[1].children[1].children[2].style.display = \"none\";\n        cardDiv.children[1].children[1].children[3].style.display = \"none\";\n        cardDiv.children[1].children[1].children[4].style.display = \"none\"; \n    }\n    const displayInput = (cardDiv) => {\n        cardDiv.children[1].children[1].children[0].style.display = \"none\";\n        cardDiv.children[1].children[1].children[1].style.display = \"block\";\n        cardDiv.children[1].children[1].children[2].style.display = \"block\";\n        cardDiv.children[1].children[1].children[3].style.display = \"block\";\n    }\n    // might want to separate forEach fn on its own... !!!\n    // another fn to find object.property value and to select it (set \"option.selected = true\")\n    const populateInput = (array, cardDiv) => {\n        if (array == null || array == undefined) {\n            return false;\n        } else {\n            let select = cardDiv.children[1].children[1].children[2];\n            let optionsArray = [];\n            array.forEach(index => {\n                let option = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('option', {\"value\": `${index}`});\n                option.textContent = `${index}`;\n                select.appendChild(option);\n                optionsArray.push(option);\n            })\n            return optionsArray;\n        }\n    }\n    const markSelected = (array, object) => {\n        // does this need another check - for when no project is selected? !!!\n        let selectedOption;\n        if (object.project != \"\") {\n            selectedOption = array.find(index => {\n                return index.value === object.project;\n            });\n            selectedOption.selected = true;\n        }\n    }\n    // project clear input (for cancel button)\n    const clearOptions = (cardDiv) => {\n        let select = cardDiv.children[1].children[1].children[2];\n        let optionsArray = Array.from(select.children);\n        optionsArray.forEach(index => {\n            select.removeChild(index);\n        })\n    }\n    // project gather input (for submit button)\n    // returns project name\n    const getInput = (cardDiv) => {\n        let select = cardDiv.children[1].children[1].children[2];\n        if (select.children.length > 0) {\n            let optionsArray = Array.from(select.children);\n            let selection = optionsArray.find(index => {\n                return index.selected === true;\n            })\n            return selection.value;\n        } else {\n            return false;\n        }\n    }\n    // + button: opens input to add project to the dropdown list\n    // click + button, display input field and cancel and save buttons\n    // cancel - clears the input field, hides display of input, cancel, save\n    // save - gathers input, adds project to array, hides display^^, reruns creating dropdown menu (with the new addition)\n    const addBtnFn = (cardDiv) => {\n        cardDiv.children[1].children[1].children[3].style.display = \"none\";\n        cardDiv.children[1].children[1].children[4].style.display = \"block\";\n    }\n    const addInputFn = (cardDiv, object) => {\n        let input = cardDiv.children[1].children[1].children[4].children[0].value;\n        if (input != \"\" && !(checkAlreadyInArray(input))) {\n            _objectOps__WEBPACK_IMPORTED_MODULE_1__.objectOps.addSingleToProjectArray(input);\n            _objectOps__WEBPACK_IMPORTED_MODULE_1__.objectOps.updateSingle(object, `project`, input);\n        }\n    }\n    const checkAlreadyInArray = (input) => {\n        let already = _objectOps__WEBPACK_IMPORTED_MODULE_1__.objectOps.projectArray.find(index => {\n            return index == input;\n        });\n        if (already == undefined) {\n            return false;\n        } else {\n            console.log('already there!');\n            // this could fire an alert or something !!!\n            return true;\n        }\n    }\n    // clear input field value; show \"add new project\" button; hide input, cancel, and save.\n    const addCancelFn = (cardDiv) => {\n        cardDiv.children[1].children[1].children[4].children[0].value = \"\";\n        cardDiv.children[1].children[1].children[3].style.display = \"block\";\n        cardDiv.children[1].children[1].children[4].style.display = \"none\";\n    }\n    const addSaveFn = (cardDiv, object) => {\n        addInputFn(cardDiv, object);\n        // reset display\n        addCancelFn(cardDiv);\n        // remove and recreate dropdown menu\n        clearOptions(cardDiv);\n        // these need the project array and the object of the card !!!\n        let optionsArray = populateInput(_objectOps__WEBPACK_IMPORTED_MODULE_1__.objectOps.projectArray, cardDiv);\n        markSelected(optionsArray, object);\n    }\n    return { hideInput, displayInput, populateInput, getInput, markSelected, addBtnFn, addCancelFn, clearOptions, addSaveFn }\n})();\n\n// date functionality\nconst date = (() => {\n    const mainFn = () => {\n\n    }\n    const hideInput = (cardDiv) => {\n        cardDiv.children[0].children[5].children[0].style.display = \"block\";\n        cardDiv.children[0].children[5].children[1].style.display = \"none\";\n        cardDiv.children[0].children[5].children[2].style.display = \"none\";\n    }\n    const displayInput = (cardDiv) => {\n        cardDiv.children[0].children[5].children[0].style.display = \"none\";\n        cardDiv.children[0].children[5].children[1].style.display = \"block\";\n        cardDiv.children[0].children[5].children[2].style.display = \"block\";\n    }\n    const clearInput = (cardDiv) => {\n        cardDiv.children[0].children[5].children[2].value = \"\";\n    }\n    const addInput = (cardDiv) => {\n        let date = cardDiv.children[0].children[5].children[2].value;\n        // need to format date; currently goes yyyy-mm-dd\n        console.log(date);\n    }\n    return { mainFn, hideInput, displayInput, clearInput, addInput}\n})();\n// // object operations\n// const updateObject = (object, array) => {\n//     for (let i=0; i<array.length; i++) {\n//         object[object.properties[i]] = array[i];\n//     }\n// }\n// const updateObjectCheck = (input) => {\n//     let object = getObject(input.parentElement.parentElement);\n//     if (input.checked) {\n//         object.checked = true;\n//     } else {\n//         object.checked = false;\n//     }\n// }\n// // needs updating once I have multiple objects... !!!\n// // needs to be passed the project as well..? or should it just sort through the main array of objects?\n// const getObject = (cardDiv) => {\n//     let theTitle = cardDiv.children[0].children[1].children[0].textContent;\n//     let object = objectArray.find(index => {\n//         return index.title === theTitle;\n//     });\n//     // this works, but tried using find instead...can delete later \n//     // for (i=0; i<objectArray.length; i++) {\n//     //     if (objectArray[i].title == title) {\n//     //         object = objectArray[i];\n//     //     }\n//     // }\n//     return object;\n// }\n\nconst listeners = (() => {\n    const elementsArray = [];\n    function addAll (checkboxBtn, expandBtn, editBtn, deleteBtn, projAddBtn, projAddCancelBtn, projAddSaveBtn, cancelEditBtn, submitEditBtn, cardDiv, object) {\n        for (let i = 0; i<arguments.length; i++) {\n            elementsArray.push(arguments[i]);\n        }\n        // checkbox\n        checkboxBtn.addEventListener('click', () => {\n            checkboxFn(checkboxBtn);\n        })\n        // expand ToDo\n        expandBtn.addEventListener('click', () => {\n            expand.mainFn(expandBtn);\n        })\n        // edit ToDo\n        editBtn.addEventListener('click', () => {\n            edit.mainFn(editBtn);\n        })\n        // delete ToDo\n        deleteBtn.addEventListener('click', () => {\n            deleteFn(deleteBtn);\n        })\n        // priority level (radio buttons)\n        let priorityBtns = Array.from(cardDiv.querySelectorAll('input[type=\"radio\"]'));\n        priorityBtns.forEach(index => {\n            index.addEventListener('click', () => {\n                priority.mainFn(cardDiv);\n            })\n        })\n        // add project\n        projAddBtn.addEventListener('click', () => {\n            project.addBtnFn(cardDiv);\n        })\n        // cancel adding project\n        projAddCancelBtn.addEventListener('click', () => {\n            project.addCancelFn(cardDiv);\n        })\n        // save new project\n        projAddSaveBtn.addEventListener('click', () => {\n            project.addSaveFn(cardDiv, object);\n        })\n        // cancel\n        cancelEditBtn.addEventListener('click', () => {\n            edit.cancelEditFn(cardDiv);\n        })\n        // submit -> needs to have the object as an argument !!! needs updating !!!\n        submitEditBtn.addEventListener('click', () => {\n            submit.mainFn(cardDiv, object);\n        })\n    }\n    // remove all listeners (used when deleting the card);\n    // need to test if this is working... !!!\n    const removeAll = () => {\n        elementsArray[0].removeEventListener('click', () => {\n            checkboxFn(elementsArray[0]);\n        })\n        elementsArray[1].removeEventListener('click', () => {\n            expand.mainFn(elementsArray[1]);\n        })\n        elementsArray[2].removeEventListener('click', () => {\n            edit.mainFn(elementsArray[2]);\n        })\n        elementsArray[3].removeEventListener('click', () => {\n            deleteFn(elementsArray[3]);\n        })\n        // I think it can piggyback on the previous priorityBtns array !!!\n        let priorityBtns = Array.from(elementsArray[9].querySelectorAll('input[type=\"radio\"]'));\n        priorityBtns.forEach(index => {\n            index.removeEventListener('click', () => {\n                priority.mainFn(elementsArray[9]);\n            })\n        })\n        elementsArray[4].removeEventListener('click', () => {\n            project.addBtnFn(elementsArray[9]);\n        })\n        elementsArray[5].removeEventListener('click', () => {\n            project.addCancelFn(elementsArray[9]);\n        })\n        elementsArray[6].removeEventListener('click', () => {\n            project.addSaveFn(elementsArray[9], elementsArray[10]);\n        })\n        elementsArray[7].removeEventListener('click', () => {\n            edit.cancelEditFn(elementsArray[9]);\n        })\n        elementsArray[8].removeEventListener('click', () => {\n            submit.mainFn(elementsArray[9], elementsArray[10]);\n        })\n    }\n    return { addAll, removeAll };\n})();\n\n\n//# sourceURL=webpack://todo/./src/cardFunctionality.js?");

/***/ }),

/***/ "./src/createCard.js":
/*!***************************!*\
  !*** ./src/createCard.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createCard\": () => (/* binding */ createCard)\n/* harmony export */ });\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility */ \"./src/utility.js\");\n/* harmony import */ var _cardFunctionality__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cardFunctionality */ \"./src/cardFunctionality.js\");\n/* harmony import */ var _icons_delete_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icons/delete.png */ \"./src/icons/delete.png\");\n/* harmony import */ var _icons_edit_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icons/edit.png */ \"./src/icons/edit.png\");\n/* harmony import */ var _icons_expand_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icons/expand.png */ \"./src/icons/expand.png\");\n/* harmony import */ var _icons_add_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icons/add.png */ \"./src/icons/add.png\");\n/* harmony import */ var _icons_cancel_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./icons/cancel.png */ \"./src/icons/cancel.png\");\n/* harmony import */ var _icons_save_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./icons/save.png */ \"./src/icons/save.png\");\n\n\n\n\n\n\n\n\n\nconst craftCard = (() => {\n// I have these declared right away to be available in multiple functions...)\n    let checked;\n    let expandCard;\n    let editCard;\n    let deleteCard;\n    let projectAdd;\n    let projectAddCancel;\n    let projectAddSave;\n    let cancelEditBtn;\n    let submitEditBtn;\n\n    const initial = () => {\n        const card = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"card\"});\n        return card;\n    }\n    // make to-do card\n    const card = (object, cardDiv) => {\n        cardDiv.value = object.value;\n        // -> 3 zones (regular, extended, and editable)\n        const regularSize = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"regularSize\"});\n        const extendedSize = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"extendedSize\"});\n        const editSize = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"editSize\"});\n        cardDiv.appendChild(regularSize);\n        cardDiv.appendChild(extendedSize);\n        cardDiv.appendChild(editSize);\n        // build card\n        // regular size\n        checked = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {\"type\": \"checkbox\", \"class\": \"checkbox\", 'aria-label': \"Checkbox\"});\n        let title = _title(object);\n        const spacerDiv = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"spacerDiv\"});\n        let priority = _priority(object);\n        expandCard = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {\"id\": \"expand\", \"class\": \"expand\", \"aria-label\": \"Expand Card\"});\n        const expandIcon = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {\"src\": `${_icons_expand_png__WEBPACK_IMPORTED_MODULE_4__}`, \"alt\": \"Expand\"});\n        let date = _date(object);\n        editCard = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {\"class\": \"editCard\", \"aria-label\": \"Edit Card\"});\n        const editIcon = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {\"src\": `${_icons_edit_png__WEBPACK_IMPORTED_MODULE_3__}`, \"alt\": \"Edit\"});\n        deleteCard = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {\"class\": \"deleteCard\", \"aria-label\": \"Delete Card\"});\n        const deleteIcon = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {\"src\": `${_icons_delete_png__WEBPACK_IMPORTED_MODULE_2__}`, \"alt\": \"Delete\"});\n        // extended size\n        let note = _notes(object);\n        let project = _project(object);\n        // editable size\n        let priorityEdit = _priorityEdit();\n        let submitEdit = _submitEdit();\n        // append it all together\n        regularSize.appendChild(checked);\n        regularSize.appendChild(title);\n        regularSize.appendChild(spacerDiv);\n        regularSize.appendChild(priority);\n        regularSize.appendChild(expandCard);\n        expandCard.appendChild(expandIcon);\n        regularSize.appendChild(date);\n        regularSize.appendChild(editCard);\n        editCard.appendChild(editIcon);\n        regularSize.appendChild(deleteCard);\n        deleteCard.appendChild(deleteIcon);\n        extendedSize.appendChild(note);\n        extendedSize.appendChild(project);\n        editSize.appendChild(priorityEdit);\n        editSize.appendChild(submitEdit);\n        // add listeners to all the buttons\n        _cardFunctionality__WEBPACK_IMPORTED_MODULE_1__.listeners.addAll(checked, expandCard, editCard, deleteCard, projectAdd, projectAddCancel, projectAddSave, cancelEditBtn, submitEditBtn, cardDiv, object)\n    }\n    // helper fns\n    const _title = (object) => {\n        const titleContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"titleContainer\"})\n        const title = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"title\"});\n        title.textContent = `${object.title}`;\n        const titleEditLabel = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {\"for\": \"titleEdit\", \"class\": \"titleEdit\"});\n        titleEditLabel.textContent = \"Title:\";\n        const titleEditInput = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {\"type\": \"text\", \"class\": \"titleEdit\", \"id\": \"titleEdit\"});\n        titleContainer.appendChild(title);\n        titleContainer.appendChild(titleEditLabel);\n        titleContainer.appendChild(titleEditInput);\n        return titleContainer;\n    }\n    const _priority = (object) => {\n        const priority = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"priority\", \"id\": `${object.priority}`});\n        priority.textContent = `${object.priority}`;\n        return priority;\n    } \n    const _date = (object) => {\n        const dateContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"dateContainer\"});\n        const dateText = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"dateText\"});\n        dateText.textContent = `${object.dueDate}`;\n        const dateInputLabel = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {\"for\": \"dateInput\", \"class\": \"dateInput\"});\n        dateInputLabel.textContent = \"Due Date:\"\n        const dateInput = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {\"type\": \"date\", \"id\": \"dateInput\", \"class\": \"dateInput\"});\n        dateContainer.appendChild(dateText);\n        dateContainer.appendChild(dateInputLabel);\n        dateContainer.appendChild(dateInput);\n        return dateContainer;\n    }\n    const _notes = (object) => {\n        const notesContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"notesContainer\"});\n        const notes = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"notes\"});\n        notes.textContent = `Notes: ${object.notes}`;\n        const notesEditLabel = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {\"for\": \"notesEdit\"});\n        notesEditLabel.textContent = \"Notes:\";\n        const notesEditInput = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {\"type\": \"textarea\", \"id\": \"notesEdit\"});\n        notesContainer.appendChild(notes);\n        notesContainer.appendChild(notesEditLabel);\n        notesContainer.appendChild(notesEditInput);\n        return notesContainer;\n    }\n    const _project = (object) => {\n        const projectContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {'class': 'projectContainer'});\n        const projectText = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"projectText\"});\n        if (object.project != \"\") {\n            projectText.textContent = `Project: ${object.project}`;\n        }\n        const projectEditLabel = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {\"class\": \"projectEditLabel\", \"for\": \"projectDropdown\"});\n        const projectSelect = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('select', {\"class\": \"projectSelect\", \"id\": \"projectDropdown\"});\n        projectAdd = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {\"class\": \"projectAddBtn\", \"aria-label\": \"Add Project\"});\n        const projectAddIcon = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {\"src\": `${_icons_add_png__WEBPACK_IMPORTED_MODULE_5__}`, \"alt\": \"Add Project\"});\n        const projectAddContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"projectAddContainer\"});\n        const projectAddInput = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {\"type\": \"text\", \"class\": \"projectAddInput\", \"aria-label\": \"Add New Project\"});\n        projectAddCancel = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {\"class\": \"projectAddCancel\", \"aria-label\": \"Cancel\"});\n        const projectCancelIcon = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {\"src\": `${_icons_cancel_png__WEBPACK_IMPORTED_MODULE_6__}`, \"alt\": \"Cancel\"});\n        projectAddSave = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {\"class\": \"projectAddSave\"});\n        const projectSaveIcon = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {\"src\": `${_icons_save_png__WEBPACK_IMPORTED_MODULE_7__}`, \"alt\": \"Save Project\"});\n        projectContainer.appendChild(projectText);\n        projectContainer.appendChild(projectEditLabel);\n        projectContainer.appendChild(projectSelect);\n        projectContainer.appendChild(projectAdd);\n        projectAdd.appendChild(projectAddIcon);\n        projectContainer.appendChild(projectAddContainer);\n        projectAddContainer.appendChild(projectAddInput);\n        projectAddContainer.appendChild(projectAddCancel);\n        projectAddCancel.appendChild(projectCancelIcon);\n        projectAddContainer.appendChild(projectAddSave);\n        projectAddSave.appendChild(projectSaveIcon);\n        return projectContainer;\n    }\n    const _priorityEdit = () => {\n        const priorityEditContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"priorityEditContainer\"});\n        const priorityEditTitle = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"priorityEditTitle\"});\n        priorityEditTitle.textContent = \"Priority:\"\n        const priorityEditLow = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {\"type\": \"radio\", \"name\": \"priorityEditBtns\", \"id\": \"priorityEditLow\", \"value\": \"Low\"});\n        const priorityEditLowLabel = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {\"for\": \"priorityEditLow\"});\n        priorityEditLowLabel.textContent = \"Low\";\n        const priorityEditMed = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {\"type\": \"radio\", \"name\": \"priorityEditBtns\", \"id\": \"priorityEditMed\", \"value\": \"Medium\"});\n        const priorityEditMedLabel = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {\"for\": \"priorityEditMed\"});\n        priorityEditMedLabel.textContent = \"Medium\";\n        const priorityEditHigh = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {\"type\": \"radio\", \"name\": \"priorityEditBtns\", \"id\": \"priorityEditHigh\", \"value\": \"High\"});\n        const priorityEditHighLabel = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {\"for\": \"priorityEditHigh\"});\n        priorityEditHighLabel.textContent = \"High\";\n        const priorityEditDefcon = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {\"type\": \"radio\", \"name\": \"priorityEditBtns\", \"id\": \"priorityEditDefcon\", \"value\": \"Defcon\"});\n        const priorityEditDefconLabel = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {\"for\": \"priorityEditDefcon\"});\n        priorityEditDefconLabel.textContent = \"Defcon\";\n        priorityEditContainer.appendChild(priorityEditTitle);\n        priorityEditContainer.appendChild(priorityEditLow);\n        priorityEditContainer.appendChild(priorityEditLowLabel);\n        priorityEditContainer.appendChild(priorityEditMed);\n        priorityEditContainer.appendChild(priorityEditMedLabel);\n        priorityEditContainer.appendChild(priorityEditHigh);\n        priorityEditContainer.appendChild(priorityEditHighLabel);\n        priorityEditContainer.appendChild(priorityEditDefcon);\n        priorityEditContainer.appendChild(priorityEditDefconLabel);\n        return priorityEditContainer;\n    }\n    const _submitEdit = () => {\n        const submitEditContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"submitContainer\"});\n        cancelEditBtn = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {\"class\": \"cancelEditBtn\", \"aria-label\": \"Cancel Edit\"});\n        cancelEditBtn.textContent = \"Cancel\";\n        submitEditBtn = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {\"class\": \"submitEditBtn\", \"aria-label\": \"Submit Edit\"})\n        submitEditBtn.textContent = \"Submit\";\n        submitEditContainer.appendChild(cancelEditBtn);\n        submitEditContainer.appendChild(submitEditBtn);\n        return submitEditContainer;\n    }\n    return { initial, card }\n})();\n\nconst createCard = (object) => {\n    let card = craftCard.initial();\n    craftCard.card(object, card);\n    return card;\n}\n\n\n//# sourceURL=webpack://todo/./src/createCard.js?");

/***/ }),

/***/ "./src/h&f.js":
/*!********************!*\
  !*** ./src/h&f.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"makeHF\": () => (/* binding */ makeHF)\n/* harmony export */ });\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility */ \"./src/utility.js\");\n// header and footer\n\nconst Header = new URL(/* asset import */ __webpack_require__(/*! ./src/headercheck.png */ \"./src/headercheck.png\"), __webpack_require__.b);\nconst Github = new URL(/* asset import */ __webpack_require__(/*! ./src/github.png */ \"./src/github.png\"), __webpack_require__.b);\nconst LinkedIn = new URL(/* asset import */ __webpack_require__(/*! ./src/linkedin.png */ \"./src/linkedin.png\"), __webpack_require__.b);\n\nconst makeHF = () => {\n    const header = () => {\n        let header = document.querySelector('div.header');\n        let headerImgBox = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"headerImgBox\"});\n        const icon = new Image();\n        icon.src = Header;\n        let headerTextBox = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"headerTextBox\"});\n        headerTextBox.textContent = \"MATE\";\n\n        // append it all together\n        header.appendChild(headerImgBox);\n        headerImgBox.appendChild(icon);\n        header.appendChild(headerTextBox);\n    }\n    const footer = () => {\n        let footer = document.querySelector('div.footer');\n        let footerBox = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"footerBox\"});\n        let linkContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"linkContainer\"});\n        let gitLink = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', {\"href\": \"https://github.com/connorwarme\", \"alt\": \"Github Profile\", \"target\": \"_blank\"});\n        let gitIcon = new Image();\n        gitIcon.src = Github;\n        gitIcon.alt = \"Github Profile\";\n        let linkLink = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', {\"href\": \"https://www.linkedin.com/in/connor-warme-103a09167\", \"alt\": \"LinkedIn Profile\", \"target\": \"_blank\"});\n        let linkIcon = new Image();\n        linkIcon.src = LinkedIn;\n        linkIcon.alt = \"LinkedIn Profile\";\n        let textContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"textContainer\"});\n        textContainer.textContent = \"Peregrinning Productions\";\n\n        // append it all together\n        footer.appendChild(footerBox);\n        footerBox.appendChild(linkContainer);\n        linkContainer.appendChild(gitLink);\n        gitLink.appendChild(gitIcon);\n        linkContainer.appendChild(linkLink);\n        linkLink.appendChild(linkIcon);\n        footerBox.appendChild(textContainer);\n    }\n    header();\n    footer();\n}\n\n\n//# sourceURL=webpack://todo/./src/h&f.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _objectOps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objectOps.js */ \"./src/objectOps.js\");\n/* harmony import */ var _createCard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createCard.js */ \"./src/createCard.js\");\n/* harmony import */ var _addToDo_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addToDo.js */ \"./src/addToDo.js\");\n/* harmony import */ var _localStorage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./localStorage.js */ \"./src/localStorage.js\");\n/* harmony import */ var _openingModal_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./openingModal.js */ \"./src/openingModal.js\");\n/* harmony import */ var _h_f_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./h&f.js */ \"./src/h&f.js\");\n/* harmony import */ var _navbar_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./navbar.js */ \"./src/navbar.js\");\n\n\n\n\n\n\n\n\n\nlet first = (0,_objectOps_js__WEBPACK_IMPORTED_MODULE_0__.cardFactory)('update README', 'winning', 'High', '07/14/22', 'kinda like the other dudes', false);\nlet second = (0,_objectOps_js__WEBPACK_IMPORTED_MODULE_0__.cardFactory)('doing it', \"dudeage\", \"High\", \"\", \"all the time\", false);\n// if (ls.checkContent(\"obj\") == false) {\n//     objectOps.addToObjectArray(first);\n//     objectOps.addToObjectArray(second);\n//     objectOps.addToProjectArray(objectOps.objectArray);\n// }\nlet body = document.querySelector('div.body');\n// body.appendChild(add());\n// body.appendChild(createCard(first));\n// body.appendChild(createCard(second));\n// body.appendChild(addFn());\n// ls.saveArray(objectOps.objectArray, \"obj\");\n// let x = ls.returnArray(\"obj\");\n// console.log(x);\n// for (let i=0; i<x.length; i++) {\n//     body.appendChild(createCard(x[i]));\n// }\n// ls.saveArray(objectOps.projectArray, \"proj\");\n// console.log(ls.returnArray(\"proj\"));\n// objectOps.objectArray = ls.returnArray(\"obj\");\n// objectOps.projectArray = ls.returnArray(\"proj\");\n// // \nconsole.log(_objectOps_js__WEBPACK_IMPORTED_MODULE_0__.objectOps.objectArray);\nconsole.log(_objectOps_js__WEBPACK_IMPORTED_MODULE_0__.objectOps.projectArray);\n// console.log(ls.checkContent(\"obj\"));\n(0,_openingModal_js__WEBPACK_IMPORTED_MODULE_4__.createModal)();\n(0,_h_f_js__WEBPACK_IMPORTED_MODULE_5__.makeHF)();\n_navbar_js__WEBPACK_IMPORTED_MODULE_6__.navbar.createNav();\n_navbar_js__WEBPACK_IMPORTED_MODULE_6__.navbar.newProject('first Project');\n\n//# sourceURL=webpack://todo/./src/index.js?");

/***/ }),

/***/ "./src/localStorage.js":
/*!*****************************!*\
  !*** ./src/localStorage.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ls\": () => (/* binding */ ls)\n/* harmony export */ });\n// local storage\nconst ls = (() => {\n    // these work for both objectArray and projectArray\n    // take the array, stringify, and save it locally\n    const saveArray = (array, key) => {\n        // need to stringify data\n        let data = JSON.stringify(array);\n        // save to local\n        localStorage.setItem(key, data);\n    }\n    // not currently using this one.. !!!\n    const updateArrays = (array1, array2) => {\n        saveArray(array1, \"obj\");\n        saveArray(array2, \"proj\");\n    }\n    // get the local data, parse it, and return the array\n    const returnArray = (key) => {\n        let arrayString = localStorage.getItem(key);\n        let regularArray = JSON.parse(arrayString);\n        return regularArray;\n    }\n    const checkContent = (key) => {\n        let content = returnArray(key);\n        console.log(`checking for content ${content}`);\n        if (content === null || content[0] == undefined) {\n            return false;\n        } else {\n            return content;\n        }\n    }\n    return { saveArray, updateArrays, returnArray, checkContent }\n})();\n\n\n\n//# sourceURL=webpack://todo/./src/localStorage.js?");

/***/ }),

/***/ "./src/navbar.js":
/*!***********************!*\
  !*** ./src/navbar.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"navbar\": () => (/* binding */ navbar)\n/* harmony export */ });\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility */ \"./src/utility.js\");\n/* harmony import */ var _icons_home_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icons/home.png */ \"./src/icons/home.png\");\n/* harmony import */ var _icons_day_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icons/day.png */ \"./src/icons/day.png\");\n/* harmony import */ var _icons_week_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icons/week.png */ \"./src/icons/week.png\");\n/* harmony import */ var _icons_priority_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icons/priority.png */ \"./src/icons/priority.png\");\n/* harmony import */ var _icons_duedate_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icons/duedate.png */ \"./src/icons/duedate.png\");\n/* harmony import */ var _icons_nav_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./icons/nav.png */ \"./src/icons/nav.png\");\n\n\n\n\n\n\n\n\n\n// navbar: create & functions\nconst navbar = (() => {\n    const navbar = document.querySelector('div.nav');\n    let projContainer;\n    const createNav = () => {\n        // create 3 subsections: home, sort feature, and projects menu\n        const homeContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"homeContainer\"});\n        const sortContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"sortContainer\"});\n        projContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"projContainer\"});\n        navbar.appendChild(homeContainer);\n        navbar.appendChild(sortContainer);\n        navbar.appendChild(projContainer);\n        // content in each subsection\n        // home\n        const homeBtn = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {\"class\": \"homeBtn\", \"id\": \"homeBtn\"});\n        const homeIcon = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {\"src\": `${_icons_home_png__WEBPACK_IMPORTED_MODULE_1__}`, \"alt\": \"Home\"});\n        homeBtn.appendChild(homeIcon);\n        const homeBtnLabel = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {\"for\": \"homeBtn\"});\n        homeBtnLabel.textContent = \"Home\";\n        // add home icon?\n        homeContainer.appendChild(homeBtn);\n        homeContainer.appendChild(homeBtnLabel);\n\n        // sort\n        const sortText = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"sortText\"});\n        sortText.textContent = \"Sort To-Dos\";\n        sortContainer.appendChild(sortText);\n        const todayContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"todayContainer\"});\n        const todayBtn = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {\"class\": \"todayBtn\", \"id\": \"todayBtn\"});\n        const todayIcon = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {\"src\": `${_icons_day_png__WEBPACK_IMPORTED_MODULE_2__}`, \"alt\": \"Today\"});\n        todayBtn.appendChild(todayIcon);\n        const todayBtnLabel = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {\"for\": \"todayBtn\"});\n        todayBtnLabel.textContent = \"Today\";\n        sortContainer.appendChild(todayContainer);\n        todayContainer.appendChild(todayBtn);\n        todayContainer.appendChild(todayBtnLabel);\n        const weekContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"weekContainer\"});\n        const weekBtn = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {\"class\": \"weekBtn\", \"id\": \"weekBtn\"});\n        const weekIcon = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {\"src\": `${_icons_week_png__WEBPACK_IMPORTED_MODULE_3__}`, \"alt\": \"Week\"});\n        weekBtn.appendChild(weekIcon);\n        const weekBtnLabel = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {\"for\": \"weekBtn\"});\n        weekBtnLabel.textContent = \"Week\";\n        sortContainer.appendChild(weekContainer);\n        weekContainer.appendChild(weekBtn);\n        weekContainer.appendChild(weekBtnLabel);\n        const priorityNavContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"priorityNavContainer\"});\n        const priorityNavBtn = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {\"class\": \"priorityNavBtn\", \"id\": \"priorityNavBtn\"});\n        const priorityIcon = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {\"src\": `${_icons_priority_png__WEBPACK_IMPORTED_MODULE_4__}`, \"alt\": \"Priority\"});\n        priorityNavBtn.appendChild(priorityIcon);\n        const priorityNavBtnLabel = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {\"for\": \"priorityNavBtn\"});\n        priorityNavBtnLabel.textContent = \"Priority\";\n        sortContainer.appendChild(priorityNavContainer);\n        priorityNavContainer.appendChild(priorityNavBtn);\n        priorityNavContainer.appendChild(priorityNavBtnLabel);\n        const dateNavContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"dateNavContainer\"});\n        const dateNavBtn = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {\"class\": \"dateNavBtn\", \"id\": \"dateNavBtn\"});\n        const dateIcon = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {\"src\": `${_icons_duedate_png__WEBPACK_IMPORTED_MODULE_5__}`, \"alt\": \"Due Date\"});\n        dateNavBtn.appendChild(dateIcon);\n        const dateNavBtnLabel = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {\"for\": \"dateNavBtn\"});\n        dateNavBtnLabel.textContent = \"Due Date\";\n        sortContainer.appendChild(dateNavContainer);\n        dateNavContainer.appendChild(dateNavBtn);\n        dateNavContainer.appendChild(dateNavBtnLabel);\n        // should I have used a fn to dynamically create that? ^^^\n        // listeners for those^^ !!!\n\n        // project\n        const projectText = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"projectText\"});\n        projectText.textContent = \"Projects\";\n        projContainer.appendChild(projectText);\n    }\n    // when user adds a project to the dropdown, I want to add the project to the nav\n    // \n    const newProject = (input) => {\n        // create container\n        let container = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": `${input}Container`});\n        // create button\n        let button = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {\"class\": `${input}Btn`, \"id\": `${input}Btn`});\n        let icon = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {\"src\": `${_icons_nav_png__WEBPACK_IMPORTED_MODULE_6__}`, \"alt\": `Project ${input}`});\n\n        // create label\n        let label = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {\"for\": `${input}BtnLabel`});\n        label.textContent = `${input}`;\n        // it will need a listener\n        // listenerFn....runs ProjectNavFn(projectNameHere)\n        // that function can sort the display to only include those projects...\n        projContainer.appendChild(container);\n        container.appendChild(button);\n        button.appendChild(icon);\n        container.appendChild(label);\n        // could have the third argument be the function to have the listener run...\n        // could use this fn to dynamically create the sort zone too...\n    }\n\n    return { createNav, newProject };\n})();\n\n\n\n\n//# sourceURL=webpack://todo/./src/navbar.js?");

/***/ }),

/***/ "./src/objectOps.js":
/*!**************************!*\
  !*** ./src/objectOps.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cardFactory\": () => (/* binding */ cardFactory),\n/* harmony export */   \"objectOps\": () => (/* binding */ objectOps)\n/* harmony export */ });\n/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorage */ \"./src/localStorage.js\");\n\n\nconst cardFactory = (title, project, priority, dueDate, notes, checked, value) => {\n    return { title, project, priority, dueDate, notes, checked, value, expanded: false, editable: true, properties: [\"title\", \"project\", \"priority\", \"dueDate\", \"notes\", \"checked\"] }\n}\nconst objectOps = (() => {\n    let objectArray = [];\n    const addToObjectArray = (object) => {\n        objectOps.objectArray.push(object);\n        // save/update local storage\n        _localStorage__WEBPACK_IMPORTED_MODULE_0__.ls.saveArray(objectOps.objectArray, \"obj\");\n    }\n    const deleteFromObjectArray = (object) => {\n        let filteredArray = objectOps.objectArray.filter((index) => index !== object);\n        objectOps.objectArray = filteredArray;\n        _localStorage__WEBPACK_IMPORTED_MODULE_0__.ls.saveArray(objectOps.objectArray, \"obj\");\n        // does this need to return the updated array? !!!\n    }\n    let projectArray = [];\n    // this is going to need a sort function to weed out \"\" (empty) projects and the like. !!! did current version work?\n    // needs a clear function before this is run (to make sure projectArray is empty), or run a check to see if project already exists or if it needs to be added to the projectArray !!!\n    const addToProjectArray = (array) => {\n        array.forEach(index => {\n            if (index.project == \"\" || index.project == null || index.project == undefined) {\n                let blank;\n                blank.push(index.project);\n            } else {\n                objectOps.projectArray.push(index.project);\n            }\n        })\n        // save/update local storage\n        _localStorage__WEBPACK_IMPORTED_MODULE_0__.ls.saveArray(objectOps.projectArray, \"proj\");\n    }\n    const addSingleToProjectArray = (input) => {\n        objectOps.projectArray.push(input);\n        _localStorage__WEBPACK_IMPORTED_MODULE_0__.ls.saveArray(objectOps.projectArray, \"proj\");\n    }\n    const deleteFromProjectArray = (object) => {\n        if (object.project == \"\") {\n            return;\n        } else {\n            // check if other objects are also in the same project, or if this object is the only one\n            let project = objectOps.objectArray.filter(index => index.project === object.project);\n            if (project.length == 1) {\n                let filteredArray = objectOps.projectArray.filter(index => index !== object.project);\n                objectOps.projectArray = filteredArray;\n            }\n        }\n        _localStorage__WEBPACK_IMPORTED_MODULE_0__.ls.saveArray(objectOps.projectArray, \"proj\");\n        // does this need to return the updated array?? !!!\n    }\n    // object operations\n    // update the object with input data (in array)\n    const update = (object, array) => {\n        for (let i=0; i<array.length; i++) {\n            object[object.properties[i]] = array[i];\n        }\n        // update local storage\n        _localStorage__WEBPACK_IMPORTED_MODULE_0__.ls.saveArray(objectOps.objectArray, \"obj\");\n    }\n    const updateSingle = (object, key, input) => {\n        object[key] = input;\n    }\n    // update the checkmark (if to-do is complete)\n    const updateCheck = (input) => {\n        let object = getObject(input.parentElement.parentElement);\n        if (input.checked) {\n            object.checked = true;\n        } else {\n            object.checked = false;\n        }\n        _localStorage__WEBPACK_IMPORTED_MODULE_0__.ls.saveArray(objectOps.objectArray, \"obj\");\n    }\n    // needs updating once I have multiple objects... !!!\n    // needs to be passed the project as well..? or should it just sort through the main array of objects?\n    const getObject = (cardDiv) => {\n        let theValue = cardDiv.value;\n        let indexPosition = objectOps.objectArray.findIndex(object => {\n            return object.value == theValue;\n        });\n        // this works, but tried using find instead...can delete later \n        // for (i=0; i<objectArray.length; i++) {\n        //     if (objectArray[i].title == title) {\n        //         object = objectArray[i];\n        //     }\n        // }\n        return objectOps.objectArray[indexPosition];\n    }\n    return { addToObjectArray, addToProjectArray, addSingleToProjectArray, objectArray, projectArray, update, updateSingle, updateCheck, getObject, deleteFromObjectArray, deleteFromProjectArray }    \n})();\n\n\n\n//# sourceURL=webpack://todo/./src/objectOps.js?");

/***/ }),

/***/ "./src/openingModal.js":
/*!*****************************!*\
  !*** ./src/openingModal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createModal\": () => (/* binding */ createModal)\n/* harmony export */ });\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility */ \"./src/utility.js\");\n/* harmony import */ var _addToDo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addToDo */ \"./src/addToDo.js\");\n\n\n\n// create modal, show on page load\n// options: 1) blank slate 2) demo the app 3) load locally stored data\n\nconst createModal = () => {\n    let main = document.querySelector('div.main');\n    //\n    const modalContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"modalContainer\"});\n    const modalBox = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"modalBox\"});\n    // title\n    const title = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"modalTitle\"});\n    title.textContent = `Check Mate`;\n    // three options \n    const blank = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {\"type\": \"button\", \"class\": \"blank\", \"aria-label\": \"Blank Slate\", \"value\": \"Blank Slate\"});\n    const local = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {\"type\": \"button\", \"class\": \"local\", \"aria-label\": \"Check Local Storage\", \"value\": \"Check Local Storage\"});\n    const demo = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {\"type\": \"button\", \"class\": \"demo\", \"aria-label\": \"Demo App\", \"value\": \"Demo App\"});\n\n    // append it together\n    modalContainer.appendChild(modalBox);\n    modalBox.appendChild(title);\n    modalBox.appendChild(blank);\n    modalBox.appendChild(local);\n    modalBox.appendChild(demo);\n\n    main.appendChild(modalContainer);\n\n    const listeners = () => {\n        blank.addEventListener('click', () => {\n            console.log('blank');\n            modalContainer.style.display = \"none\";\n            main.children[1].children[1].appendChild(_addToDo__WEBPACK_IMPORTED_MODULE_1__.addToDo.addDOM());\n            _addToDo__WEBPACK_IMPORTED_MODULE_1__.addToDo.addListener();\n        });\n        local.addEventListener('click', () => {\n            console.log('local');\n        });\n        demo.addEventListener('click', () => {\n            console.log('demo');\n        });\n    }\n    listeners();\n}\n\n\n\n//# sourceURL=webpack://todo/./src/openingModal.js?");

/***/ }),

/***/ "./src/utility.js":
/*!************************!*\
  !*** ./src/utility.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createElement\": () => (/* binding */ createElement)\n/* harmony export */ });\n// DOM functions\n// helper functions to create DOM element and add attributes\nconst createElement = (type, attributes) => {\n    const newElement = document.createElement(`${type}`);\n    if (attributes == null) return newElement;\n    setAttributes(newElement, attributes);\n    return newElement;\n}\nconst setAttributes = (element, attributes) => {\n    Object.entries(attributes).forEach(([key, value]) => {\n        element.setAttribute(key, value);\n    })\n}\n\n\n//# sourceURL=webpack://todo/./src/utility.js?");

/***/ }),

/***/ "./src/github.png":
/*!************************!*\
  !*** ./src/github.png ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"1d0be6b574e3608586cd.png\";\n\n//# sourceURL=webpack://todo/./src/github.png?");

/***/ }),

/***/ "./src/headercheck.png":
/*!*****************************!*\
  !*** ./src/headercheck.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"7f14347a57375553bfec.png\";\n\n//# sourceURL=webpack://todo/./src/headercheck.png?");

/***/ }),

/***/ "./src/icons/add.png":
/*!***************************!*\
  !*** ./src/icons/add.png ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"42bcf144905d52c614ee.png\";\n\n//# sourceURL=webpack://todo/./src/icons/add.png?");

/***/ }),

/***/ "./src/icons/cancel.png":
/*!******************************!*\
  !*** ./src/icons/cancel.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"b696f6f2f33e98df6a89.png\";\n\n//# sourceURL=webpack://todo/./src/icons/cancel.png?");

/***/ }),

/***/ "./src/icons/day.png":
/*!***************************!*\
  !*** ./src/icons/day.png ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"dfdebe0342e830af904c.png\";\n\n//# sourceURL=webpack://todo/./src/icons/day.png?");

/***/ }),

/***/ "./src/icons/delete.png":
/*!******************************!*\
  !*** ./src/icons/delete.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"8f2168383cecacc23de0.png\";\n\n//# sourceURL=webpack://todo/./src/icons/delete.png?");

/***/ }),

/***/ "./src/icons/duedate.png":
/*!*******************************!*\
  !*** ./src/icons/duedate.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"af4ca1dc579356f39a53.png\";\n\n//# sourceURL=webpack://todo/./src/icons/duedate.png?");

/***/ }),

/***/ "./src/icons/edit.png":
/*!****************************!*\
  !*** ./src/icons/edit.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"054a742f2296eb7643e9.png\";\n\n//# sourceURL=webpack://todo/./src/icons/edit.png?");

/***/ }),

/***/ "./src/icons/expand.png":
/*!******************************!*\
  !*** ./src/icons/expand.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"9e1ba84ef20756fb365e.png\";\n\n//# sourceURL=webpack://todo/./src/icons/expand.png?");

/***/ }),

/***/ "./src/icons/home.png":
/*!****************************!*\
  !*** ./src/icons/home.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"810b61d4033010ce2ddb.png\";\n\n//# sourceURL=webpack://todo/./src/icons/home.png?");

/***/ }),

/***/ "./src/icons/nav.png":
/*!***************************!*\
  !*** ./src/icons/nav.png ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"c0a5192c686952052b0e.png\";\n\n//# sourceURL=webpack://todo/./src/icons/nav.png?");

/***/ }),

/***/ "./src/icons/priority.png":
/*!********************************!*\
  !*** ./src/icons/priority.png ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"0477af241c20cbf9dbbd.png\";\n\n//# sourceURL=webpack://todo/./src/icons/priority.png?");

/***/ }),

/***/ "./src/icons/save.png":
/*!****************************!*\
  !*** ./src/icons/save.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"4ce6e1decb69e6b38471.png\";\n\n//# sourceURL=webpack://todo/./src/icons/save.png?");

/***/ }),

/***/ "./src/icons/week.png":
/*!****************************!*\
  !*** ./src/icons/week.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"f70dfc1396ebb87edfd6.png\";\n\n//# sourceURL=webpack://todo/./src/icons/week.png?");

/***/ }),

/***/ "./src/linkedin.png":
/*!**************************!*\
  !*** ./src/linkedin.png ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"93aeb677ca64ec9026ed.png\";\n\n//# sourceURL=webpack://todo/./src/linkedin.png?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;