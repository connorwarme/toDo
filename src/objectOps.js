import { ls } from "./localStorage";

const cardFactory = (title, project, priority, dueDate, notes, checked) => {
    return { title, project, priority, dueDate, notes, checked, expanded: false, editable: true, properties: ["title", "project", "priority", "dueDate", "notes", "checked"] }
}
const objectOps = (() => {
    let objectArray = [];
    const addToObjectArray = (object) => {
        objectArray.push(object);
    }
    const deleteFromObjectArray = (object) => {
        let filteredArray = objectArray.filter((index) => index !== object);
        objectArray = filteredArray;
        console.log(`object array from objectOps ${objectArray}`);
        ls.saveArray(objectArray, "obj");
        // does this need to return the updated array? !!!
    }
    let projectArray = [];
    // this is going to need a sort function to weed out "" (empty) projects and the like. !!! did current version work?
    // needs a clear function before this is run (to make sure projectArray is empty), or run a check to see if project already exists or if it needs to be added to the projectArray !!!
    const addToProjectArray = (array) => {
        array.forEach(index => {
            if (index.project == "" || index.project == null || index.project == undefined) {
                let blank;
                blank.push(index.project);
            } else {
                projectArray.push(index.project);
            }
        })
    }
    const deleteFromProjectArray = (object) => {
        if (object.project == "") {
            return;
        } else {
            // check if other objects are also in the same project, or if this object is the only one
            let project = objectArray.filter(index => index.project === object.project);
            console.log(project);
            if (project.length == 1) {
                console.log('fire');
                let filteredArray = projectArray.filter(index => index !== object.project);
                console.log(filteredArray);
                projectArray = filteredArray;
            }
        }
        console.log(`proj array from objectOps ${projectArray}`);
        ls.saveArray(projectArray, "proj");
        // does this need to return the updated array?? !!!
    }
    // object operations
    // update the object with input data (in array)
    const update = (object, array) => {
        for (let i=0; i<array.length; i++) {
            object[object.properties[i]] = array[i];
        }
    }
    // update the checkmark (if to-do is complete)
    const updateCheck = (input) => {
        let object = getObject(input.parentElement.parentElement);
        if (input.checked) {
            object.checked = true;
        } else {
            object.checked = false;
        }
    }
    // needs updating once I have multiple objects... !!!
    // needs to be passed the project as well..? or should it just sort through the main array of objects?
    const getObject = (cardDiv) => {
        let theTitle = cardDiv.children[0].children[1].children[0].textContent;
        console.log(`getObject ${theTitle}`);
        console.log(objectOps.objectArray);
        let object = objectOps.objectArray.find(index => {
            return index.title === theTitle;
        });
        console.log(`getObject ${object} object`);
        // this works, but tried using find instead...can delete later 
        // for (i=0; i<objectArray.length; i++) {
        //     if (objectArray[i].title == title) {
        //         object = objectArray[i];
        //     }
        // }
        return object;
    }
    return { addToObjectArray, addToProjectArray, objectArray, projectArray, update, updateCheck, getObject, deleteFromObjectArray, deleteFromProjectArray }    
})();

export { cardFactory, objectOps }