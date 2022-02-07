import React, { useState, useEffect } from 'react';
import Node from './Node/Node'
import './PathfindingVisualiser.css'

function PathfindingVisualiser() {

    const [nodes, setNodes] = useState([])

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
            setNodes(nodesArray)
        }
        createGridArray();
    }, [])

    return (
        <div className="grid">
            {nodes.map((row, rowIdx) => {
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
    )
}

export default PathfindingVisualiser