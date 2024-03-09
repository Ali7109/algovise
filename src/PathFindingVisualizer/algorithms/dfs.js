export const runDfs = async (start, end, grid, setGrid) => {
	const visited = new Set();
	const shortestPath = await dfs(start, end, grid, visited, setGrid);

	return shortestPath.length > 0 ? shortestPath : [];
};

const dfs = async (node, end, grid, visited, setGrid) => {
	const row = node[0];
	const col = node[1];

	if (
		row < 0 ||
		row >= grid.length ||
		col < 0 ||
		col >= grid[0].length ||
		visited.has(`${row},${col}`)
	) {
		return [];
	}

	visited.add(`${row},${col}`);

	if (row === end[0] && col === end[1]) {
		return [node]; // Reached the end, return the node as the path
	}

	const newNodeGrid = [...grid];
	newNodeGrid[row][col] = {
		...newNodeGrid[row][col],
		isActive: true,
	};

	// Update the state to reflect changes in the grid
	await new Promise((resolve) => setTimeout(resolve, 10));
	setGrid(newNodeGrid);

	const neighbors = getNeighbors(node, grid);
	for (const neighbor of neighbors) {
		const path = await dfs(neighbor, end, grid, visited, setGrid);
		if (path.length > 0) {
			path.unshift(node); // Prepend the current node to the path
			return path; // Return the path found
		}
	}
	return [];
};

// let DONE = false;
// const visitedNodesInOrder = [];
// const shortestPath = [];

// export const runDfs = async (start, end, grid, setGrid) => {
// 	const visited = new Set();

// 	//Setup the shortestPath
// 	// populate prev with null
// 	for (let i = 0; i < 20; i++) {
// 		const temp = [];
// 		for (let j = 0; j < 30; j++) {
// 			temp.push(null);
// 		}
// 		shortestPath.push(temp);
// 	}

// 	await dfs(start, end, grid, visited, setGrid);
// 	// Push the start node to the queue
// 	visited.add(`${start[0]},${start[1]}`);

// 	// If BFS cannot reach the end node, return an empty array
// 	return DONE ? visitedNodesInOrder : [];
// };

// const dfs = async (node, end, grid, visited, setGrid) => {
// 	const row = node[0];
// 	const col = node[1];
// 	if (DONE) {
// 		return;
// 	}
// 	if (
// 		row < 0 ||
// 		row >= grid.length ||
// 		col < 0 ||
// 		col >= grid[0].length ||
// 		visited.has(`${row},${col}`)
// 	) {
// 		return;
// 	}

// 	visited.add(`${row},${col}`);
// 	visitedNodesInOrder.push(node);

// 	const newNodeGrid = [...grid];
// 	newNodeGrid[row][col] = {
// 		...newNodeGrid[row][col],
// 		isActive: true,
// 	};

// 	if (row === end[0] && col === end[1]) {
// 		DONE = true;
// 		return;
// 	}

// 	// Update the state to reflect changes in the grid
// 	await new Promise((resolve) => setTimeout(resolve, 10));
// 	setGrid(newNodeGrid);

// 	const neighbors = getNeighbors(node, grid);
// 	for (const neighbor of neighbors) {
// 		if (DONE) {
// 			break;
// 		}
// 		shortestPath[neighbor[0]][neighbor[1]] = node;
// 		await dfs(neighbor, end, grid, visited, setGrid);
// 	}
// 	return;
// };
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
