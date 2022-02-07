import React from 'react';
import './Node.css'

function Node(props) {
    const { isFinish, isStart } = props
    const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : '';
    return (
        <div className={`node ${extraClassName}`}></div>
    )
}

export default Node