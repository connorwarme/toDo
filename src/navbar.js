import { createElement } from './utility';
import { createCard } from './createCard';
import { listeners, deleteFn } from './cardFunctionality';
import Home from './icons/home.png';
import Day from './icons/day.png';
import Week from './icons/week.png';
import Priority from './icons/priority.png';
import Date from './icons/duedate.png';
import Proj from './icons/nav.png';


// navbar: create & functions
const navbar = (() => {
    const navbar = document.querySelector('div.nav');
    let projContainer;
    const createNav = () => {
        // create 3 subsections: home, sort feature, and projects menu
        const homeContainer = createElement('div', {"class": "homeContainer"});
        const sortContainer = createElement('div', {"class": "sortContainer"});
        projContainer = createElement('div', {"class": "projContainer"});
        navbar.appendChild(homeContainer);
        navbar.appendChild(sortContainer);
        navbar.appendChild(projContainer);
        // content in each subsection
        // home
        const homeBtn = createElement('button', {"class": "homeBtn", "id": "homeBtn"});
        const homeIcon = createElement('img', {"src": `${Home}`, "alt": "Home"});
        const homeBtnLabel = createElement('label', {"for": "homeBtn"});
        homeBtnLabel.textContent = "Home";
        homeContainer.appendChild(homeBtn);
        homeBtn.appendChild(homeIcon);
        homeContainer.appendChild(homeBtnLabel);

        // sort
        const sortText = createElement('div', {"class": "sortText"});
        sortText.textContent = "Sort To-Dos";
        sortContainer.appendChild(sortText);
        const todayContainer = createElement('div', {"class": "todayContainer"});
        const todayBtn = createElement('button', {"class": "todayBtn", "id": "todayBtn"});
        const todayIcon = createElement('img', {"src": `${Day}`, "alt": "Today"});
        todayBtn.appendChild(todayIcon);
        const todayBtnLabel = createElement('label', {"for": "todayBtn"});
        todayBtnLabel.textContent = "Today";
        sortContainer.appendChild(todayContainer);
        todayContainer.appendChild(todayBtn);
        todayContainer.appendChild(todayBtnLabel);
        const weekContainer = createElement('div', {"class": "weekContainer"});
        const weekBtn = createElement('button', {"class": "weekBtn", "id": "weekBtn"});
        const weekIcon = createElement('img', {"src": `${Week}`, "alt": "Week"});
        weekBtn.appendChild(weekIcon);
        const weekBtnLabel = createElement('label', {"for": "weekBtn"});
        weekBtnLabel.textContent = "Week";
        sortContainer.appendChild(weekContainer);
        weekContainer.appendChild(weekBtn);
        weekContainer.appendChild(weekBtnLabel);
        const priorityNavContainer = createElement('div', {"class": "priorityNavContainer"});
        const priorityNavBtn = createElement('button', {"class": "priorityNavBtn", "id": "priorityNavBtn"});
        const priorityIcon = createElement('img', {"src": `${Priority}`, "alt": "Priority"});
        priorityNavBtn.appendChild(priorityIcon);
        const priorityNavBtnLabel = createElement('label', {"for": "priorityNavBtn"});
        priorityNavBtnLabel.textContent = "Priority";
        sortContainer.appendChild(priorityNavContainer);
        priorityNavContainer.appendChild(priorityNavBtn);
        priorityNavContainer.appendChild(priorityNavBtnLabel);
        const dateNavContainer = createElement('div', {"class": "dateNavContainer"});
        const dateNavBtn = createElement('button', {"class": "dateNavBtn", "id": "dateNavBtn"});
        const dateIcon = createElement('img', {"src": `${Date}`, "alt": "Due Date"});
        dateNavBtn.appendChild(dateIcon);
        const dateNavBtnLabel = createElement('label', {"for": "dateNavBtn"});
        dateNavBtnLabel.textContent = "Due Date";
        sortContainer.appendChild(dateNavContainer);
        dateNavContainer.appendChild(dateNavBtn);
        dateNavContainer.appendChild(dateNavBtnLabel);
        // should I have used a fn to dynamically create that? ^^^
        // listeners for those^^ !!!

        // project
        const projectText = createElement('div', {"class": "projectText"});
        projectText.textContent = "Projects";
        projContainer.appendChild(projectText);
    }
    // when user adds a project to the dropdown, I want to add the project to the nav 
    const newProject = (input) => {
        // create container
        let container = createElement('div', {"class": `${input}Container`});
        // create button
        let button = createElement('button', {"class": `${input}Btn`, "id": `${input}Btn`});
        let icon = createElement('img', {"src": `${Proj}`, "alt": `Project ${input}`});
        // create label
        let label = createElement('label', {"for": `${input}BtnLabel`});
        label.textContent = `${input}`;
        // it will need a listener
        // listenerFn....runs ProjectNavFn(projectNameHere)
        // that function can sort the display to only include those projects...
        projContainer.appendChild(container);
        container.appendChild(button);
        button.appendChild(icon);
        container.appendChild(label);
        // could have the third argument be the function to have the listener run...
        // could use this fn to dynamically create the sort zone too...
    }
    return { createNav, newProject };
})();
    // button functions
const navFns = (() => {
    // also want the button grid cell to highlight / darken to indicate which one is selected
    // or should I have a "display" class ...
    // clear display function
    // - remove listeners, delete cardDiv's for all
    const clearDisplay = (parentDiv) => {
        while (parentDiv.firstChild) {
            deleteFn.deleteDisplay(parentDiv.firstChild);
        }
    }
    // display function
    // - take an array, forEach => createCard
    const display = (array, parentDiv) => {
        array.forEach(index => {
            parentDiv.appendChild(createCard(index));
            console.log(index);
        })
    }
    // home 
    // - display all cards (might involve deleting what's there, then create & display all);
    const homeFn = (array) => {
        const body = document.querySelector('div.body');
        clearDisplay(body);
        display(array, body);
    }
    // today
    // - sort out only those due today, display those
    // const todayFn = (array) => {
    //     const body = document.querySelector('div.body');
    //     clearDisplay(body);
    //     let todayArray = array.filter(index => {
    //         return index.dueDate == today !!!!
    //     })
    //     display(todayArray, body);
    // }
    // week
    // - sort out those due this week, display those
    // const weekFn = (array) => {
    //     const body = document.querySelector('div.body');
    //     clearDisplay(body);
    //     let weekArray = array.filter(index => {
    //         return index.dueDate == thisWeek !!!
    //     })
    //     display(weekArray, body);
    // }
    // priority
    // - display all, but sorted from highest priority to lowest
    const priorityFn = (array) => {
        const body = document.querySelector('div.body');
        clearDisplay(body);
        let priorityArray = array;
        _assignPValue(priorityArray);
        priorityArray.sort((a,b) => {
            return a.pvalue - b.pvalue;

        })
        display(priorityArray, body);

    }
    const _assignPValue = (array) => {
        array.forEach(index => {
            if (index.priority == "Defcon") {
                index.pvalue = 0;
            } else if (index.priority == "High") {
                index.pvalue = 1;
            } else if (index.priority == "Medium") {
                index.pvalue = 2;
            } else if (index.priority == "Low") {
                index.pvalue = 3;
            } else {
                index.pvalue = 4;
            }
        })
    }
    // due date
    // - display all, sorted by due date (earliest to latest)
    const dueDateFn = (array) => {
        const body = document.querySelector('div.body');
        clearDisplay(body);
        let dateArray = array;
        dateArray.sort
    }
    // project
    // - display the cards with same project tag
    return { clearDisplay, display };
})();

export { navbar, navFns }