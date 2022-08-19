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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ls\": () => (/* binding */ ls),\n/* harmony export */   \"storageAvailable\": () => (/* binding */ storageAvailable)\n/* harmony export */ });\n// local storage\nconst ls = (() => {\n    // these work for both objectArray and projectArray\n    // take the array, stringify, and save it locally\n    const saveArray = (array, key) => {\n        // need to stringify data\n        let data = JSON.stringify(array);\n        // save to local\n        localStorage.setItem(key, data);\n    }\n    const updateArrays = (array1, array2) => {\n        saveArray(array1, \"obj\");\n        saveArray(array2, \"proj\");\n    }\n    // get the local data, parse it, and return the array\n    const returnArray = (key) => {\n        let arrayString = localStorage.getItem(key);\n        let regularArray = JSON.parse(arrayString);\n        return regularArray;\n    }\n    // check local storage for \"key\" content\n    const checkContent = (key) => {\n        let content = returnArray(key);\n        if (content == null || content[0] == undefined) {\n            return false;\n        } else {\n            return content;\n        }\n    }\n    // clear the local storage\n    const clear = () => {\n        localStorage.removeItem(\"obj\");\n        localStorage.removeItem(\"proj\");\n    }\n    return { saveArray, updateArrays, returnArray, checkContent, clear }\n})();\n// check to see if local storage is supported and available\n// not sure if this is necessary...?\n// definitely if I needed to support older browsers, but I doubt many folks will visit the page\nfunction storageAvailable(type) {\n    let storage;\n    try {\n        storage = window[type];\n        const value = '__storage_test__';\n        storage.setItem(value, value);\n        storage.removeItem(value);\n        return true;\n    }\n    catch (e) {\n        return (e instanceof DOMException && (e.code === 22 || e.code === 1014 || e.name === `QuotaExceededError` || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && (storage && storage.length !== 0));\n    }\n    }\n\n\n\n//# sourceURL=webpack://todo/./src/localStorage.js?");

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
/******/ 	__webpack_modules__["./src/localStorage.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;