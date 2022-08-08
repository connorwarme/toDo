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

/***/ "./src/localStorage.js":
/*!*****************************!*\
  !*** ./src/localStorage.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ls\": () => (/* binding */ ls)\n/* harmony export */ });\n// local storage\nconst ls = (() => {\n    // these work for both objectArray and projectArray\n    // take the array, stringify, and save it locally\n    const saveArray = (array, key) => {\n        // need to stringify data\n        let data = JSON.stringify(array);\n        // save to local\n        localStorage.setItem(key, data);\n    }\n    // not currently using this one.. !!!\n    const updateArrays = (array1, array2) => {\n        saveArray(array1, \"obj\");\n        saveArray(array2, \"proj\");\n    }\n    // get the local data, parse it, and return the array\n    const returnArray = (key) => {\n        let arrayString = localStorage.getItem(key);\n        let regularArray = JSON.parse(arrayString);\n        return regularArray;\n    }\n    const checkContent = (key) => {\n        let content = returnArray(key);\n        console.log(`checking for content ${content}`);\n        if (content === null || content[0] == undefined) {\n            return false;\n        } else {\n            return content;\n        }\n    }\n    return { saveArray, updateArrays, returnArray, checkContent }\n})();\n\n\n\n//# sourceURL=webpack://todo/./src/localStorage.js?");

/***/ }),

/***/ "./src/objectOps.js":
/*!**************************!*\
  !*** ./src/objectOps.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cardFactory\": () => (/* binding */ cardFactory),\n/* harmony export */   \"objectOps\": () => (/* binding */ objectOps)\n/* harmony export */ });\n/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorage */ \"./src/localStorage.js\");\n\n\nconst cardFactory = (title, project, priority, dueDate, notes, checked, value) => {\n    return { title, project, priority, dueDate, notes, checked, value, expanded: false, editable: true, properties: [\"title\", \"project\", \"priority\", \"dueDate\", \"notes\", \"checked\"] }\n}\nconst objectOps = (() => {\n    let objectArray = [];\n    const addToObjectArray = (object) => {\n        objectOps.objectArray.push(object);\n        // save/update local storage\n        _localStorage__WEBPACK_IMPORTED_MODULE_0__.ls.saveArray(objectOps.objectArray, \"obj\");\n    }\n    const deleteFromObjectArray = (object) => {\n        let filteredArray = objectOps.objectArray.filter((index) => index !== object);\n        objectOps.objectArray = filteredArray;\n        _localStorage__WEBPACK_IMPORTED_MODULE_0__.ls.saveArray(objectOps.objectArray, \"obj\");\n        // does this need to return the updated array? !!!\n    }\n    let projectArray = [];\n    // this is going to need a sort function to weed out \"\" (empty) projects and the like. !!! did current version work?\n    // needs a clear function before this is run (to make sure projectArray is empty), or run a check to see if project already exists or if it needs to be added to the projectArray !!!\n    const addToProjectArray = (array) => {\n        array.forEach(index => {\n            if (index.project == \"\" || index.project == null || index.project == undefined) {\n                console.log(index.project);\n            } else {\n                if (!(_checkProjectArray(index.project))) {\n                    objectOps.projectArray.push(index.project);\n                }\n            }\n        })\n        // save/update local storage\n        _localStorage__WEBPACK_IMPORTED_MODULE_0__.ls.saveArray(objectOps.projectArray, \"proj\");\n    }\n    const addSingleToProjectArray = (input) => {\n        objectOps.projectArray.push(input);\n        _localStorage__WEBPACK_IMPORTED_MODULE_0__.ls.saveArray(objectOps.projectArray, \"proj\");\n    }\n    // an attempt at a check to see if project already exists in array\n    const _checkProjectArray = (input) => {\n        console.log(objectOps.projectArray);\n        let check = objectOps.projectArray.find(index => {\n            return index == input;\n        })\n        console.log(check);\n        if (check == undefined) {\n            return false;\n        } else {\n            return true;\n        }\n    }\n    const checkAndAdd = (input) => {\n        if (!(_checkProjectArray(input))) {\n            addSingleToProjectArray(input);\n            return true;\n        } else {\n            alert(`This project already exists! For a new project, choose a new name.`);\n            return false;\n        }\n    }\n    const deleteFromProjectArray = (object) => {\n        if (object.project == \"\") {\n            return;\n        } else {\n            // check if other objects are also in the same project, or if this object is the only one\n            let project = objectOps.objectArray.filter(index => index.project === object.project);\n            if (project.length == 1) {\n                _deleteProject(object.project);\n            }\n        }\n        // does this need to return the updated array?? !!!\n    }\n    const deleteProjectNavbar = (project) => {\n        console.log(`this is the project ${project}`);\n        // find objects with this project, reset project value\n        let resetArray = objectOps.objectArray.filter(index => index.project === project);\n        resetArray.forEach(index => index.project = \"\");\n        // update local storage\n        _localStorage__WEBPACK_IMPORTED_MODULE_0__.ls.saveArray(objectOps.objectArray, \"obj\");\n        // delete project from project Array\n        _deleteProject(project);\n    }\n    const _deleteProject = (project) => {\n        // filter out all the other projects\n        let filteredArray = objectOps.projectArray.filter(index => index !== project);\n        // update the projectArray\n        objectOps.projectArray = filteredArray;\n        // update the local storage\n        _localStorage__WEBPACK_IMPORTED_MODULE_0__.ls.saveArray(objectOps.projectArray, \"proj\");\n    }\n    // object operations\n    // update the object with input data (in array)\n    const update = (object, array) => {\n        for (let i=0; i<array.length; i++) {\n            object[object.properties[i]] = array[i];\n        }\n        // update local storage\n        _localStorage__WEBPACK_IMPORTED_MODULE_0__.ls.saveArray(objectOps.objectArray, \"obj\");\n    }\n    const updateSingle = (object, key, input) => {\n        object[key] = input;\n    }\n    // update the checkmark (if to-do is complete)\n    const updateCheck = (input) => {\n        let object = getObject(input.parentElement.parentElement);\n        if (input.classList[1] == \"checked\") {\n            object.checked = true;\n        } else {\n            object.checked = false;\n        }\n        _localStorage__WEBPACK_IMPORTED_MODULE_0__.ls.saveArray(objectOps.objectArray, \"obj\");\n    }\n    // needs updating once I have multiple objects... !!!\n    // needs to be passed the project as well..? or should it just sort through the main array of objects?\n    const getObject = (cardDiv) => {\n        let theObject = cardDiv.value;\n        let indexPosition = objectOps.objectArray.findIndex(object => {\n            return object == theObject;\n        });\n        // this works, but tried using find instead...can delete later \n        // for (i=0; i<objectArray.length; i++) {\n        //     if (objectArray[i].title == title) {\n        //         object = objectArray[i];\n        //     }\n        // }\n        return objectOps.objectArray[indexPosition];\n    }\n    return { addToObjectArray, addToProjectArray, addSingleToProjectArray, checkAndAdd, objectArray, projectArray, update, updateSingle, updateCheck, getObject, deleteFromObjectArray, deleteFromProjectArray, deleteProjectNavbar }    \n})();\n\n\n\n//# sourceURL=webpack://todo/./src/objectOps.js?");

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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/objectOps.js");
/******/ 	
/******/ })()
;