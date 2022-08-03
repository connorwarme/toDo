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

/***/ "./src/navbar.js":
/*!***********************!*\
  !*** ./src/navbar.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"navbar\": () => (/* binding */ navbar)\n/* harmony export */ });\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility */ \"./src/utility.js\");\n/* harmony import */ var _icons_home_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icons/home.png */ \"./src/icons/home.png\");\n/* harmony import */ var _icons_day_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icons/day.png */ \"./src/icons/day.png\");\n/* harmony import */ var _icons_week_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icons/week.png */ \"./src/icons/week.png\");\n/* harmony import */ var _icons_priority_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icons/priority.png */ \"./src/icons/priority.png\");\n/* harmony import */ var _icons_duedate_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icons/duedate.png */ \"./src/icons/duedate.png\");\n/* harmony import */ var _icons_nav_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./icons/nav.png */ \"./src/icons/nav.png\");\n\n\n\n\n\n\n\n\n\n// navbar: create & functions\nconst navbar = (() => {\n    const navbar = document.querySelector('div.nav');\n    let projContainer;\n    const createNav = () => {\n        // create 3 subsections: home, sort feature, and projects menu\n        const homeContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"homeContainer\"});\n        const sortContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"sortContainer\"});\n        projContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"projContainer\"});\n        navbar.appendChild(homeContainer);\n        navbar.appendChild(sortContainer);\n        navbar.appendChild(projContainer);\n        // content in each subsection\n        // home\n        const homeBtn = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {\"class\": \"homeBtn\", \"id\": \"homeBtn\"});\n        const homeIcon = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {\"src\": `${_icons_home_png__WEBPACK_IMPORTED_MODULE_1__}`, \"alt\": \"Home\"});\n        homeBtn.appendChild(homeIcon);\n        const homeBtnLabel = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {\"for\": \"homeBtn\"});\n        homeBtnLabel.textContent = \"Home\";\n        // add home icon?\n        homeContainer.appendChild(homeBtn);\n        homeContainer.appendChild(homeBtnLabel);\n\n        // sort\n        const sortText = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"sortText\"});\n        sortText.textContent = \"Sort To-Dos\";\n        sortContainer.appendChild(sortText);\n        const todayContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"todayContainer\"});\n        const todayBtn = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {\"class\": \"todayBtn\", \"id\": \"todayBtn\"});\n        const todayIcon = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {\"src\": `${_icons_day_png__WEBPACK_IMPORTED_MODULE_2__}`, \"alt\": \"Today\"});\n        todayBtn.appendChild(todayIcon);\n        const todayBtnLabel = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {\"for\": \"todayBtn\"});\n        todayBtnLabel.textContent = \"Today\";\n        sortContainer.appendChild(todayContainer);\n        todayContainer.appendChild(todayBtn);\n        todayContainer.appendChild(todayBtnLabel);\n        const weekContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"weekContainer\"});\n        const weekBtn = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {\"class\": \"weekBtn\", \"id\": \"weekBtn\"});\n        const weekIcon = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {\"src\": `${_icons_week_png__WEBPACK_IMPORTED_MODULE_3__}`, \"alt\": \"Week\"});\n        weekBtn.appendChild(weekIcon);\n        const weekBtnLabel = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {\"for\": \"weekBtn\"});\n        weekBtnLabel.textContent = \"Week\";\n        sortContainer.appendChild(weekContainer);\n        weekContainer.appendChild(weekBtn);\n        weekContainer.appendChild(weekBtnLabel);\n        const priorityNavContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"priorityNavContainer\"});\n        const priorityNavBtn = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {\"class\": \"priorityNavBtn\", \"id\": \"priorityNavBtn\"});\n        const priorityIcon = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {\"src\": `${_icons_priority_png__WEBPACK_IMPORTED_MODULE_4__}`, \"alt\": \"Priority\"});\n        priorityNavBtn.appendChild(priorityIcon);\n        const priorityNavBtnLabel = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {\"for\": \"priorityNavBtn\"});\n        priorityNavBtnLabel.textContent = \"Priority\";\n        sortContainer.appendChild(priorityNavContainer);\n        priorityNavContainer.appendChild(priorityNavBtn);\n        priorityNavContainer.appendChild(priorityNavBtnLabel);\n        const dateNavContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"dateNavContainer\"});\n        const dateNavBtn = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {\"class\": \"dateNavBtn\", \"id\": \"dateNavBtn\"});\n        const dateIcon = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {\"src\": `${_icons_duedate_png__WEBPACK_IMPORTED_MODULE_5__}`, \"alt\": \"Due Date\"});\n        dateNavBtn.appendChild(dateIcon);\n        const dateNavBtnLabel = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {\"for\": \"dateNavBtn\"});\n        dateNavBtnLabel.textContent = \"Due Date\";\n        sortContainer.appendChild(dateNavContainer);\n        dateNavContainer.appendChild(dateNavBtn);\n        dateNavContainer.appendChild(dateNavBtnLabel);\n        // should I have used a fn to dynamically create that? ^^^\n        // listeners for those^^ !!!\n\n        // project\n        const projectText = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"projectText\"});\n        projectText.textContent = \"Projects\";\n        projContainer.appendChild(projectText);\n    }\n    // when user adds a project to the dropdown, I want to add the project to the nav\n    // \n    const newProject = (input) => {\n        // create container\n        let container = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": `${input}Container`});\n        // create button\n        let button = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {\"class\": `${input}Btn`, \"id\": `${input}Btn`});\n        let icon = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {\"src\": `${_icons_nav_png__WEBPACK_IMPORTED_MODULE_6__}`, \"alt\": `Project ${input}`});\n\n        // create label\n        let label = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {\"for\": `${input}BtnLabel`});\n        label.textContent = `${input}`;\n        // it will need a listener\n        // listenerFn....runs ProjectNavFn(projectNameHere)\n        // that function can sort the display to only include those projects...\n        projContainer.appendChild(container);\n        container.appendChild(button);\n        button.appendChild(icon);\n        container.appendChild(label);\n        // could have the third argument be the function to have the listener run...\n        // could use this fn to dynamically create the sort zone too...\n    }\n\n    return { createNav, newProject };\n})();\n\n\n\n\n//# sourceURL=webpack://todo/./src/navbar.js?");

/***/ }),

/***/ "./src/utility.js":
/*!************************!*\
  !*** ./src/utility.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createElement\": () => (/* binding */ createElement)\n/* harmony export */ });\n// DOM functions\n// helper functions to create DOM element and add attributes\nconst createElement = (type, attributes) => {\n    const newElement = document.createElement(`${type}`);\n    if (attributes == null) return newElement;\n    setAttributes(newElement, attributes);\n    return newElement;\n}\nconst setAttributes = (element, attributes) => {\n    Object.entries(attributes).forEach(([key, value]) => {\n        element.setAttribute(key, value);\n    })\n}\n\n\n//# sourceURL=webpack://todo/./src/utility.js?");

/***/ }),

/***/ "./src/icons/day.png":
/*!***************************!*\
  !*** ./src/icons/day.png ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"dfdebe0342e830af904c.png\";\n\n//# sourceURL=webpack://todo/./src/icons/day.png?");

/***/ }),

/***/ "./src/icons/duedate.png":
/*!*******************************!*\
  !*** ./src/icons/duedate.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"af4ca1dc579356f39a53.png\";\n\n//# sourceURL=webpack://todo/./src/icons/duedate.png?");

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

/***/ "./src/icons/week.png":
/*!****************************!*\
  !*** ./src/icons/week.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"f70dfc1396ebb87edfd6.png\";\n\n//# sourceURL=webpack://todo/./src/icons/week.png?");

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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/navbar.js");
/******/ 	
/******/ })()
;