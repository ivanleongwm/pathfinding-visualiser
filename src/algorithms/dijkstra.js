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

const dijkstra = (graph) => {
    // creating costs, parents and processed data structures
    const costs = Object.assign({ finish: 'Infinity' }, graph.start);
    const parents = { finish: null };
    for (let child in graph.start) {
        parents[child] = 'start';
    }
    const processed = [];

    // Set initial value of node being procssed
    let node = lowestCostNode(costs, processed);

    // Loop to continously look for the cheapest node
    while (node) {
        let cost = costs[node];
        let children = graph[node];
        for (let childNode in children) {
            let newCost = cost + children[childNode]
            if (!costs[childNode]) {
                costs[childNode] = newCost;
                parents[childNode] = node;
            }
            if (costs[childNode] > newCost) {
                costs[childNode] = newCost;
                parents[childNode] = node;
            }
        }
        processed.push(node);
        node = lowestCostNode(costs, processed);
    }
    console.log(costs)
    console.log(parents)
    let optimalPath = ['finish'];
    let parent = parents.finish;
    while (parent) {
        optimalPath.push(parent);
        parent = parents[parent]
    }
    optimalPath.reverse();

    const results = {
        distance: costs.finish,
        path: optimalPath
    };
    return results;
}
console.log(dijkstra(graph))