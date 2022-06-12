const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

const centerPane = document.querySelector('.canvas');

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

    let cellCoordinates = [];

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

        // square.addEventListener('mousemove', () => {
        //     console.log("mousemove");
        //     square.style.backgroundColor = "black";
        // })
        // square.addEventListener('touchstart', () => {
        //     console.log("touchstart");
        //     square.style.backgroundColor = "black";
        // }, false)
        // square.addEventListener('touchmove', () => {
        //     console.log("touchmove");
        //     square.style.backgroundColor = "black";
        // }, false)

        square.addEventListener('touchmove', e => {
            // const currentPixel = e.currentTarget.getBoundingClientRect();
            // console.log("currentPixelWidth: " + (currentPixel.right - currentPixel.left));
            // console.log("currentPixelHeight: " + (currentPixel.bottom - currentPixel.top));

            // console.log(currentPixel.top);
            // console.log(currentPixel.left);
            // console.log(currentPixel.bottom);
            // console.log(currentPixel.right);
            
            // let touchX = e.touches[0].clientX - rect.left;
            // let touchY = e.touches[0].clientY - rect.top;

            // console.log("touchX: " + (e.touches[0].clientX - rect.left));
            // console.log("touchY: " + (e.touches[0].clientY - rect.top));

            let currentPixel = e.currentTarget.getBoundingClientRect();

            // console.log(currentPixel.top);
            // console.log(currentPixel.left);
            // console.log(currentPixel.bottom);
            // console.log(currentPixel.right);
        });
    });

    // centerPane.addEventListener('mousemove', e => {
    //     const rect = e.currentTarget.getBoundingClientRect();
    //     console.log(e.clientX - rect.left);
    //     console.log(e.clientY - rect.top);
    // });
    centerPane.addEventListener('touchmove', e => {
        let touchX = e.touches[0].clientX;
        let touchY = e.touches[0].clientY;

        // console.log("touchX: " + touchX);
        // console.log("touchY: " + touchY);

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

        // const rect = e.currentTarget.getBoundingClientRect();
        // console.log("touchX: " + (e.touches[0].clientX - rect.left));
        // console.log("touchY: " + (e.touches[0].clientY - rect.top));

        // let touchX = e.touches[0].clientX - rect.left;
        // let touchY = e.touches[0].clientY - rect.top;

        // if ()
    });
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
    generateGrid();
});

const btnClear = document.querySelector('.btn-clear');

btnClear.addEventListener('click', () => {
    clearGrid();
});

generateGrid();
