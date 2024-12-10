import { generateRandomCoords, createGrid } from "./functions";
import { startNode } from "./types";

const cols = 10;
const rows = 10;
let walls = new Set();
let grid = createGrid(cols, rows)
let [startCell, endCell] = generateRandomCoords(cols, rows, grid);


// Handle cell click to set start, end, or wall
export function handleCellClick(row, col) {
    const cell = grid[row][col];

    const key = `${row},${col}`;
    if (walls.has(key)) {
        walls.delete(key);
        cell.classList.remove('wall');
    } else {
        walls.add(key);
        cell.classList.add('wall');
    }
}

// function resetGrid() {
//     grid = createGrid(cols, rows)
//     [startCell, endCell] = generateRandomCoords(cols, rows, grid);
//     walls.clear();
// }

// function startAlgorithm() {
//     if (!startCell || !endCell) return alert('Set start and end points first!');
//     const openSet: startNode[] = [];
//     const closedSet = new Set();
//     const startNode = { ...startCell, f: 0, g: 0, h: heuristic(startCell, endCell), parent: null };

//     openSet.push(startNode);

//     while (openSet.length > 0) {
//         openSet.sort((a, b) => a.f - b.f); // Sort by f-value
//         const current = openSet.shift();
//         if (!current) continue
//         const { row, col } = current;

//         // Check if we reached the end
//         if (row === endCell.row && col === endCell.col) {
//             drawPath(current);
//             return;
//         }

//         if (row === null || col === null) {
//             throw new Error("Invalid row or col value");
//         }
//         closedSet.add(`${row},${col}`);
//         grid[row][col].classList.add('visited');

//         // Check neighbors
//     for (const [dr, dc] of [
//         [0, 1], [1, 0], [0, -1], [-1, 0], // Four cardinal directions
//         [-1, -1], [-1, 1], [1, -1], [1, 1], // Four diagonal directions
//     ]) {
//             const neighborRow = row + dr;
//             const neighborCol = col + dc;

//             if (
//                 neighborRow < 0 || neighborCol < 0 || neighborRow >= rows || neighborCol >= cols || // Out of bounds
//                 walls.has(`${neighborRow},${neighborCol}`) || // Wall check
//                 closedSet.has(`${neighborRow},${neighborCol}`) // Already visited
//             ) continue;
            
//             if (!current) {
//                 throw Error("No 'current' variable")
//             }
//             const diagonal = dr !== 0 && dc !== 0; // True if diagonal movement
//             const g = current.g + (diagonal ? Math.SQRT2 : 1); // Adjust cost for diagonal movement
//             const h = heuristic({ row: neighborRow, col: neighborCol }, endCell);
//             const f = g + h;

//             const existing = openSet.find(node => node.row === neighborRow && node.col === neighborCol);

//             if (existing) {
//                 if (g < existing.g) {
//                     existing.g = g;
//                     existing.f = f;
//                     existing.parent = current;
//                 }
//             } else {
//                 openSet.push({ row: neighborRow, col: neighborCol, f, g, h, parent: current });
//             }
//         }
//     }

//     alert('No path found!');
// }

// // Heuristic (Manhattan distance)
// function heuristic(a, b) {
//     return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
// }

// // Draw the final path
// function drawPath(node) {
//     if (!startCell) {
//         throw Error
//     }
//     while (node) {
//         const { row, col } = node;
//         if (!(row === startCell.row && col === startCell.col)) {
//             grid[row][col].classList.add('path');
//         }
//         node = node.parent;
//     }
// }



