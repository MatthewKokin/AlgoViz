import { cell } from "./types";
import { handleCellClick } from "./main";

export function generateRandomCoords(cols: number, rows: number, grid:HTMLDivElement[][]): cell[] {
    type point = "start" | "end"
    function generateRandomPosition(grid, pointClass:point):cell {
        const randomCol = Math.floor(Math.random() * cols)
        const randomRow = Math.floor(Math.random() * rows)
        const cell = grid[randomCol][randomRow];

        cell.classList.add(pointClass)
        return {row: randomCol, col: randomRow}
    }
    
    const startCell:cell = generateRandomPosition(grid, "start");

    let endCell:cell = generateRandomPosition(grid, "end");
    do { endCell = generateRandomPosition(grid, "end");
    } while (startCell.row === endCell.row && startCell.col === endCell.col);

    return [startCell, endCell]
  }


export function createGrid(cols: number, rows: number):HTMLDivElement[][] {
    const gridContainer = document.getElementById('grid') ?? (() => { throw new Error("Missing gridContainer element") })();
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
    
    let grid: HTMLDivElement[][] = [];
    function Spot(){
        this.f = 0
        this.g = 0
        this.h = 0
    }

    for (let row = 0; row < rows; row++) {
        const gridRow: HTMLDivElement[] = [];
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row.toString();
            cell.dataset.col = col.toString();
            new Spot()
            cell.addEventListener('click', () => handleCellClick(row, col));
            gridContainer.appendChild(cell);
            gridRow.push(cell);
        }
        grid.push(gridRow);
    }
    return grid
}
