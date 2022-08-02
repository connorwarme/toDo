import { createElement } from './utility';

// navbar: create & functions
const navbar = () => {
    const navbar = document.querySelector('div.nav');
    const createNav = () => {
        // create 3 subsections: home, sort feature, and projects menu
        const homeContainer = createElement('div', {"class": "homeContainer"});
        const sortContainer = createElement('div', {"class": "sortContainer"});
        const projContainer = createElement('div', {"class": "projContainer"});
        navbar.appendChild(homeContainer);
        navbar.appendChild(sortContainer);
        navbar.appendChild(projContainer);
        // content in each subsection
        // home
        const homeBtn = createElement('button', {"class": "homeBtn", "id": "homeBtn"});
        const homeBtnLabel = createElement('label', {"for": "homeBtn"});
        homeBtnLabel.textContent = "Home";
        // add home icon?
        homeContainer.appendChild(homeBtn);
        homeContainer.appendChild(homeBtnLabel);

        // sort
        const sortText = createElement('div', {"class": "sortText"});
        sortText.textContent = "Sort To-Dos";
        sortContainer.appendChild(sortText);
        const todayContainer = createElement('div', "todayContainer");
        const todayBtn = createElement('button', {"class": "todayBtn", "id": "todayBtn"});
        const todayBtnLabel = createElement('label', {"for": "todayBtn"});
        todayBtnLabel.textContent = "Today";
        sortContainer.appendChild(todayContainer);
        todayContainer.appendChild(todayBtn);
        todayContainer.appendChild(todayBtnLabel);
        const weekContainer = createElement('div', {"class": "weekContainer"});
        const weekBtn = createElement('button', {"class": "weekBtn", "id": "weekBtn"});
        const weekBtnLabel = createElement('label', {"for": "weekBtn"});
        weekBtnLabel.textContent = "Week";
        sortContainer.appendChild(weekContainer);
        weekContainer.appendChild(weekBtn);
        weekContainer.appendChild(weekBtnLabel);
        const priorityNavContainer = createElement('div', {"class": "priorityNavContainer"});
        const priorityNavBtn = createElement('button', {"class": "priorityNavBtn", "id": "priorityNavBtn"});
        const priorityNavBtnLabel = createElement('label', {"for": "priorityNavBtn"});
        priorityNavBtnLabel.textContent = "Priority";
        sortContainer.appendChild(priorityNavContainer);
        priorityNavContainer.appendChild(priorityNavBtn);
        priorityNavContainer.appendChild(priorityNavBtnLabel);
        const dateNavContainer = createElement('div', {"class": "dateNavContainer"});
        const dateNavBtn = createElement('button', {"class": "dateNavBtn", "id": "dateNavBtn"});
        const dateNavBtnLabel = createElement('label', {"for": "dateNavBtn"});
        dateNavBtnLabel.textContent = "Due Date";
        sortContainer.appendChild(dateNavContainer);
        dateNavContainer.appendChild(dateNavBtn);
        dateNavContainer.appendChild(dateNavBtnLabel);
        // should I have used a fn to dynamically create that? ^^^

        //


    }

}