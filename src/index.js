import { cardFactory, objectOps } from './objectOps.js';
import { createCard } from './createCard.js';
import { add, addFn } from './addToDo.js'


let first = cardFactory('update README', 'winning', 'High', '07/14/22', 'kinda like the other dudes', false);
let second = cardFactory('doing it', "dudeage", "High", "", "all the time", false);
objectOps.addToObjectArray(first);
objectOps.addToObjectArray(second);
objectOps.addToProjectArray(objectOps.objectArray);
console.log(objectOps.objectArray);
let body = document.querySelector('div.body');
body.appendChild(add());
body.appendChild(createCard(first));
body.appendChild(createCard(second));
body.appendChild(addFn());
console.log(objectOps.projectArray);
let x = JSON.stringify(first);
console.log(x);
let y = JSON.parse(x);
console.log(y);