import { createElement } from "./utility";
import { cardFactory, objectOps } from "./objectOps";
import { createCard } from "./createCard";
import { edit } from "./cardFunctionality";

const addToDo = (() => {
    let addBtn;
    // count is value of the card. increments with each to-do card created. 
    // allows for identification of object from array (objectOps.getObject);
    let count = 0;
    const addDOM = () => {
        // create container and button
        const addContainer = createElement('div', {'class': 'addContainer'});
        addBtn = createElement('button', {'class': 'addBtn', 'id': 'addToDo', 'value': '+', 'aria-label': 'Add To-Do'});
        addBtn.textContent = "+";
        // const addBtnLabel = createElement('label', {'for': 'addToDo'});
        // addBtnLabel.textContent = "Add To-Do";
        // append together
        addContainer.appendChild(addBtn);
        // addContainer.appendChild(addBtnLabel);
        return addContainer;
    }
    const mainFn = () => {
        let newToDo = cardFactory("", "", "", "", "", false, count);
        count++;
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
export { addToDo };