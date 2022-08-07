import { createElement } from "./utility";
import { addToDo } from "./addToDo";
import Check from './icons/checkcircle.svg';

// create modal, show on page load
// options: 1) blank slate 2) demo the app 3) load locally stored data

const createModal = () => {
    let main = document.querySelector('div.main');
    //
    const modalContainer = createElement('div', {"class": "modalContainer"});
    const modalBox = createElement('div', {"class": "modalBox"});
    // title
    const title = createElement('div', {"class": "modalTitle"});
    const check = createElement('img', {"src": `${Check}`, "alt": "Check"});
    title.textContent = `Mate`;
    // three options 
    const blank = createElement('input', {"type": "button", "class": "blank", "aria-label": "Blank Slate", "value": "Blank Slate"});
    const local = createElement('input', {"type": "button", "class": "local", "aria-label": "Check Local Storage", "value": "Check Local Storage"});
    const demo = createElement('input', {"type": "button", "class": "demo", "aria-label": "Demo App", "value": "Demo App"});

    // append it together
    modalContainer.appendChild(modalBox);
    modalBox.appendChild(title);
    title.appendChild(check);
    modalBox.appendChild(blank);
    modalBox.appendChild(local);
    modalBox.appendChild(demo);

    main.appendChild(modalContainer);

    const listeners = () => {
        blank.addEventListener('click', () => {
            console.log('blank');
            modalContainer.style.display = "none";
            main.children[1].children[1].appendChild(addToDo.addDOM());
            addToDo.addListener();
        });
        local.addEventListener('click', () => {
            console.log('local');
        });
        demo.addEventListener('click', () => {
            console.log('demo');
        });
    }
    listeners();
}

export { createModal };