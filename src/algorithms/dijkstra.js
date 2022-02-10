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

console.log(getInitialGrid())