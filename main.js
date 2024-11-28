const rows = 10;
const cols = 10;
let grid = [];
let startCell = null;
let endCell = null;
let walls = new Set();

const gridContainer = document.getElementById('grid');

// Initialize the grid
function createGrid() {
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
    grid = [];

    for (let row = 0; row < rows; row++) {
        const gridRow = [];
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => handleCellClick(row, col));
            gridContainer.appendChild(cell);
            gridRow.push(cell);
        }
        grid.push(gridRow);
    }
}

// Handle cell click to set start, end, or wall
function handleCellClick(row, col) {
    const cell = grid[row][col];

    if (!startCell) {
        startCell = { row, col };
        cell.classList.add('start');
    } else if (!endCell) {
        endCell = { row, col };
        cell.classList.add('end');
    } else {
        const key = `${row},${col}`;
        if (walls.has(key)) {
            walls.delete(key);
            cell.classList.remove('wall');
        } else {
            walls.add(key);
            cell.classList.add('wall');
        }
    }
}

function resetGrid() {
    startCell = null;
    endCell = null;
    walls.clear();
    createGrid();
}

createGrid();
