import { ls } from "./localStorage";
import { navFns } from "./navbar";
// create to-do objects
// expanded and editable properties are for use in displaying the card
// aka knowing when to expand the card, or when to go into edit mode
// I utilize the "properties" key when I update the object
const cardFactory = (title, project, priority, dueDate, notes, checked) => {
    return { title, project, priority, dueDate, notes, checked, expanded: false, editable: true, properties: ["title", "project", "priority", "dueDate", "notes", "checked"] }
}
// object operations
const objectOps = (() => {
    // the main array, of all the "to-do" objects
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
    }
    // project array: a collection of all the project names
    let projectArray = [` - none - `];
    // for each project in argument array:
    // if object.project is empty or undefined, don't add it
    // check to see if project already exists in array,
    // if not, add it to the projectArray 
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
    // add a single project to the array
    const addSingleToProjectArray = (input) => {
        objectOps.projectArray.push(input);
        ls.saveArray(objectOps.projectArray, "proj");
    }
    // check to see if project already exists in array
    const _checkProjectArray = (input) => {
        let check = objectOps.projectArray.find(index => {
            return index == input;
        })
        if (check == undefined) {
            return false;
        } else {
            return true;
        }
    }
    // function used by "add project" input on edit mode of to-do, and on navbar
    const checkAndAdd = (input) => {
        if (!(_checkProjectArray(input))) {
            addSingleToProjectArray(input);
            return true;
        } else {
            alert(`This project already exists! For a new project, choose a new name.`);
            return false;
        }
    }
    // delete an object.project from the array
    const deleteFromProjectArray = (object) => {
        if (object.project == "" || object.project == " - none - ") {
            return;
        } else {
            // check if other objects are also in the same project, or if this object is the only one
            let project = objectOps.objectArray.filter(index => index.project === object.project);
            if (project.length == 1) {
                _deleteProject(object.project);
                // check for navbar listing & delete project from navbar 
                let container = navFns.getContainer(object.project);
                container.parentElement.removeChild(container);
            }
        }
    }
    // when user deletes project from the navbar
    // go through projectArray and reset objects with that project value
    const deleteProjectNavbar = (project) => {
        // find objects with this project, reset project value
        let resetArray = objectOps.objectArray.filter(index => index.project === project);
        resetArray.forEach(index => index.project = " - none - ");
        // update local storage
        ls.saveArray(objectOps.objectArray, "obj");
        // delete project from project Array
        _deleteProject(project);
    }
    // delete a project from projectArray
    const _deleteProject = (project) => {
        // filter out all the other projects
        let filteredArray = objectOps.projectArray.filter(index => index !== project);
        // update the projectArray
        objectOps.projectArray = filteredArray;
        // update the local storage
        ls.saveArray(objectOps.projectArray, "proj");
    }
    // update the object with input data (in array)
    const update = (object, array, index) => {
        for (let i=0; i<array.length; i++) {
            let key = `${object.properties[i]}`;
            object[key] = array[i];
        }
        objectOps.objectArray[index] = object;
        // update local storage
        ls.saveArray(objectOps.objectArray, "obj");
    }
    // update a single property value in an object
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
    // get the index position of a given object in the objectArray
    const getObjIndex = (cardDiv) => {
        let theObject = cardDiv.value;
        let indexPosition = objectOps.objectArray.findIndex(object => {
            // previously had this more simple: "return object == theObject", 
            // but something changed (haven't figured out what) where the object.properties wasn't equal to theObject.properties, 
            // thus the fn would return -1 (aka nothing matched theObject)
            if (object.title == theObject.title && object.project == theObject.project && object.priority == theObject.priority && object.dueDate == theObject.dueDate) {
                return object;
            }
        });
        return indexPosition;
    }
    // similar to above, but returns the object
    const getObject = (cardDiv) => {
        let theObject = cardDiv.value;
        let indexPosition = objectOps.objectArray.findIndex(object => {
            if (object.title == theObject.title && object.project == theObject.project && object.priority == theObject.priority && object.dueDate == theObject.dueDate) {
                return object;
            }
        });
        return objectOps.objectArray[indexPosition];
    }
    return { addToObjectArray, addToProjectArray, addSingleToProjectArray, checkAndAdd, objectArray, projectArray, update, updateSingle, updateCheck, getObject, deleteFromObjectArray, deleteFromProjectArray, deleteProjectNavbar, getObjIndex }   
})();

export { cardFactory, objectOps }