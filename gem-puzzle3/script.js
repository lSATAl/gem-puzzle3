let gameZona = document.querySelector('.gameZone');

let cells = [];
let emptiness = {
    value: 0,
    left: 2,
    top: 2,
}
const selection = document.querySelector('select')
let selectChoice = selection.value.slice(-1);
let numOfCells = selectChoice ** 2;
let cellNum =[...Array(numOfCells+1).keys()];
cellNum = cellNum.slice(1)
// cellNum[0] = cellNum.length;
let cellSize = 320 / selectChoice;
let start = document.querySelector('.start');
// let arrValue = [9, 1, 2, 3, 4, 5, 6, 7, 8];
let timerForm = document.querySelector('.timer');
let count = document.querySelector('.count');
let step = 0;
start.addEventListener('click', () => {
    stoptimer()
    generate();
    timer();
    step = 0;
    count.innerHTML = `Ходы : 0`
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
    step++;
    count.innerHTML = `Ходы : ${step}`
}
  
function generate() {
    gameZona.innerHTML = '';
    cells = [];
    emptiness = {
        value: 0,
        left: 2,
        top: 2,
    }
    selectChoice = selection.value.slice(-1);
    cellSize = 320 / selectChoice;
    numOfCells = selectChoice ** 2;
    let cellNum =[...Array(numOfCells+1).keys()]; //временно
    cellNum = cellNum.slice(1) //временно
    // cellNum =[...Array(numOfCells).keys()];
    // cellNum[0] = cellNum.length;
    arrValue = cellNum;

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
        if (value === arrValue.length) {
            emptiness.left = cells[i].left;
            emptiness.top = cells[i].top;
            cells[i] = {
                value: arrValue.length,
                left: selectChoice - 1,
                top: selectChoice - 1,
            }
            // cells.splice(cells[i], 1)
        }

        cellDiv.style.width = `${320 / selectChoice}px`
        cellDiv.style.height = `${320 / selectChoice}px`
        cellDiv.style.left = `${left * cellSize}px`;
        cellDiv.style.top = `${top * cellSize}px`;
        // emptiness.left = cells[0].left;
        // emptiness.top = cells[0].top;
    }
    
    document.querySelector(`#num${arrValue.length}`).remove()
}

//Секундомер
let tictac;
let S = '00', M = '00', H = '00';
let vivod = '';
function timer(){
    
    S = '00';
    M = '00';
    H = '00';
    vivod = '';
    
    tictac = setInterval(function(){
      //Плюсик перед строкой преобразует его в число,мания вне хогвартса
      S = +S +1;
      //Если результат меньше 10, прибавляем впереди строку '0'
      if( S < 10 ) { S = '0' + S; }
      if( S == 60 ) {
        S = '00';
        //Как только секунд стало 60, добавляем +1 к минутам
        M = +M + 1;
        //Дальше то же самое, что и для секунд
        if( M < 10 ) { M = '0' + M; }
        if( M == 60 ) {
          //Как только минут стало 60, добавляем +1 к часам.
          M = '00';
          H = +H + 1;
          if( H < 10 ) { H = '0' + H; }
        }
      }
      
        vivod = H + ':' + M + ':' + S;
        timerForm.innerHTML = vivod;
      //Тикает всё через одну функцию, раз в секунду.
    },1000);
    
    

};
function stoptimer() {
    clearInterval(tictac);
    S = '00';
    M = '00';
    H = '00';
    vivod = H + ':' + M + ':' + S;
    timerForm.innerHTML = "00:00:00"
}