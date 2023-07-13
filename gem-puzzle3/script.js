let gameZona = document.querySelector('.gameZone');
let cellNum =[...Array(8).keys()];
let cells = [];
let cellSize = 400;
let emptiness = {
    value: 0,
    left: 2,
    top: 2,
}
const selection = document.querySelector('select')
let selectChoice = selection.value.slice(-1);
let numOfCells = selectChoice ** 2;
let start = document.querySelector('.start');
let arrValue = [9, 1, 2, 3, 4, 5, 6, 7, 8];

start.addEventListener('click', () => {
    generate();
})

// function cellCreate(param) {
    

//   }

function move(num) {
    let cell = cells[num];
    let leftBord = Math.abs(emptiness.left - cell.left);
    let topBord = Math.abs(emptiness.top - cell.top);

    if(leftBord + topBord > 1) {
        console.log('Нельзя ходить так')
        return;
    }
    cell.element.style.left = `${emptiness.left * cellSize}px`;
    cell.element.style.top = `${emptiness.top * cellSize}px`;

    let empPosLeft = emptiness.left;
    let empPosTop = emptiness.top;
    emptiness.left = cell.left;
    emptiness.top = cell.top;
    cell.left = empPosLeft;
    cell.top = empPosTop;

    let finish = cells.every(cell => {
        return cell.value - 1 === cell.top * selectChoice + cell.left;
    })
    if(finish) {
        console.log('win')
    }
}
  
function generate() {
    gameZona.innerHTML = '';
    cells = [];
    emptiness = {
        value: 0,
        left: 2,
        top: 2,
    }
    arrValue.sort(() => Math.random() - 0.5)
    for (let i = 0; i < arrValue.length; i++) {
        let value = arrValue[i];

        let cellDiv = document.createElement('div');
        cellDiv.className = 'cell';
        cellDiv.innerHTML = value;
        cellDiv.id = 'num' + arrValue[i]
        cellDiv.addEventListener('click', () => {
            move(i);
        })
        gameZona.appendChild(cellDiv);

        let left = i % selectChoice;
        let top = (i - left) / selectChoice;
        // if (cell)
        cells.push({
            value: value,
            left: left,
            top: top,
            element: cellDiv
        });
        if (value === 9) {
            emptiness.left = cells[i].left;
            emptiness.top = cells[i].top;
            cells[i] = {
                value: 9,
                left: 2,
                top: 2,
            }
            // cells.splice(cells[i], 1)
        }

        // cell.style.width = `${320 / selectChoice}px`
        // cell.style.height = `${320 / selectChoice}px`
        cellDiv.style.left = `${left * cellSize}px`;
        cellDiv.style.top = `${top * cellSize}px`;
        // emptiness.left = cells[0].left;
        // emptiness.top = cells[0].top;
    }
    
    document.querySelector('#num9').remove()
}

