import { objectOps } from './objectOps.js';
import { createModal } from './openingModal.js';
import { makeHF } from './h&f.js';
import { navbar, navFns } from './navbar.js';
// starting empty..?
console.log(objectOps.objectArray);
console.log(objectOps.projectArray);
// create opening modal with user options
createModal();
// create header and footer
makeHF();
// create navbar
navbar.createNav();
// detect screen width: whether or not to display nav
window.addEventListener('load', navFns.toggleNav());
// trying to get git to work...