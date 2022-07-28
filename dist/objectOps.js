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

/***/ "./src/objectOps.js":
/*!**************************!*\
  !*** ./src/objectOps.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cardFactory\": () => (/* binding */ cardFactory),\n/* harmony export */   \"objectOps\": () => (/* binding */ objectOps)\n/* harmony export */ });\nconst cardFactory = (title, project, priority, dueDate, notes, checked) => {\n    return { title, project, priority, dueDate, notes, checked, expanded: false, editable: true, properties: [\"title\", \"project\", \"priority\", \"dueDate\", \"notes\", \"checked\"] }\n}\nconst objectOps = (() => {\n    let objectArray = [];\n    const addToObjectArray = (object) => {\n        objectArray.push(object);\n    }\n    const deleteFromObjectArray = (object) => {\n        let filteredArray = objectArray.filter((index) => index !== object);\n        objectArray = filteredArray;\n        // does this need to return the updated array? !!!\n    }\n    let projectArray = [];\n    // this is going to need a sort function to weed out \"\" (empty) projects and the like. !!! did current version work?\n    // needs a clear function before this is run (to make sure projectArray is empty), or run a check to see if project already exists or if it needs to be added to the projectArray !!!\n    const addToProjectArray = (array) => {\n        array.forEach(index => {\n            if (index.project == \"\" || index.project == null || index.project == undefined) {\n                let blank;\n                blank.push(index.project);\n            } else {\n                projectArray.push(index.project);\n            }\n        })\n    }\n    const deleteFromProjectArray = (object) => {\n        if (object.project == \"\") {\n            return;\n        } else {\n            // check if other objects are also in the same project, or if this object is the only one\n            let project = objectArray.filter(index => index.project === object.project);\n            console.log(project);\n            if (project.length == 1) {\n                console.log('fire');\n                let filteredArray = projectArray.filter(index => index !== object.project);\n                console.log(filteredArray);\n                projectArray = filteredArray;\n            }\n        }\n        console.log(projectArray);\n        // does this need to return the updated array?? !!!\n    }\n    // object operations\n    // update the object with input data (in array)\n    const update = (object, array) => {\n        for (let i=0; i<array.length; i++) {\n            object[object.properties[i]] = array[i];\n        }\n    }\n    // update the checkmark (if to-do is complete)\n    const updateCheck = (input) => {\n        let object = getObject(input.parentElement.parentElement);\n        if (input.checked) {\n            object.checked = true;\n        } else {\n            object.checked = false;\n        }\n    }\n    // needs updating once I have multiple objects... !!!\n    // needs to be passed the project as well..? or should it just sort through the main array of objects?\n    const getObject = (cardDiv) => {\n        let theTitle = cardDiv.children[0].children[1].children[0].textContent;\n        let object = objectArray.find(index => {\n            return index.title === theTitle;\n        });\n        // this works, but tried using find instead...can delete later \n        // for (i=0; i<objectArray.length; i++) {\n        //     if (objectArray[i].title == title) {\n        //         object = objectArray[i];\n        //     }\n        // }\n        return object;\n    }\n    return { addToObjectArray, addToProjectArray, objectArray, projectArray, update, updateCheck, getObject, deleteFromObjectArray, deleteFromProjectArray }    \n})();\n\n\n\n//# sourceURL=webpack://todo/./src/objectOps.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/objectOps.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;