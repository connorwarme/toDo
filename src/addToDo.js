import { createElement } from "./utility";
import { cardFactory, objectOps } from "./objectOps";
import { createCard } from "./createCard";
import { edit } from "./cardFunctionality";
// the function behind the "add to-do" button - the central "+" that rotates on hover
const addToDo = (() => {
    const addDOM = () => {
        // create container and button
        const addContainer = createElement('div', {'class': 'addContainer'});
        let addBtn = createElement('button', {'class': 'addBtn', 'id': 'addToDo', 'aria-label': 'Add To-Do'});
        // append together
        addContainer.appendChild(addBtn);
        return addContainer;
    }
    // create new object, add to objectArray
    // display the new "to-do"
    const mainFn = () => {
        let newToDo = cardFactory("", "", "", "", "", false);
        objectOps.addToObjectArray(newToDo);
        let newCard = createCard(newToDo);
        edit.mainFn(newCard.children[0].children[6]);
        return newCard;
    }
    const addListener = () => {
        let btn = document.getElementById('addToDo');
        // add listener
        btn.addEventListener('click', () => {
            document.querySelector('div.body').appendChild(mainFn())});
    }
    return { addDOM, addListener };
})();
// export for use in openingModal.js (as part of the standard page setup)
export { addToDo };