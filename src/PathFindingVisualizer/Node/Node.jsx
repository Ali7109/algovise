import React from 'react'
import './Node.css'

const Node = ({ isActive, aBlock, path, isStart, isEnd }) => {
  return (
    <div
      className={`node ${path ? 'node-path' : aBlock ? 'node-block' : isActive ? 'node-active' : ''}`}
    >
      {isStart ? (
        <h1 className="edge-point">&#x2609;</h1>
      ) : isEnd ? (
        <h1 className="edge-point">&#x2605;</h1>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Node
