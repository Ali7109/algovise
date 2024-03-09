let DONE = false;

export const runDijkstra = async (start, end, grid, setGrid) => {
	const visitedNodesInOrder = [];
	const queue = [];
	const previousNodes = {}; // To store the previous node for each visited node
	const delay = 1; // Delay in milliseconds

	// Push the start node to the queue
	queue.push(start);

	// While there are nodes in the queue
	while (queue.length > 0) {
		const currentNode = queue.shift(); // Dequeue the front node
		visitedNodesInOrder.push(currentNode);
		if (currentNode[0] === end[0] && currentNode[1] === end[1]) {
			// Reached the end node
			DONE = true;
			return constructPath(previousNodes, end);
		}

		// Get the neighbors of the current node
		const neighbors = getNeighbors(currentNode, grid);
		for (const neighbor of neighbors) {
			const neighborRow = neighbor[0];
			const neighborCol = neighbor[1];

			if (
				!previousNodes.hasOwnProperty(`${neighborRow},${neighborCol}`)
			) {
				previousNodes[`${neighborRow},${neighborCol}`] = currentNode;
			}

			// Mark the neighbor as visited and enqueue it
			queue.push(neighbor);
		}
	}

	// If BFS cannot reach the end node, return an empty array
	return [];
};

// Function to construct the shortest path based on the previous node information
const constructPath = (previousNodes, end) => {
	const shortestPath = [];
	let currentNode = end;

	while (
		previousNodes.hasOwnProperty(`${currentNode[0]},${currentNode[1]}`)
	) {
		shortestPath.unshift(currentNode);
		currentNode = previousNodes[`${currentNode[0]},${currentNode[1]}`];
	}

	shortestPath.unshift(currentNode); // Add the start node
	return shortestPath;
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

		// Check if the new position is within the grid bounds and not blocked
		if (
			newRow >= 0 &&
			newRow < numRows &&
			newCol >= 0 &&
			newCol < numCols &&
			!grid[newRow][newCol].isWall
		) {
			// Add the neighbor to the list
			neighbors.push([newRow, newCol]);
		}
	}

	return neighbors;
};
