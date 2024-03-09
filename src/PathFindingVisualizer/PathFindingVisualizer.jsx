import React, { useEffect, useState } from 'react'
import Node from './Node/Node'
import './PathFindingVisualizer.css'
import { runDijkstra } from './algorithms/dijkstra'
import { runBfs } from './algorithms/bfs'
import { runDfs } from './algorithms/dfs'

const PathFindingVisualizer = () => {

  const [grid, setGrid] = useState([])
  const [start, setStart] = useState([10, 5])
  const [end, setEnd] = useState([10, 25])
  const [isMouseDown, setIsMouseDown] = useState(false)

  const alogirthms = [
    {
      name: 'Dijkstra',
      run: () => runDijkstra(start, end, grid, setGrid)
    },
    {
      name: 'A*',
      run: () => console.log('A*')
    },
    {
      name: 'Depth-First Search',
      run: () => runAlgorithm(runDfs)
    },
    {
      name: 'Breadth-First Search',
      run: () => runAlgorithm(runBfs)
    },
    {
      name: 'Clear',
      run: () => setGrid(getInitialGrid())
    }
  ]

  const runAlgorithm = async (algorithm) => {
      const visitedNodesInOrder = await algorithm(start, end, grid, setGrid); // Run the algorithm
      console.log(visitedNodesInOrder)
      visitedNodesInOrder.map((node) => {
        console.log(node)
        return true
      })
      // animateTraversal(visitedNodesInOrder); // Animate the traversal using visitedNodesInOrder
  };

  // const animateTraversal = (visitedNodesInOrder) => {
  //     for (let i = 0; i < visitedNodesInOrder.length; i++) {
  //         setTimeout(() => {
  //             const node = visitedNodesInOrder[i];
  //             const newGrid = grid.slice();
  //             const newNode = {
  //                 ...node,
  //                 isActive: true,
  //             };
  //             newGrid[node.row][node.col] = newNode;
  //             setGrid(newGrid);
  //           }, i * 100); // Adjust the animation speed
  //     }
  // };


  const createNode = (row, col) => {
    const node = {
          row,
          col,
          isActive: false,
          aBlock: false,
          path: false,
          isStart: row === start[0] && col === start[1],
          isEnd: row === end[0] && col === end[1],
    }
    return node
  }

  const getInitialGrid = () => {
    const grid = []
    for (let row = 0; row < 20; row++) {
      const currentRow = []
      for (let col = 0; col < 30; col++) {
        const node = createNode(row, col)
        currentRow.push(node)
      }
      grid.push(currentRow)
    }
    return grid
  }

  useEffect(() => {
    setGrid(getInitialGrid())
  }, [])

  return (
    <div className='container'>
      <div className="header">
        {alogirthms.map((algo, idx) => (
          <button key={idx} onClick={algo.run}>{algo.name}</button>
        ))}
      </div>
      <div className="grid-container" >
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className="grid-col">
              {row.map((node) => (
                <Node key={`${node.row}-${node.col}`} isActive={node.isActive} aBlock={node.aBlock} path={node.path} isStart={node.isStart} isEnd={node.isEnd}/>
              ))} 
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PathFindingVisualizer
