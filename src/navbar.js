import { createElement } from './utility';
import { createCard } from './createCard';
import { deleteFn } from './cardFunctionality';
import { objectOps } from './objectOps';
import { compareAsc, isThisWeek, isToday, parse, format, parseJSON } from 'date-fns';
import Home from './icons/home.svg';
import Day from './icons/day.svg';
import Week from './icons/week.svg';
import Priority from './icons/priority.svg';
import DateIcon from './icons/date.svg';
import Proj from './icons/nav.svg';
import Add from './icons/add.svg';
import Cancel from './icons/close.svg';
import Save from './icons/check.svg';
import DeleteIcon from './icons/trash.svg';


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
        // home listener
        homeBtn.addEventListener('click', () => {
            navFns.homeFn(objectOps.objectArray);
            navFns.highlightFn(homeContainer);
        })
        // append it all together
        homeContainer.appendChild(homeBtn);
        homeBtn.appendChild(homeIcon);
        homeContainer.appendChild(homeBtnLabel);

        // sort
        const sortText = createElement('div', {"class": "sortText"});
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
        const dateIcon = createElement('img', {"src": `${DateIcon}`, "alt": "Due Date"});
        dateNavBtn.appendChild(dateIcon);
        const dateNavBtnLabel = createElement('label', {"for": "dateNavBtn"});
        dateNavBtnLabel.textContent = "Due Date";
        sortContainer.appendChild(dateNavContainer);
        dateNavContainer.appendChild(dateNavBtn);
        dateNavContainer.appendChild(dateNavBtnLabel);
        // sort listeners
        todayBtn.addEventListener('click', () => {
            navFns.todayFn(objectOps.objectArray);
            navFns.highlightFn(todayContainer);
        })
        weekBtn.addEventListener('click', () => {
            navFns.weekFn(objectOps.objectArray);
            navFns.highlightFn(weekContainer);
        })
        priorityNavBtn.addEventListener('click', () => {
            navFns.priorityFn(objectOps.objectArray);
            navFns.highlightFn(priorityNavContainer);
        })
        dateNavBtn.addEventListener('click', () => {
            navFns.dueDateFn(objectOps.objectArray);
            navFns.highlightFn(dateNavContainer);
        })
        project();
    }
    const project = () => {
        // project
        const projectText = createElement('div', {"class": "projectNavText"});
        projContainer.appendChild(projectText);
        // project add button
        const projNavAddContainer = createElement('div', {"class": "projNavAddContainer"});
        const projNavAddBtn = createElement('button', {"class": "projNavAdd", "id": "projNavAdd", "aria-label": "Add Project"});
        const projNavAddIcon = createElement('img', {"src": `${Add}`, "alt": "Add New Project"});
        const projNavAddLabel = createElement('label', {"for": "projNavAdd"});
        projNavAddLabel.textContent = "Add Project";
        navbar.appendChild(projNavAddContainer);
        projNavAddContainer.appendChild(projNavAddBtn);
        projNavAddBtn.appendChild(projNavAddIcon);
        projNavAddContainer.appendChild(projNavAddLabel);
        // project input field, cancel and save buttons
        const projNewContainer = createElement("div", {"class": "projNewContainer", "style": "display: none"});
        const projNewInput = createElement('input', {"type": "text", "id": "projNewInput", "placeholder": "Project", "aria-label": "Add New Project"});
        const projNewCancel = createElement('button', {"class": "projNewCancel", "aria-label": "Cancel"});
        const projNewCancelIcon = createElement('img', {"src": `${Cancel}`, "alt": "Cancel"});
        const projNewSave = createElement('button', {"class": "projNewSave", "aria-label": "Save Project"});
        const projNewSaveIcon = createElement('img', {"src": `${Save}`, "alt": "Save New Project"});
        projNavAddContainer.appendChild(projNewContainer);
        projNewContainer.appendChild(projNewInput);
        projNewContainer.appendChild(projNewCancel);
        projNewCancel.appendChild(projNewCancelIcon);
        projNewContainer.appendChild(projNewSave);
        projNewSave.appendChild(projNewSaveIcon);
        // project add listeners
        projNavAddBtn.addEventListener('click', () => {
            navFns.projAddFn(projNavAddContainer);
        })
        projNewCancel.addEventListener('click', () => {
            navFns.projNewCancelFn(projNewContainer);
        })
        projNewSave.addEventListener('click', () => {
            navFns.projNewSaveFn(projNewContainer);
        })
    }
    // when user adds a project to the dropdown, I want to add the project to the nav 
    const newProject = (input) => {
        // create container
        let container = createElement('div', {"class": `projNavContainer`});
        container.value = `${input}`;
        // create button
        let button = createElement('button', {"class": `projNavBtn`, "id": `${input}Btn`});
        let icon = createElement('img', {"src": `${Proj}`, "alt": `Project ${input}`});
        // create label
        let label = createElement('label', {"for": `${input}Btn`});
        label.textContent = `${input}`;
        let deleteBtn = createElement('button', {"class": "projDeleteBtn", "aria-label": "Delete Project"});
        let deleteIcon = createElement('img', {"src": `${DeleteIcon}`, "alt": "Delete Project"});
        // add listeners
        button.addEventListener('click', () => {
            navFns.projectFn(objectOps.objectArray, input);
            navFns.highlightFn(container);
        })
        deleteBtn.addEventListener('click', () => {
            navFns.projDeleteFn(container);
        })
        // append it all together
        projContainer.appendChild(container);
        container.appendChild(button);
        button.appendChild(icon);
        container.appendChild(label);
        container.appendChild(deleteBtn);
        deleteBtn.appendChild(deleteIcon);
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
    const todayFn = (array) => {
        let todayArray = array.filter(index => {
            let date = parse(index.dueDate, 'MM/dd/yyyy', new Date());
            return isToday(date);
        })
        homeFn(todayArray);
    }
    // week
    // - sort out those due this week, display those
    const weekFn = (array) => {
        let weekArray = array.filter(index => {
            let date = parse(index.dueDate, 'MM/dd/yyyy', new Date());
            return isThisWeek(date, { weekStartsOn: 0 });
        })
        homeFn(weekArray);
    }
    // priority
    // - display all, but sorted from highest priority to lowest
    const priorityFn = (array) => {
        let priorityArray = array;
        _assignPValue(priorityArray);
        priorityArray.sort((a,b) => {
            return a.pvalue - b.pvalue;
        })
        homeFn(priorityArray);
    }
    // give each priority a number value, easier to compare/sort
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
        let dateArray = _parseDates(array);
        let result = _sortDates(dateArray);
        _reformatDates(result);
        homeFn(result);
    }
    // change dates from displayed format to the format date-fns "compareAsc" can use
    const _parseDates = (array) => {
        let dateArray = array.map(index => {
            let date = parse(index.dueDate, 'MM/dd/yyyy', new Date());
            index.dueDate = date;
            return index;
        })
        return dateArray;
    }
    // sort the dates, soonest to latest
    const _sortDates = (array) => {
        let result = array.sort((a, b) => {
            return compareAsc(a.dueDate, b.dueDate);
        })
        return result;
    }
    // change dates back into display format
    const _reformatDates = (array) => {
        array.forEach(index => {
            let update = format(parseJSON(index.dueDate), 'MM/dd/yyyy');
            index.dueDate = update;
        })
    }
    // project
    // - display the cards with same project tag
    const projectFn = (array, projectName) => {
        let filteredArray = array.filter(index => {
            return index.project == projectName;
        })
        homeFn(filteredArray);
    }
    const projAddFn = (container) => {
        // on click, show input field, cancel, save
        _displayInput(container);
    }
    const projNewCancelFn = (parent) => {
        // reset input.value
        _resetInput(parent);
        // hide input / display add button
        _hideInput(parent.parentElement);
    }
    const projNewSaveFn = (parent) => {
        // get new input.value
        let input = _getInput(parent);
        // check if it already exists
        // if it doesn't, add to projectArray
        if (objectOps.checkAndAdd(input)) {
            // and add to navbar display
            navbar.newProject(input);
        }
        // then run cancelfn
        projNewCancelFn(parent);
    }
    const _displayInput = (container) => {
        container.children[0].style.display = "none";
        container.children[1].style.display = "none";
        container.children[2].style.display = "flex";
        container.children[2].children[0].focus();
    }
    const _hideInput = (container) => {
        container.children[0].style.display = "flex";
        container.children[1].style.display = "block";
        container.children[2].style.display = "none";
    }
    const _resetInput = (parent) => {
        parent.children[0].value = "";
    }
    const _getInput = (parent) => {
        return parent.children[0].value;
    }
    const projDeleteFn = (parent) => {
        let project = parent.value;
        console.log(parent.value);
        // delete project from project Array
        // do I need to go thru the to-dos and update the ones with that project? Like reset it to ""? !!!
        // i attempted to in deleteProjectNavbar, we'll see if it works
        objectOps.deleteProjectNavbar(project);
        // delete display
        // do I need to remove listeners?
        parent.parentElement.removeChild(parent);
        // update current to-dos (i.e. remove that project text)
        _updateCardProjText();
    }
    const _updateCardProjText = () => {
        let cardsArray = document.querySelectorAll('div.card');
        cardsArray.forEach(index => {
            index.children[1].children[1].children[0].textContent = `Project: ${index.value.project}`; 
            console.log(index.value.project);
        })
    }
    // when user clicks one of the navbar links, highlight it (aka to show what is being displayed)
    // need to remove highlight class from any other navbar divs first
    const highlightFn = (input) => {
        _removeHighlight();
        _addHighlight(input);
    }
    const _removeHighlight = () => {
        let highlight = document.querySelector('div.highlight');
        if (highlight) {
            highlight.classList.remove('highlight');
        }
    }
    const _addHighlight = (input) => {
        input.classList.add('highlight');
    }
    return { homeFn, todayFn, weekFn, priorityFn, dueDateFn, projectFn, projAddFn, projNewCancelFn, projNewSaveFn, projDeleteFn, highlightFn };
})();

export { navbar, navFns }