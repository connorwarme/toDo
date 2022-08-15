import { cardFactory, objectOps } from './objectOps';
import { ls, storageAvailable } from './localStorage';
// demo mode
const demonstration = (() => {
    const todo = cardFactory;
    // a bunch of to-dos to populate the page
    const a1 = todo("Complete building to-do application", "WebDev", "High", "08/15/2022", "Don't forget to seek feedback on TOP's Discord", false);
    const a2 = todo("Finish the Javascript section", "WebDev", "High", "11/01/2022", "On 'The Odin Project'", false);
    const a3 = todo("Leg workout", "Training", "Medium", "08/20/2022", "Go for a run, finish with calesthenics", false);
    const a4 = todo("Clean out the vehicle", "Chores", "Low", "09/16/2022", "At a minimum, vacuum interior and go through contents", false);
    const b1 = todo("Read 'Why We Sleep'", "To Read", "Low", "12/31/2022", "Currently on a waitlist on the library app", false);
    const b2 = todo("Buy LeaAnn's wedding present", "Family", "High", "09/01/2022", "", false);
    const b3 = todo("Climb Pervertical Sanctuary, 5.10c", "Diamond", "Medium", "09/18/2022", "", false);
    const b4 = todo("Clean bedroom and bathroom", "Chores", "Medium", "08/31/2022", "", false);
    const c1 = todo("Read Climb Smarter", "To Read", "Low", "10/01/2022", "Take notes / process how to apply it", false);
    const c2 = todo("Organize climbing gear", "Chores", "Low", "09/16/2022", "Go through tubs, get prepped for fall trips", false);
    const c3 = todo("Read The Trigger Point Manual", "To Read", "Medium", "08/19/2022", "Focus on trigger points throughout the back", false);
    const c4 = todo("Get a software developer job", "Career", "High", "12/31/2022", "Be diligent to keep studying, but also network and polish LinkedIn profile", false);
    const d1 = todo("Climb The Honeymoon is Over, 5.13c", "Diamond", "Defcon", "09/18/2022", "One of North America's best alpine rock climbs, located on Longs Peak, CO", false);
    const d2 = todo("Complete dietetic internship", "Career", "High", "12/20/2022", "Final rotation in Arizona with the Phoenix Suns", false);
    const d3 = todo("Help brothers get ready for college", "Family", "Medium", "08/20/2022", "Be supportive and empowering!", false);
    const d4 = todo("Take nieces rock climbing", "Family", "Low", "09/01/2022", "Introduce them to climbing: bouldering and top-roping.", true);
    const d5 = todo("Go to the climbing gym", "Training", "Medium", "08/15/2022", "Focus on power training!", false);
    // add demo content to objectArray and projectArray
    // if local storage, update it
    const mode = () => {
        const demoObj = {};
        demoObj.array = [a1, a2, a3, a4, b1, b2, b3, b4, c1, c2, c3, c4, d1, d2, d3, d4, d5];
        objectOps.objectArray = demoObj.array;
        demoObj.proj = [a1.project, a3.project, a4.project, b1.project, d1.project, d2.project, d3.project];
        let projArray = objectOps.projectArray.concat(demoObj.proj);
        objectOps.projectArray = projArray;
        if (storageAvailable('localStorage')) {
            ls.updateArrays(objectOps.objectArray, objectOps.projectArray);
        }
        return demoObj;
    }
    return { mode };
})();
// export, for use on in initial modal (openingModal.js)
export { demonstration };