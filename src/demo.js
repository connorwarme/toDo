import { cardFactory, objectOps } from './objectOps';

const demonstration = (() => {
    const todo = cardFactory;
    const d1 = todo("Climb The Honeymoon is Over, 5.13c", "Diamond", "Defcon", "09/18/2022", "One of North America's best alpine rock climbs, located on Longs Peak, CO", false);
    const d2 = todo("Complete dietetic internship", "Career", "High", "12/20/2022", "Final rotation in Arizona with the Phoenix Suns", false);
    const d3 = todo("Help brothers get ready for college", "Family", "Medium", "08/20/2022", "Be supportive and empowering!", false);
    const d4 = todo("Take nieces rock climbing", "Family", "Low", "09/01/2022", "Introduce them to climbing: bouldering and top-roping.", true);
    const mode = () => {
        const demoObj = {};
        demoObj.array = [d1, d2, d3, d4];
        objectOps.objectArray = demoObj.array;
        demoObj.proj = [d1.project, d2.project, d3.project];
        objectOps.projectArray = demoObj.proj;
        return demoObj;
    }
    return { mode };
})();

export { demonstration };