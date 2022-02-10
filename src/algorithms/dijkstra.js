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

const updateUnvisitedNeighbors = (cheapestNode, grid) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(cheapestNode, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = cheapestNode.distance + 1;
        neighbor.previousNode = cheapestNode;
    }
};

const getUnvisitedNeighbors = (cheapestNode, grid) => {
    const neighbors = [];
    const { col, row } = cheapestNode;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited)
}

function dijkstra(grid, startNode, finishNode) {
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
        updateUnvisitedNeighbors(cheapestNode, grid);
    }
}

function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder
}
dijkstra(grid, startNode, finishNode)
console.log(getNodesInShortestPathOrder(finishNode))