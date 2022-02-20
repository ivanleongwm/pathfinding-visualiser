const getAllNodes = (grid) => {
    let allNodes = [];
    for (let row of grid) {
        for (let node of row) {
            allNodes.push(node);
        }
    }
    return allNodes;
}

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

export function dijkstra(grid, startNode, finishNode) {
    // Performs dijkstra's algorithm, returning all nodes in the oder they were visited.
    // Also points all nodes to their previous node, allowing us to compute the shortest path
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

export function getNodesInShortestPathOrder(finishNode) {
    // backtracks from the finish node to the shortest path
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder
}