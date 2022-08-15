import { createElement } from "./utility";
import { addToDo } from "./addToDo";
import { ls, storageAvailable } from "./localStorage";
import { createCard } from "./createCard";
import { navbar } from "./navbar";
import { objectOps } from "./objectOps";
import { demonstration } from "./demo";
import Check from './icons/checkcircle.svg';

// create modal, show on page load
// options: 1) blank slate 2) load locally stored data 3) demo the app
const createModal = () => {
    let main = document.querySelector('div.main');
    const modalContainer = createElement('div', {"class": "modalContainer"});
    const modalBox = createElement('div', {"class": "modalBox"});
    // title w/ logo img
    const titleContainer = createElement('div', {"class": "modalTitleContainer"});
    const titleText = createElement('div', {"class": "titleText"});
    const check = createElement('img', {"src": `${Check}`, "alt": "Check"});
    titleText.textContent = `Mate`;
    const titleQuote = createElement('div', {"class": "titleQuote"});
    const titleQuoteAuthor = createElement('div', {"class": "titleQuoteAuthor"});
    titleQuote.textContent = "The secret of gettings things done is to act!";
    titleQuoteAuthor.textContent = "- Dante Alighieri";
    // three options 
    const blank = createElement('input', {"type": "button", "class": "blank", "aria-label": "Blank Slate", "value": "Blank Slate"});
    const local = createElement('input', {"type": "button", "class": "local", "aria-label": "Check Local Storage", "value": "Check Local Storage"});
    const demo = createElement('input', {"type": "button", "class": "demo", "aria-label": "Demo App", "value": "Demo App"});
    // append it together
    modalContainer.appendChild(modalBox);
    modalBox.appendChild(titleContainer);
    titleContainer.appendChild(titleText);
    titleText.appendChild(check);
    titleContainer.appendChild(titleQuote);
    titleQuote.appendChild(titleQuoteAuthor);
    modalBox.appendChild(blank);
    modalBox.appendChild(local);
    modalBox.appendChild(demo);
    main.appendChild(modalContainer);
    // close modal, display button for adding "to-do" w/ listener
    const standardSetup = () => {
        modalContainer.style.display = "none";
        main.children[1].children[1].appendChild(addToDo.addDOM());
        addToDo.addListener();
    }
    let body = main.children[1].children[1].children[0];
    // should I have not used anonymous functions here (below), so that I can remove the listeners...?
    // I'm not sure.
    // listeners for each option: blank, local storage, or demo mode
    const listeners = () => {
        blank.addEventListener('click', () => {
            // check if local storage is supported/available
            if (!(storageAvailable('localStorage'))) {
                alert(`App may not function properly due to problem with local storage.`)
            } else {
                // check local storage / clear it
                ls.clear();
            }
            // close modal, display "add to-do" button w/ listener
            standardSetup();
        });
        local.addEventListener('click', () => {
            standardSetup();
            // check if any values exist (for obj, proj)
            // if yes, load them on the page
            // if no, alert and load blank slate version
            let content = ls.checkContent('obj');
            if (content) {
                let projArray = ls.checkContent('proj');
                objectOps.objectArray = content;
                objectOps.projectArray = projArray;
                content.forEach(index => {
                    body.appendChild(createCard(index));
                })
                if (projArray) {
                    navbar.loadExistingProjects(projArray);
                }
            } else {
                alert(`Nothing found in local storage, starting in "blank slate" mode.`);
            }
        });
        demo.addEventListener('click', () => {
            standardSetup();
            // pull in a whole bunch of to-dos and navprojs from demo.js
            // add them to objectOps.objArray and projArray
            // then display them on the page
            // then display projects on navbar
            let example = demonstration.mode();
            example.array.forEach(index => {
                body.appendChild(createCard(index));
            })
            navbar.loadExistingProjects(example.proj);
        });
    }
    listeners();
}
// export createModal for index.js to use
export { createModal };