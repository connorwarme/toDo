import { cardFactory, objectOps } from './objectOps.js';
import { createCard } from './createCard.js';
import { addToDo } from './addToDo.js';
import { ls, storageAvailable } from './localStorage.js';
import { createModal } from './openingModal.js';
import { makeHF } from './h&f.js';
import { navbar, navFns } from './navbar.js';

let first = cardFactory('update README', 'winning', 'High', '08/03/2022', 'kinda like the other dudes', false);
let second = cardFactory('doing it', "dudeage", "High", "08/16/2022", "all the time", false);
let third = cardFactory('round three', "winning", "Low", "08/04/2022", "", false);
let fourth = cardFactory('send the Honeymoon', "Diamond", "Defcon", "09/18/2022", "give er hell", false);
let fifth = cardFactory("Alpine Mission", "Ships Prow", "High", "08/14/2022", "", false);

let body = document.querySelector('div.body');

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
