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

/***/ "./src/h&f.js":
/*!********************!*\
  !*** ./src/h&f.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"makeHF\": () => (/* binding */ makeHF)\n/* harmony export */ });\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility */ \"./src/utility.js\");\n/* harmony import */ var _icons_menu_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icons/menu.svg */ \"./src/icons/menu.svg\");\n// header and footer\n\nconst Header = new URL(/* asset import */ __webpack_require__(/*! ./src/headercheck.png */ \"./src/headercheck.png\"), __webpack_require__.b);\nconst Github = new URL(/* asset import */ __webpack_require__(/*! ./src/github.png */ \"./src/github.png\"), __webpack_require__.b);\nconst LinkedIn = new URL(/* asset import */ __webpack_require__(/*! ./src/linkedin.png */ \"./src/linkedin.png\"), __webpack_require__.b);\n\n\nconst makeHF = () => {\n    const header = () => {\n        let header = document.querySelector('div.header');\n        const menuBtn = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {\"class\": \"headerMenu\", \"aria-label\": \"Site Menu\"});\n        const menuIcon = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {\"src\": `${_icons_menu_svg__WEBPACK_IMPORTED_MODULE_1__}`, \"alt\": \"Menu\"});\n        let headerImgBox = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"headerImgBox\"});\n        const icon = new Image();\n        icon.src = Header;\n        let headerTextBox = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"headerTextBox\"});\n        headerTextBox.textContent = \"MATE\";\n\n        // append it all together\n        header.appendChild(menuBtn);\n        menuBtn.appendChild(menuIcon);\n        header.appendChild(headerImgBox);\n        headerImgBox.appendChild(icon);\n        header.appendChild(headerTextBox);\n    }\n    const footer = () => {\n        let footer = document.querySelector('div.footer');\n        let footerBox = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"footerBox\"});\n        let linkContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"linkContainer\"});\n        let gitLink = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', {\"href\": \"https://github.com/connorwarme\", \"alt\": \"Github Profile\", \"target\": \"_blank\"});\n        let gitIcon = new Image();\n        gitIcon.src = Github;\n        gitIcon.alt = \"Github Profile\";\n        let linkLink = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', {\"href\": \"https://www.linkedin.com/in/connor-warme-103a09167\", \"alt\": \"LinkedIn Profile\", \"target\": \"_blank\"});\n        let linkIcon = new Image();\n        linkIcon.src = LinkedIn;\n        linkIcon.alt = \"LinkedIn Profile\";\n        let textContainer = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\"class\": \"textContainer\"});\n        textContainer.textContent = \"Peregrinning Productions\";\n\n        // append it all together\n        footer.appendChild(footerBox);\n        footerBox.appendChild(linkContainer);\n        linkContainer.appendChild(gitLink);\n        gitLink.appendChild(gitIcon);\n        linkContainer.appendChild(linkLink);\n        linkLink.appendChild(linkIcon);\n        footerBox.appendChild(textContainer);\n    }\n    header();\n    footer();\n}\n\n\n//# sourceURL=webpack://todo/./src/h&f.js?");

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

/***/ "./src/icons/menu.svg":
/*!****************************!*\
  !*** ./src/icons/menu.svg ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"2d4061552fac064ed076.svg\";\n\n//# sourceURL=webpack://todo/./src/icons/menu.svg?");

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
/******/ 			"hf": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/h&f.js");
/******/ 	
/******/ })()
;