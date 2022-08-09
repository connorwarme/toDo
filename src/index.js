import { cardFactory, objectOps } from './objectOps.js';
import { createCard } from './createCard.js';
import { addFn } from './addToDo.js';
import { ls } from './localStorage.js';
import { createModal } from './openingModal.js';
import { makeHF } from './h&f.js';
import { navbar, navFns } from './navbar.js';


let first = cardFactory('update README', 'winning', 'High', '08/03/2022', 'kinda like the other dudes', false);
let second = cardFactory('doing it', "dudeage", "High", "08/16/2022", "all the time", false);
let third = cardFactory('round three', "winning", "Low", "08/04/2022", "", false);
let fourth = cardFactory('send the Honeymoon', "Diamond", "Defcon", "09/18/2022", "give er hell", false);
console.log(first);
// if (ls.checkContent("obj") == false) {
objectOps.addToObjectArray(first);
objectOps.addToObjectArray(second);
objectOps.addToObjectArray(third);
objectOps.addToObjectArray(fourth);
objectOps.addToProjectArray(objectOps.objectArray);
// }
let body = document.querySelector('div.body');

body.appendChild(createCard(first));
body.appendChild(createCard(second));
body.appendChild(createCard(third));
body.appendChild(createCard(fourth));
// body.appendChild(addFn());
// ls.saveArray(objectOps.objectArray, "obj");
// let x = ls.returnArray("obj");
// console.log(x);
// for (let i=0; i<x.length; i++) {
//     body.appendChild(createCard(x[i]));
// }
// ls.saveArray(objectOps.projectArray, "proj");
// console.log(ls.returnArray("proj"));
objectOps.objectArray = ls.returnArray("obj");
objectOps.projectArray = ls.returnArray("proj");
// // 
console.log(objectOps.objectArray);
console.log(objectOps.projectArray);
// console.log(ls.checkContent("obj"));
// createModal();
makeHF();
navbar.createNav();
// navbar.newProject('winning');

navFns.dueDateFn([first, second, third, fourth]);
console.log(first);