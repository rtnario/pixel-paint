const centerPane = document.querySelector('#center-pane');

let gridSize = 0;
let validNum = false;

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

    let numOfSquares = gridSize * gridSize;

    for (let i = 0; i < numOfSquares; i++) {
        const square = document.createElement('div');
        square.classList = "canvas-square";
        centerPane.append(square);
    }

    centerPane.style.gridTemplateColumns = gridTemplateColumns;
    centerPane.style.gridTemplateRows = gridTemplateRows;

    const setBg = () => {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        return "#" + randomColor;
    }

    const squares = document.querySelectorAll('.canvas-square');

    squares.forEach(square => {
        square.addEventListener('mouseover', () => {
            square.style.backgroundColor = "black";
        })
        square.addEventListener('touchmove', () => {
            square.style.backgroundColor = "black";
        }, false)
    });
}

function clearGrid() {
    const squares = document.querySelectorAll('.canvas-square');
    squares.forEach(square => square.style.backgroundColor = "white");
}

const btnReset = document.querySelector('#btn-reset');

btnReset.addEventListener('click', () => {
    validNum = false;
    generateGrid();
});

const btnClear = document.querySelector('#btn-clear');

btnClear.addEventListener('click', () => {
    clearGrid();
});

generateGrid();
