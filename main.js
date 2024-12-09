var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var rows = 10;
var cols = 10;
var grid = [];
var startCell = { row: null, col: null };
var endCell = { row: null, col: null };
var walls = new Set();
var gridContainer = document.getElementById('grid');
function Spot() {
    this.f = 0;
    this.g = 0;
    this.h = 0;
}
// Initialize the grid
function createGrid() {
    if (!gridContainer) {
        throw Error("Missing gridContainer element");
    }
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = "repeat(".concat(cols, ", 30px)");
    grid = [];
    var _loop_1 = function (row) {
        var gridRow = [];
        var _loop_2 = function (col) {
            var cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row.toString();
            cell.dataset.col = col.toString();
            new Spot();
            cell.addEventListener('click', function () { return handleCellClick(row, col); });
            gridContainer.appendChild(cell);
            gridRow.push(cell);
        };
        for (var col = 0; col < cols; col++) {
            _loop_2(col);
        }
        grid.push(gridRow);
    };
    for (var row = 0; row < rows; row++) {
        _loop_1(row);
    }
}
function startAlgorithm() {
    if (!startCell || !endCell)
        return alert('Set start and end points first!');
    var openSet = [];
    var closedSet = new Set();
    var startNode = __assign(__assign({}, startCell), { f: 0, g: 0, h: heuristic(startCell, endCell), parent: null });
    openSet.push(startNode);
    while (openSet.length > 0) {
        openSet.sort(function (a, b) { return a.f - b.f; }); // Sort by f-value
        var current = openSet.shift();
        if (!current)
            continue;
        var row = current.row, col = current.col;
        // Check if we reached the end
        if (row === endCell.row && col === endCell.col) {
            drawPath(current);
            return;
        }
        if (row === null || col === null) {
            throw new Error("Invalid row or col value");
        }
        closedSet.add("".concat(row, ",").concat(col));
        grid[row][col].classList.add('visited');
        var _loop_3 = function (dr, dc) {
            var neighborRow = row + dr;
            var neighborCol = col + dc;
            if (neighborRow < 0 || neighborCol < 0 || neighborRow >= rows || neighborCol >= cols || // Out of bounds
                walls.has("".concat(neighborRow, ",").concat(neighborCol)) || // Wall check
                closedSet.has("".concat(neighborRow, ",").concat(neighborCol)) // Already visited
            )
                return "continue";
            if (!current) {
                throw Error("No 'current' variable");
            }
            var diagonal = dr !== 0 && dc !== 0; // True if diagonal movement
            var g = current.g + (diagonal ? Math.SQRT2 : 1); // Adjust cost for diagonal movement
            var h = heuristic({ row: neighborRow, col: neighborCol }, endCell);
            var f = g + h;
            var existing = openSet.find(function (node) { return node.row === neighborRow && node.col === neighborCol; });
            if (existing) {
                if (g < existing.g) {
                    existing.g = g;
                    existing.f = f;
                    existing.parent = current;
                }
            }
            else {
                openSet.push({ row: neighborRow, col: neighborCol, f: f, g: g, h: h, parent: current });
            }
        };
        // Check neighbors
        for (var _i = 0, _a = [
            [0, 1], [1, 0], [0, -1], [-1, 0],
            [-1, -1], [-1, 1], [1, -1], [1, 1], // Four diagonal directions
        ]; _i < _a.length; _i++) {
            var _b = _a[_i], dr = _b[0], dc = _b[1];
            _loop_3(dr, dc);
        }
    }
    alert('No path found!');
}
// Heuristic (Manhattan distance)
function heuristic(a, b) {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}
// Handle cell click to set start, end, or wall
function handleCellClick(row, col) {
    var cell = grid[row][col];
    if (!startCell) {
        startCell = { row: row, col: col };
        cell.classList.add('start');
    }
    else if (!endCell) {
        endCell = { row: row, col: col };
        cell.classList.add('end');
    }
    else {
        var key = "".concat(row, ",").concat(col);
        if (walls.has(key)) {
            walls.delete(key);
            cell.classList.remove('wall');
        }
        else {
            walls.add(key);
            cell.classList.add('wall');
        }
    }
}
// Draw the final path
function drawPath(node) {
    if (!startCell) {
        throw Error;
    }
    while (node) {
        var row = node.row, col = node.col;
        if (!(row === startCell.row && col === startCell.col)) {
            grid[row][col].classList.add('path');
        }
        node = node.parent;
    }
}
function resetGrid() {
    startCell = { row: null, col: null };
    endCell = { row: null, col: null };
    walls.clear();
    createGrid();
}
createGrid();
