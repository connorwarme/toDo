// import { modA } from './modA.js';


const noteFactory = (title, project, priority, dueDate, notes, checked) => {
    return { title, project, priority, dueDate, notes, checked }
}
let first = noteFactory('update README', '', 'high', '07/14/22', 'kinda like the other dudes', false);

let body = document.querySelector('div.body');
let card = document.createElement('div');
card.textContent = `${first.title}`;
body.appendChild(card);

const projectFactory = (name) => {
    return { name };
}
let fine = {
    id: '0',
}
let primo = projectFactory('primo');
console.log(primo);
primo.note1 = {};

const addToProject = (project, note) => {
    let x = Object.keys(project).length + 1;
    project[x] = note;
}
addToProject(primo, fine);
console.log(primo);
addToProject(primo, first);