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

const addNoteForm = () => {
    const addNote = document.createElement('div');
    addNote.classList.add('addNote');
    body.appendChild(addNote);
    const titleInputLabel = document.createElement('label');
    titleInputLabel.setAttribute('for', 'titleInput');
    titleInputLabel.textContent = "Title:";
    const titleInput = document.createElement('input');
    titleInput.classList.add('titleInput');
    titleInput.setAttribute('id', 'titleInput');
    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'priorityInput');
    priorityLabel.textContent = "Priority:";
    const priorityInputList = document.createElement('div');
    priorityInputList.setAttribute('id', 'priorityInput')
    priorityInputList.classList.add('priorityInputList');
    const lowbtn = document.createElement('button');
    lowbtn.setAttribute('type', 'radio');
    lowbtn.setAttribute('name', 'priorityInput');
    lowbtn.setAttribute('id', 'lowbtn');
    lowbtn.classList.add('lowbtn');
    const lowbtnLabel = document.createElement('label');
    lowbtnLabel.setAttribute('for', 'lowbtn');
    lowbtnLabel.textContent = "Low";
    const medbtn = document.createElement('button');
    medbtn.setAttribute('type', 'radio');
    medbtn.setAttribute('name', 'priorityInput');
    medbtn.setAttribute('id', 'medbtn');
    medbtn.classList.add('medbtn');
    const medbtnLabel = document.createElement('label');
    medbtnLabel.setAttribute('for', 'medbtn');
    medbtnLabel.textContent = "Medium";
    const highbtn = document.createElement('button');
    highbtn.setAttribute('type', 'radio');
    highbtn.setAttribute('name', 'priorityInput');
    highbtn.setAttribute('id', 'highbtn');
    highbtn.classList.add('highbtn');
    const highbtnLabel = document.createElement('label');
    highbtnLabel.setAttribute('for', 'highbtn');
    highbtnLabel.textContent = "High";
    const defconbtn = document.createElement('button');
    defconbtn.setAttribute('type', 'radio');
    defconbtn.setAttribute('name', 'priorityInput');
    defconbtn.setAttribute('id', 'defconbtn');
    defconbtn.classList.add('defconbtn');
    const defconbtnLabel = document.createElement('label');
    defconbtnLabel.setAttribute('for', 'defconbtn');
    defconbtnLabel.textContent = "Defcon";
    const dateInput = document.createElement('div');
    dateInput.classList.add('dateInput');
    dateInput.textContent = "Date Input";
    addNote.appendChild(titleInputLabel);
    addNote.appendChild(titleInput);
    addNote.appendChild(priorityLabel);
    addNote.appendChild(priorityInputList);
    priorityInputList.appendChild(lowbtn);
    priorityInputList.appendChild(lowbtnLabel);
    priorityInputList.appendChild(medbtn);
    priorityInputList.appendChild(medbtnLabel);
    priorityInputList.appendChild(highbtn);
    priorityInputList.appendChild(highbtnLabel);
    priorityInputList.appendChild(defconbtn);
    priorityInputList.appendChild(defconbtnLabel);
    addNote.appendChild(dateInput);
}
addNoteForm();

// const checkListener = (input) => {
//     input.setAttribute('onclick', 'checkboxFn()')
// }
// const checkboxFn = () => {
//     console.log('checked!')
// }
// const deleteListener = (input) => {
//     input.addEventListener('click', (e) => {deleteFn(e)});
// }
// const deleteFn = (event) => {
//     body.removeChild(event.target.parentElement);
// }

// const makeNote = (object) => {
//     let card = document.createElement('div');
//     card.classList.add('card');
//     let checkbox = document.createElement('button');
//     checkbox.classList.add('checkbox');
//     checkbox.setAttribute('id', 'checkbox');
//     checkbox.setAttribute('aria-label', "Unchecked");
//     if (object.checked == true) {
//         checkbox.classList.toggle('checked');
//         checkbox.setAttribute('aria-label', 'Checked');
//     }
//     checkListener(checkbox);
//     let title = document.createElement('div');
//     title.classList.add('title');
//     title.textContent = object.title;
//     let priority = document.createElement('div');
//     priority.classList.add('priority');
//     priority.textContent = object.priority;
//     let date = document.createElement('div');
//     date.classList.add('div');
//     date.textContent = object.dueDate;
//     let deletebtn = document.createElement('button');
//     deletebtn.classList.add('delete');
//     deletebtn.setAttribute('aria-label', 'Delete');
//     deleteListener(deletebtn);
//     deletebtn.textContent = 'Delete';
//     body.appendChild(card);
//     card.appendChild(checkbox);
//     card.appendChild(title);
//     card.appendChild(priority);
//     card.appendChild(date);
//     card.appendChild(deletebtn);
// }
// makeNote(first);
