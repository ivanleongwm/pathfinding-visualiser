import React, { useState, useEffect } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import './PathfindingVisualiser.css';

const START_NODE_ROW = 5;
const START_NODE_COL = 2;
const FINISH_NODE_ROW = 5;
const FINISH_NODE_COL = 8;


export default function PathfindingVisualiser() {

    const [state, setState] = useState({
        grid: [],
        mouseIsPressed: false
    });

    useEffect(() => {
        function createGridArray() {
            const nodesArray = []
            for (let row = 0; row < 15; row++) {
                const currentRow = [];
                for (let col = 0; col < 50; col++) {
                    const currentNode = {
                        col,
                        row,
                        isStart: row === 10 && col === 5,
                        isFinish: row === 10 && col === 45,
                    };
                    currentRow.push(currentNode);
                }
                nodesArray.push(currentRow)
            }
            setState({
                grid: nodesArray,
                mouseIsPressed: false
            })
        }
        createGridArray();
    }, [])

    function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                // triggers traceback of shortestpath visual at end of array
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i]
                document.getElementById(`node-`)
            })
        }
    }

    function animateShortestPath() {

    }

    function visualiseDijkstra() {
        const { grid } = state.grid;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    }

    const { grid, mouseIsPressed } = state
    return (
        <>
            <button onClick={() => visualiseDijkstra()}>
                Visualise Dijkstra's Algorithm
            </button>
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return <div className='row' key={rowIdx}>
                        {row.map((node, nodeIdx) => {
                            const { row, col, isStart, isFinish } = node;
                            return (
                                <Node
                                    key={nodeIdx}
                                    isStart={isStart}
                                    isFinish={isFinish}
                                    row={row}
                                    col={col} />
                            );
                        })}
                    </div>
                })}

                <p>Pathfinding Visualiser Placeholder 2</p>
                <Node />
            </div>
        </>
    )
}

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
