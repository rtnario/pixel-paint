const centerPane = document.querySelector('#center-pane');
// centerPane.style.gridTemplateColumns = "50px 50px 50px";

let gridSize = 0;
let validNum = false;

while (!validNum) {
    gridSize = parseInt(prompt("Input the grid size (1-100)"));
    
    if (gridSize === 0 || gridSize < 0 || gridSize > 100) {
        alert("Grid size is out of range!");
    }

    else {
        validNum = true;
    }
}

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
squares.forEach(square => square.style.backgroundColor = setBg());
