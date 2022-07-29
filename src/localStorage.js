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
    // take the local data, parse it, and return the array
    const returnArray = (key) => {
        let arrayString = localStorage.getItem(key);
        let regularArray = JSON.parse(arrayString);
        return regularArray;
    }
    return { saveArray, returnArray }
})();

export { ls };