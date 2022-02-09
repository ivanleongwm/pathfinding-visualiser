const graph = {
    start: { A: 5, B: 2 },
    A: { C: 4, D: 2 },
    B: { A: 8, D: 7 },
    C: { D: 6, finish: 3 },
    D: { finish: 1 },
    finish: {}
};

const costs = {
    A: 5,
    B: 2,
    D: 9,
    finish: Infinity
};

const parents = {
    A: 'start',
    B: 'start',
    finish: null
};

const processed = ["start", "A", "B"];

console.log(graph)

const lowestCostNode = (costs, processed) => {
    //Returns the lowest cost node that hast not been processed yet
    return Object.keys(costs).reduce((lowestNode, currentNode) => {
        if (lowestNode === null || costs[currentNode] < costs[lowestNode]) {
            if (!processed.includes(currentNode)) {
                lowestNode = currentNode;
            }
        }
        return lowestNode;
    }, null);
}

console.log(lowestCostNode(costs, processed))