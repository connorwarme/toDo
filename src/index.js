import { cardFactory, objectOps } from './objectOps.js';
import { createCard } from './createCard.js';
import { add } from './addToDo.js'


let first = cardFactory('update README', 'winning', 'High', '07/14/22', 'kinda like the other dudes', false);
let second = cardFactory('doing it', "dudeage", "High", "", "all the time", false);
objectOps.addToObjectArray(first);
objectOps.addToObjectArray(second);
objectOps.addToProjectArray(objectOps.objectArray);
let body = document.querySelector('div.body');
body.appendChild(add());
body.appendChild(createCard(first));
body.appendChild(createCard(second));