import { ls } from "./localStorage";

const cardFactory = (title, project, priority, dueDate, notes, checked, value) => {
    return { title, project, priority, dueDate, notes, checked, value, expanded: false, editable: true, properties: ["title", "project", "priority", "dueDate", "notes", "checked"] }
}
const objectOps = (() => {
    let objectArray = [];
    const addToObjectArray = (object) => {
        objectOps.objectArray.push(object);
        // save/update local storage
        ls.saveArray(objectOps.objectArray, "obj");
    }
    const deleteFromObjectArray = (object) => {
        let filteredArray = objectOps.objectArray.filter((index) => index !== object);
        objectOps.objectArray = filteredArray;
        ls.saveArray(objectOps.objectArray, "obj");
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
                objectOps.projectArray.push(index.project);
            }
        })
        // save/update local storage
        ls.saveArray(objectOps.projectArray, "proj");
    }
    const addSingleToProjectArray = (input) => {
        objectOps.projectArray.push(input);
        ls.saveArray(objectOps.projectArray, "proj");
    }
    const deleteFromProjectArray = (object) => {
        if (object.project == "") {
            return;
        } else {
            // check if other objects are also in the same project, or if this object is the only one
            let project = objectOps.objectArray.filter(index => index.project === object.project);
            if (project.length == 1) {
                let filteredArray = objectOps.projectArray.filter(index => index !== object.project);
                objectOps.projectArray = filteredArray;
            }
        }
        ls.saveArray(objectOps.projectArray, "proj");
        // does this need to return the updated array?? !!!
    }
    // object operations
    // update the object with input data (in array)
    const update = (object, array) => {
        for (let i=0; i<array.length; i++) {
            object[object.properties[i]] = array[i];
        }
        // update local storage
        ls.saveArray(objectOps.objectArray, "obj");
    }
    const updateSingle = (object, key, input) => {
        object[key] = input;
    }
    // update the checkmark (if to-do is complete)
    const updateCheck = (input) => {
        let object = getObject(input.parentElement.parentElement);
        if (input.checked) {
            object.checked = true;
        } else {
            object.checked = false;
        }
        ls.saveArray(objectOps.objectArray, "obj");
    }
    // needs updating once I have multiple objects... !!!
    // needs to be passed the project as well..? or should it just sort through the main array of objects?
    const getObject = (cardDiv) => {
        let theValue = cardDiv.value;
        let indexPosition = objectOps.objectArray.findIndex(object => {
            return object.value == theValue;
        });
        // this works, but tried using find instead...can delete later 
        // for (i=0; i<objectArray.length; i++) {
        //     if (objectArray[i].title == title) {
        //         object = objectArray[i];
        //     }
        // }
        return objectOps.objectArray[indexPosition];
    }
    return { addToObjectArray, addToProjectArray, addSingleToProjectArray, objectArray, projectArray, update, updateSingle, updateCheck, getObject, deleteFromObjectArray, deleteFromProjectArray }    
})();

export { cardFactory, objectOps }