import { createElement } from "./utility";

// create modal, show on page load
// options: 1) blank slate 2) demo the app 3) load locally stored data

const createModal = () => {
    let main = document.querySelector('div.main');
    //
    const modalContainer = createElement('div', {"class": "modalContainer"});
    const modalBox = createElement('div', {"class": "modalBox"});
    // title
    const title = createElement('div', {"class": "modalTitle"});
    title.textContent = `Check Mate`;
    // three options 
    const blank = createElement('input', {"type": "button", "class": "blank", "aria-label": "Blank Slate", "value": "Blank Slate"});
    const local = createElement('input', {"type": "button", "class": "local", "aria-label": "Check Local Storage", "value": "Check Local Storage"});
    const demo = createElement('input', {"type": "button", "class": "demo", "aria-label": "Demo App", "value": "Demo App"});

    // append it together
    modalContainer.appendChild(modalBox);
    modalBox.appendChild(title);
    modalBox.appendChild(blank);
    modalBox.appendChild(local);
    modalBox.appendChild(demo);

    main.appendChild(modalContainer);
}

export { createModal };