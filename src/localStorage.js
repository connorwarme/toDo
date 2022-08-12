// local storage
const ls = (() => {
    // these work for both objectArray and projectArray
    // take the array, stringify, and save it locally
    const saveArray = (array, key) => {
        // need to stringify data
        let data = JSON.stringify(array);
        // save to local
        localStorage.setItem(key, data);
    }
    // not currently using this one.. !!!
    const updateArrays = (array1, array2) => {
        saveArray(array1, "obj");
        saveArray(array2, "proj");
    }
    // get the local data, parse it, and return the array
    const returnArray = (key) => {
        let arrayString = localStorage.getItem(key);
        let regularArray = JSON.parse(arrayString);
        return regularArray;
    }
    const checkContent = (key) => {
        let content = returnArray(key);
        console.log(content);
        if (content == null || content[0] == undefined) {
            return false;
        } else {
            return content;
        }
    }
    return { saveArray, updateArrays, returnArray, checkContent, storageAvailable }
})();
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const value = '__storage_test__';
        storage.setItem(value, value);
        storage.removeItem(value);
        return true;
    }
    catch (e) {
        return (e instanceof DOMException && (e.code === 22 || e.code === 1014 || e.name === `QuotaExceededError` || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && (storage && storage.length !== 0));
    }
    }

export { ls, storageAvailable };