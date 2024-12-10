// import { handleCellClick } from "./main.js";
export function generateRandomCoords(cols, rows, grid) {
    function generateRandomPosition(grid, pointClass) {
        const randomCol = Math.floor(Math.random() * cols);
        const randomRow = Math.floor(Math.random() * rows);
        const div = grid[randomCol][randomRow];
        div.classList.add(pointClass);
        console.log(div);
        return { row: randomCol, col: randomRow };
    }
    const startCell = generateRandomPosition(grid, "start");
    let endCell;
    do {
        endCell = generateRandomPosition(grid, "end");
    } while (startCell.row === endCell.row && startCell.col === endCell.col);
    return [startCell, endCell];
}
export function createGrid(cols, rows) {
    var _a;
    const gridContainer = (_a = document.getElementById('grid')) !== null && _a !== void 0 ? _a : (() => { throw new Error("Missing gridContainer element"); })();
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
    let grid = [];
    class Spot {
        constructor() {
            this.f = 0;
            this.g = 0;
            this.h = 0;
        }
    }
    for (let row = 0; row < rows; row++) {
        const gridRow = [];
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row.toString();
            cell.dataset.col = col.toString();
            new Spot();
            // cell.addEventListener('click', () => handleCellClick(row, col));
            gridContainer.appendChild(cell);
            gridRow.push(cell);
        }
        grid.push(gridRow);
    }
    return grid;
}
