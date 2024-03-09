let DONE = false;

export const runBfs = async (start, end, grid, setGrid) => {
	const visitedNodesInOrder = [];
	const shortestPath = [];

	// populate prev with null
	for (let i = 0; i < 20; i++) {
		const temp = [];
		for (let j = 0; j < 30; j++) {
			temp.push(null);
		}
		shortestPath.push(temp);
	}

	const queue = [];
	const visited = new Set();
	const delay = 1; // Delay in milliseconds

	// Push the start node to the queue
	queue.push(start);
	visited.add(`${start[0]},${start[1]}`);

	// While there are nodes in the queue
	while (queue.length > 0) {
		const currentNode = queue.shift(); // Dequeue the front node
		visitedNodesInOrder.push(currentNode);
		if (currentNode[0] === end[0] && currentNode[1] === end[1]) {
			// Reached the end node
			DONE = true;
			return shortestPath;
		}

		// Get the neighbors of the current node
		const neighbors = getNeighbors(currentNode, grid);
		for (const neighbor of neighbors) {
			if (visited.has(`${neighbor[0]},${neighbor[1]}`)) {
				continue;
			}
			const neighborRow = neighbor[0];
			const neighborCol = neighbor[1];
			const newNodeGrid = [...grid];

			shortestPath[neighborRow][neighborCol] = currentNode;

			// Update the grid to mark the node as visited
			for (let row = 0; row < 20; row++) {
				for (let col = 0; col < 30; col++) {
					if (row === neighborRow && col === neighborCol) {
						newNodeGrid[row][col] = {
							...newNodeGrid[row][col],
							isActive: true,
						};
					}
				}
			}

			// Update the state to reflect changes in the grid
			await new Promise((resolve) => setTimeout(resolve, delay));
			setGrid(newNodeGrid);

			// Add the neighbor to the queue and visited set
			visited.add(`${neighbor[0]},${neighbor[1]}`);
			queue.push(neighbor);
		}
	}

	// If BFS cannot reach the end node, return an empty array
	return [];
};

// Function to get the neighboring nodes of a given node
const getNeighbors = (node, grid) => {
	const row = node[0];
	const col = node[1];
	const neighbors = [];
	const numRows = grid.length;
	const numCols = grid[0].length;

	// Define all possible movements (up, down, left, right)
	const directions = [
		[-1, 0], // Up
		[1, 0], // Down
		[0, -1], // Left
		[0, 1], // Right
	];

	// Check each direction
	for (const [dx, dy] of directions) {
		const newRow = row + dx;
		const newCol = col + dy;

		// Check if the new position is within the grid bounds
		if (
			newRow >= 0 &&
			newRow < numRows &&
			newCol >= 0 &&
			newCol < numCols
		) {
			// Add the neighbor to the list
			neighbors.push([newRow, newCol]);
		}
	}

	return neighbors;
};
