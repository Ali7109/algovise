export const runDijkstra = (start, end, grid, setGrid) => {
	console.log("Dijkstra");
	const newGrid = grid.slice();
	const node = newGrid[5][10];
	const newNode = {
		...node,
		isActive: true,
	};
	newGrid[5][10] = newNode;
	console.log(newGrid);
	setGrid(newGrid);
};
