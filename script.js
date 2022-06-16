function calculateAndSetToAvailableHeight() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}

function checkIfValidGridSize() {
    while (!validNum) {
        gridSize = parseInt(prompt("Input the number of cells per side (8-128)"));

        if (gridSize < 8 || gridSize > 128) { alert("Value is out of range!") }
        else { validNum = true }
    }
}

function clearGrid() {
    const cells = document.querySelectorAll('.canvas-cell');
    cells.forEach(cell => cell.style.backgroundColor = "white");
}

function populateGridTemplates() {
    let gridTemplateColumns = "";
    let gridTemplateRows = "";

    for (let i = 0; i < gridSize; i++) {
        gridTemplateColumns += "1fr ";
        gridTemplateRows += "1fr ";
    }

    const centerPane = document.querySelector('.canvas');
    centerPane.style.gridTemplateColumns = gridTemplateColumns;
    centerPane.style.gridTemplateRows = gridTemplateRows;
}

function appendCellsToCanvas() {
    numOfCells = gridSize * gridSize;
    const centerPane = document.querySelector('.canvas');

    for (let cellIndex = 0; cellIndex < numOfCells; cellIndex++) {
        const cell = document.createElement('div');
        cell.classList = `canvas-cell cell-${cellIndex}`;
        centerPane.append(cell);
    }
}

function mapCellCoordinates() {
    const cells = document.querySelectorAll('.canvas-cell');
    cellCoordinates = [];

    cells.forEach(cell => {
        const bounds = cell.getBoundingClientRect();
        cellCoordinates.push([[bounds.left, bounds.right], [bounds.top, bounds.bottom]]);
    });
}

function addMouseListeners() {
    const cells = document.querySelectorAll('.canvas-cell');
    let isMouseDown = false;

    cells.forEach(cell => {
        cell.ondragstart = () => { return false; }

        cell.addEventListener('mousedown', () => {
            cell.style.backgroundColor = "black";
            isMouseDown = true;
        });

        cell.addEventListener('mouseover', () => {
            if (isMouseDown) { cell.style.backgroundColor = "black" }
        });

        cell.addEventListener('mouseup', () => {
            isMouseDown = false;
        });
    });
}

function addTouchListeners() {
    function isTouchWithinCellWidth(touchX, cellIndex) {
        return (touchX >= cellCoordinates[cellIndex][0][0]) &&
               (touchX < cellCoordinates[cellIndex][0][1]);
    }

    function isTouchWithinCellLength(touchY, cellIndex) {
        return (touchY >= cellCoordinates[cellIndex][1][0]) &&
               (touchY < cellCoordinates[cellIndex][1][1]);
    }

    const centerPane = document.querySelector('.canvas');

    centerPane.addEventListener('touchmove', (event) => {
        event.preventDefault();
        const touchX = event.touches[0].clientX;
        const touchY = event.touches[0].clientY;
        
        for (let cellIndex = 0; cellIndex < numOfCells; cellIndex++) {
            if (isTouchWithinCellWidth(touchX, cellIndex) &&
                isTouchWithinCellLength(touchY, cellIndex)) {
                const hoverCell = document.querySelector(`.cell-${cellIndex}`)
        
                if (hoverCell.style.backgroundColor !== "black") {
                    hoverCell.style.backgroundColor = "black";
                }
            }
        }
    });
}

function generateGrid() {
    checkIfValidGridSize();
    clearGrid();
    populateGridTemplates();
    appendCellsToCanvas();
    mapCellCoordinates();
    addMouseListeners();
    addTouchListeners();
}

const btnClear = document.querySelector('.btn-clear');
btnClear.addEventListener('click', () => { clearGrid() });
const btnReset = document.querySelector('.btn-reset');

btnReset.addEventListener('click', () => {
    validNum = false;
    const canvasNode = document.querySelector('.canvas');
    canvasNode.innerHTML = '';

    generateGrid();
});

let gridSize = 0;
let validNum = false;
let numOfCells = 0;
let cellCoordinates = [];

calculateAndSetToAvailableHeight();
generateGrid();

// window.addEventListener('resize', () => {
//     console.log(window.innerWidth);
//     console.log(window.innerHeight);
// });
