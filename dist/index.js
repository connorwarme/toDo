const noteFactory = (title, project, priority, dueDate, notes, checked) => {
    return { title, project, priority, dueDate, notes, checked }
}
let first = noteFactory('update README', '', 'high', '07/14/22', 'kinda like the other dudes', false);

let body = document.querySelector('div.body');

const projectFactory = (name) => {
    return { name };
}
let fine = {
    id: '0',
}
let primo = projectFactory('primo');
console.log(primo);

const addToProject = (project, object) => {
    let x = Object.keys(project).length;
    project[x] = object;
}
addToProject(primo, fine);
console.log(primo);
addToProject(primo, first);

const checkListener = (input) => {
    input.setAttribute('onclick', 'checkboxFn()')
}
const checkboxFn = () => {
    console.log('checked!')
}
const deleteListener = (input) => {
    input.addEventListener('click', (e) => {deleteFn(e)});
}
const deleteFn = (event) => {
    body.removeChild(event.target.parentElement);
}

const makeNote = (object) => {
    let card = document.createElement('div');
    card.classList.add('card');
    let checkbox = document.createElement('button');
    checkbox.classList.add('checkbox');
    checkbox.setAttribute('id', 'checkbox');
    checkbox.setAttribute('aria-label', "Unchecked");
    if (object.checked == true) {
        checkbox.classList.toggle('checked');
        checkbox.setAttribute('aria-label', 'Checked');
    }
    checkListener(checkbox);
    let title = document.createElement('div');
    title.classList.add('title');
    title.textContent = object.title;
    let priority = document.createElement('div');
    priority.classList.add('priority');
    priority.textContent = object.priority;
    let date = document.createElement('div');
    date.classList.add('div');
    date.textContent = object.dueDate;
    let deletebtn = document.createElement('button');
    deletebtn.classList.add('delete');
    deletebtn.setAttribute('aria-label', 'Delete');
    deleteListener(deletebtn);
    deletebtn.textContent = 'Delete';
    body.appendChild(card);
    card.appendChild(checkbox);
    card.appendChild(title);
    card.appendChild(priority);
    card.appendChild(date);
    card.appendChild(deletebtn);
}
makeNote(first);
