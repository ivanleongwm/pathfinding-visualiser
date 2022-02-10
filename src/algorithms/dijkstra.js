// Implementing the grid to write dijkstra
const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 10; row++) {
        const currentRow = [];
        for (let col = 0; col < 10; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};
const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};

const START_NODE_ROW = 5;
const START_NODE_COL = 2;
const FINISH_NODE_ROW = 5;
const FINISH_NODE_COL = 8;

const grid = getInitialGrid()
const startNode = grid[START_NODE_ROW][START_NODE_COL]
const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]

console.log(getInitialGrid())

const getAllNodes = (grid) => {
    let allNodes = [];
    for (let row of grid) {
        for (let node of row) {
            allNodes.push(node);
        }
    }
    return allNodes;
}
console.log(getAllNodes(grid))

const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

const updateUnvisitedNeighbors(closestNode, grid);

export function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const cheapestNode = unvisitedNodes.shift();
        // If the cheapest node is at a distance = infinity 
        // Then we are trapped and should stop
        if (cheapestNode.distance === Infinity) return visitedNodesInOrder;
        cheapestNode.isVisited = true;
        if (cheapestNode === finishNode) return visitedNodesInOrder;

    }
}

