import React, { useState } from 'react'
import { runDijkstra, } from '../algorithms/dijkstra';
import {runBfs} from '../algorithms/bfs'
import {runDfs} from '../algorithms/dfs'

const Header = ({start, end, grid, setGrid}) => {
    const [running, setRunning] = useState(false)

    const alogirthms = [
        {
          name: 'Dijkstra',
          run: () => runAlgorithm(runDijkstra)
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
          run: () => clearGrid()
        }
      ]

      
  const runAlgorithm = async (algorithm) => {
    clearGrid()
    setRunning(true)
    let shortestPath = await algorithm(start, end, grid, setGrid); // Run the algorithm
    if (algorithm === runBfs) {

      shortestPath = reconstructShortestPath(shortestPath, start, end);
      console.log(shortestPath)  
      for (let i = 0; i < shortestPath.length; i++) {
          const pathNode = shortestPath[i];
          const newGrid = grid.slice();
          const node = newGrid[pathNode[0]][pathNode[1]];
          const newNode = {
              ...node,
              path: true,
          };
          newGrid[pathNode[0]][pathNode[1]] = newNode;
            await new Promise((resolve) => setTimeout(resolve, 10));
          setGrid(newGrid);
      }
    }
    
    setRunning(false)
};

const reconstructShortestPath = (shortestPath, start, end) => {
    const nodesInShortestPath = [];
    let currentNode = end;
    while (currentNode !== null) {
        nodesInShortestPath.unshift(currentNode);
        currentNode = shortestPath[currentNode[0]][currentNode[1]];
    }
    return nodesInShortestPath;
}
const clearGrid = () => {
    const newGrid = grid.slice()
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 30; col++) {
        const node = newGrid[row][col]
        newGrid[row][col] = {
          ...node,
          isActive: false,
          aBlock: false,
          path: false
        }
      }
    }
    setGrid(newGrid)
  }
  return (
    <div className="header">
    {alogirthms.map((algo, idx) => (
      <button key={idx} disabled={running} onClick={algo.run}>{algo.name}</button>
    ))}
  </div>
  )
}

export default Header