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
    let projectArray = [` - none - `];
    // this is going to need a sort function to weed out "" (empty) projects and the like. !!! did current version work?
    // needs a clear function before this is run (to make sure projectArray is empty), or run a check to see if project already exists or if it needs to be added to the projectArray !!!
    const addToProjectArray = (array) => {
        array.forEach(index => {
            if (index.project == "" || index.project == null || index.project == undefined) {
                console.log(index.project);
            } else {
                if (!(_checkProjectArray(index.project))) {
                    objectOps.projectArray.push(index.project);
                }
            }
        })
        // save/update local storage
        ls.saveArray(objectOps.projectArray, "proj");
    }
    const addSingleToProjectArray = (input) => {
        objectOps.projectArray.push(input);
        ls.saveArray(objectOps.projectArray, "proj");
    }
    // an attempt at a check to see if project already exists in array
    const _checkProjectArray = (input) => {
        console.log(objectOps.projectArray);
        let check = objectOps.projectArray.find(index => {
            return index == input;
        })
        console.log(check);
        if (check == undefined) {
            return false;
        } else {
            return true;
        }
    }
    const checkAndAdd = (input) => {
        if (!(_checkProjectArray(input))) {
            addSingleToProjectArray(input);
            return true;
        } else {
            alert(`This project already exists! For a new project, choose a new name.`);
            return false;
        }
    }
    const deleteFromProjectArray = (object) => {
        if (object.project == "") {
            return;
        } else {
            // check if other objects are also in the same project, or if this object is the only one
            let project = objectOps.objectArray.filter(index => index.project === object.project);
            if (project.length == 1) {
                _deleteProject(object.project);
            }
        }
        // does this need to return the updated array?? !!!
    }
    const deleteProjectNavbar = (project) => {
        console.log(`this is the project ${project}`);
        // find objects with this project, reset project value
        let resetArray = objectOps.objectArray.filter(index => index.project === project);
        resetArray.forEach(index => index.project = "");
        // update local storage
        ls.saveArray(objectOps.objectArray, "obj");
        // delete project from project Array
        _deleteProject(project);
    }
    const _deleteProject = (project) => {
        // filter out all the other projects
        let filteredArray = objectOps.projectArray.filter(index => index !== project);
        // update the projectArray
        objectOps.projectArray = filteredArray;
        // update the local storage
        ls.saveArray(objectOps.projectArray, "proj");
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
        if (input.classList[1] == "checked") {
            object.checked = true;
        } else {
            object.checked = false;
        }
        ls.saveArray(objectOps.objectArray, "obj");
    }
    // needs updating once I have multiple objects... !!!
    // needs to be passed the project as well..? or should it just sort through the main array of objects?
    const getObject = (cardDiv) => {
        let theObject = cardDiv.value;
        let indexPosition = objectOps.objectArray.findIndex(object => {
            return object == theObject;
        });
        // this works, but tried using find instead...can delete later 
        // for (i=0; i<objectArray.length; i++) {
        //     if (objectArray[i].title == title) {
        //         object = objectArray[i];
        //     }
        // }
        return objectOps.objectArray[indexPosition];
    }
    return { addToObjectArray, addToProjectArray, addSingleToProjectArray, checkAndAdd, objectArray, projectArray, update, updateSingle, updateCheck, getObject, deleteFromObjectArray, deleteFromProjectArray, deleteProjectNavbar }    
})();

export { cardFactory, objectOps }