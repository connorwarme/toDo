import { createElement } from "./utility";
import { addToDo } from "./addToDo";
import Check from './icons/checkcircle.svg';
import { ls, storageAvailable } from "./localStorage";
import { createCard } from "./createCard";
import { loadExistingProjects, navbar } from "./navbar";
import { objectOps } from "./objectOps";
import { demonstration } from "./demo";

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
    // close modal, display add to-do button w/ listener
    const standard = () => {
        modalContainer.style.display = "none";
        main.children[1].children[1].appendChild(addToDo.addDOM());
        addToDo.addListener();
    }
    let body = main.children[1].children[1].children[0];
    const listeners = () => {
        blank.addEventListener('click', () => {
            console.log('blank');
            standard();
            if (!(storageAvailable('localStorage'))) {
                alert(`App may not function properly due to problem with local storage.`)
            }
            // check if local storage is supported/available
            // that should be it..?
        });
        local.addEventListener('click', () => {
            console.log('local');
            standard();
            // check if local storage is s/a
            // check if any values exist (for obj, proj)
            // if yes, load them on the page
            // if no, load blank version
            let content = ls.checkContent('obj');
            if (content) {
                content.forEach(index => {
                    body.appendChild(createCard(index));
                })
                let projArray = ls.checkContent('proj');
                if (projArray) {
                    navbar.loadExistingProjects(projArray);
                }
                objectOps.objectArray = content;
                objectOps.projectArray = projArray;
            } else {
                alert(`Nothing found in local storage, starting with a blank slate.`);
            }
        });
        demo.addEventListener('click', () => {
            console.log('demo');
            standard();
            // pull in  a whole bunch of to-dos and navprojs
            // need to add to objectOps.objArray and projArray
            // then display them on body
            // then display projects on navbar
            let example = demonstration.mode();
            console.log(example);
            example.array.forEach(index => {
                body.appendChild(createCard(index));
            })
            navbar.loadExistingProjects(example.proj);
        });
    }
    listeners();
}

export { createModal };