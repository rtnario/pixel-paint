function calculateAndSetAvailableViewportHeight() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}

calculateAndSetAvailableViewportHeight();

const centerPane = document.querySelector('.canvas');

let gridSize = 0;
let validNum = false;

let numOfSquares = 0;
let cellCoordinates = [];

function generateGrid() {
    while (!validNum) {
        gridSize = parseInt(prompt("Input the number of squares per side (1-100)"));
        
        if (gridSize < 1 || gridSize > 100) {
            alert("Value is out of range!");
        }
        else {
            validNum = true;
        }
    }

    clearGrid();

    let gridTemplateColumns = "";
    let gridTemplateRows = "";

    for (let i = 0; i < gridSize; i++) {
        gridTemplateColumns += "1fr ";
        gridTemplateRows += "1fr ";
    }

    numOfSquares = gridSize * gridSize;

    for (let i = 0; i < numOfSquares; i++) {
        const square = document.createElement('div');
        square.classList = `canvas-square cell-${i}`;
        centerPane.append(square);
    }

    centerPane.style.gridTemplateColumns = gridTemplateColumns;
    centerPane.style.gridTemplateRows = gridTemplateRows;

    const setBg = () => {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        return "#" + randomColor;
    }

    const rect = centerPane.getBoundingClientRect();

    const squares = document.querySelectorAll('.canvas-square');

    cellCoordinates = [];

    squares.forEach(square => {
        const bounds = square.getBoundingClientRect();
        cellCoordinates.push([[bounds.left, bounds.right], [bounds.top, bounds.bottom]]);
    });

    console.log(cellCoordinates);

    let isMouseDown = false;

    squares.forEach(square => {
        square.ondragstart = () => { return false; }

        square.addEventListener('mousedown', () => {
            square.style.backgroundColor = "black";
            isMouseDown = true;
        });

        square.addEventListener('mouseover', () => {
            if (isMouseDown) {
                square.style.backgroundColor = "black";
            }
        });

        square.addEventListener('mouseup', () => {
            isMouseDown = false;
        });
    });

    centerPane.addEventListener('touchmove', paintCoordinates);

    // centerPane.addEventListener('touchmove', e => {
    //     e.preventDefault();

    //     let touchX = e.touches[0].clientX;
    //     let touchY = e.touches[0].clientY;

    //     for (let i = 0; i < numOfSquares; i++) {
    //         if (touchX >= cellCoordinates[i][0][0] &&
    //             touchX < cellCoordinates[i][0][1] &&
    //             touchY >= cellCoordinates[i][1][0] &&
    //             touchY < cellCoordinates[i][1][1]) {
    //             const hoverCell = document.querySelector(`.cell-${i}`)

    //             if (hoverCell.style.backgroundColor !== "black") {
    //                 hoverCell.style.backgroundColor = "black";
    //             }
    //         }
    //     }
    // });
}

function paintCoordinates(event) {
    event.preventDefault();

    let touchX = event.touches[0].clientX;
    let touchY = event.touches[0].clientY;
    
    for (let i = 0; i < numOfSquares; i++) {
        if (touchX >= cellCoordinates[i][0][0] &&
            touchX < cellCoordinates[i][0][1] &&
            touchY >= cellCoordinates[i][1][0] &&
            touchY < cellCoordinates[i][1][1]) {
            const hoverCell = document.querySelector(`.cell-${i}`)
    
            if (hoverCell.style.backgroundColor !== "black") {
                hoverCell.style.backgroundColor = "black";
            }
        }
    }
}

// window.addEventListener('resize', () => {
//     console.log(window.innerWidth);
//     console.log(window.innerHeight);
// });

function clearGrid() {
    const squares = document.querySelectorAll('.canvas-square');
    squares.forEach(square => square.style.backgroundColor = "white");
}

const btnReset = document.querySelector('.btn-reset');

btnReset.addEventListener('click', () => {
    validNum = false;

    const canvasNode = document.querySelector('.canvas');
    canvasNode.innerHTML = '';

    generateGrid();
});

const btnClear = document.querySelector('.btn-clear');

btnClear.addEventListener('click', () => {
    clearGrid();
});

generateGrid();
