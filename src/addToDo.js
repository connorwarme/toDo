import { createElement } from "./utility";
import { cardFactory, objectOps } from "./objectOps";
import { createCard } from "./createCard";
import { edit } from "./cardFunctionality";

const add = () => {
    const addContainer = createElement('div', {'class': 'addContainer'});
    const addBtn = createElement('input', {'type': 'button', 'class': 'addBtn', 'id': 'addToDo'});
    const addBtnLabel = createElement('label', {'for': 'addToDo'});
    addBtnLabel.textContent = "Add To-Do";
    addContainer.appendChild(addBtn);
    addContainer.appendChild(addBtnLabel);
    return addContainer;
}
const addFn = () => {
    let newToDo = cardFactory("", "", "", "", "", false);
    objectOps.addToObjectArray(newToDo);
    let newCard = createCard(newToDo);
    // edit.mainFn(newCard.children[0].children[6])
    return newCard;
}
export { add, addFn };