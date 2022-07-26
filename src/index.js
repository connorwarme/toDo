import { cardFactory } from './modA.js';
import { createCard } from './createCard.js';


let first = cardFactory('update README', 'winning', 'High', '07/14/22', 'kinda like the other dudes', false);
let second = cardFactory('doing it', "dudeage", "High", "", "all the time", false);

let body = document.querySelector('div.body');
body.appendChild(createCard(first));