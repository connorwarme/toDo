import { cardFactory, objectOps } from './objectOps.js';
import { createCard } from './createCard.js';
import { add, addFn } from './addToDo.js';
import { ls } from './localStorage.js';


let first = cardFactory('update README', 'winning', 'High', '07/14/22', 'kinda like the other dudes', false);
let second = cardFactory('doing it', "dudeage", "High", "", "all the time", false);
objectOps.addToObjectArray(first);
objectOps.addToObjectArray(second);
objectOps.addToProjectArray(objectOps.objectArray);
let body = document.querySelector('div.body');
body.appendChild(add());
body.appendChild(createCard(first));
body.appendChild(createCard(second));
body.appendChild(addFn());
ls.saveArray(objectOps.objectArray, "obj");
console.log(ls.returnArray("obj"));
ls.saveArray(objectOps.projectArray, "proj");
console.log(ls.returnArray("proj"));
