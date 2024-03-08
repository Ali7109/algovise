import React, { useEffect, useState } from 'react'
import Node from './Node/Node'
import './PathFindingVisualizer.css'

const PathFindingVisualizer = () => {
  const [grid, setGrid] = useState([])

  useEffect(() => {

    const getInitialGrid = () => {
      const grid = []
      for (let row = 0; row < 20; row++) {
        const currentRow = []
        for (let col = 0; col < 30; col++) {
          currentRow.push(<Node />)
        }
        grid.push(currentRow)
      }
      return grid
    }

    setGrid(getInitialGrid())

  }, [])

  return (
      <div className="grid-container">
       {grid.map((row, rowIdx) => {
         return (
           <div key={rowIdx} className='grid-col'>
            {row.map((node, nodeIdx) => (
              <React.Fragment key={nodeIdx}>
                {node}
              </React.Fragment>
            ))}
           </div>
         )
       })}
      </div>
    )
}

export default PathFindingVisualizer