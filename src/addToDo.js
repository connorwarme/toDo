import { createElement } from "./utility";

const add = () => {
    const addContainer = createElement('div', {'class': 'addContainer'});
    const addBtn = createElement('input', {'type': 'button', 'class': 'addBtn', 'id': 'addToDo'});
    const addBtnLabel = createElement('label', {'for': 'addToDo'});
    addBtnLabel.textContent = "Add To-Do";
    addContainer.appendChild(addBtn);
    addContainer.appendChild(addBtnLabel);
    return addContainer;
}
export { add };