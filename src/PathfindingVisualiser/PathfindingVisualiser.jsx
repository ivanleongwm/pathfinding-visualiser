import React, { useState, useEffect } from 'react';
import Node from './Node/Node';
import { dijkstra } from '../algorithms/dijkstra';
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

    function visualiseDijkstra() {

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
                            const { isStart, isFinish } = node;
                            return (
                                <Node
                                    key={nodeIdx}
                                    isStart={isStart}
                                    isFinish={isFinish}
                                    test={'foo'}
                                    test={'kappa'} />
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
