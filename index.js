let wrapper = document.createElement('div');
wrapper.className = 'wrapper';
document.body.append(wrapper);

let caption = document.createElement('p');
caption.className = 'caption';
caption.innerText = 'pushhhhhhh...on a square (¬‿¬)';
wrapper.append(caption);

let game = document.createElement('div');
game.className = 'game';
wrapper.append(game);

let info = document.createElement('div');
info.className = 'info';
game.append(info);

let counter = document.createElement('div');
counter.className = 'counter';
counter.innerText = '0';
info.append(counter);

let smile = document.createElement('div');
smile.className = 'smile';
smile.innerText = 'new game';
info.append(smile);

let timer = document.createElement('div');
timer.className = 'timer';
info.append(timer);

let field = document.createElement('div');
field.className = 'field';
game.append(field);

let modal = document.createElement('div');
modal.className = 'modal';
wrapper.append(modal);

function start(width, heigth, minesCount) {
    let cells = width * heigth;
    field.innerHTML = '<button></button>'.repeat(cells);

    let fieldCells = [...field.children];
    let mines = [...Array(cells).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, minesCount);
    console.log(mines);

    field.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON')
            return;
        let index = fieldCells.indexOf(event.target);
        let column = index % width;
        let row = Math.floor(index / width);
        open(row, column);
        counter.innerText++;

    });
    field.addEventListener('mousedown', (event) => {

        if (event.button == 2) {
            console.log(event);
            event.button.innerHTML = '\u{1F3F4}';
            window.oncontextmenu = (function (e) {
                return false;
            });
        }
    });
    function nearMines(row, column) {
        let btn = event.target;
        let count = ' ';
        btn.style.backgroundColor = '#48656b'
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (isMine((row + j), (column + i))) {
                    count++;

                    if (count == 1) {
                        btn.style.backgroundColor = '#98423c'
                    } else if (count === 2) {
                        btn.style.backgroundColor = '#467baa'
                    } else if (count === 3) {
                        btn.style.backgroundColor = '#ffe35f'
                    } else if (count === 4) {
                        btn.style.backgroundColor = '#00a86b'
                    } else if (count === 5) {
                        btn.style.backgroundColor = '#ffbdf0'
                    }
                }
            }
        }
        return count
    };
    function open(row, column) {
        let index = row * width + column;
        let cell = fieldCells[index];
        cell.innerHTML = isMine(row, column) ? '\u{1F4A3}' : nearMines(row, column);
        if (cell.innerHTML == '\u{1F4A3}') {
            modal.classList.add('active');
            modal.innerText = 'Game over... Try again! =)';
            clearInterval(setTime);
        };
    };
    function isMine(row, column) {
        if (!isValid(row, column)) return false;
        let index = row * width + column;
        return mines.includes(index);
    };
    function isValid(row, column) {
        let valid = row >= 0 && row < heigth && column >= 0 && column < width;
        return valid;
    }

};
start(10, 10, 10);

// timer
let setTime;
let sec = 0;
let min = 0;
timer.innerHTML = '000';
function tick() {
    sec++;
    if (sec < 10) { timer.innerHTML = '00' + sec }
    else if (sec >= 10 && sec < 100) { timer.innerHTML = '0' + sec }
    else { timer.innerHTML = ' ' + sec }
};
field.addEventListener('click', function init() {
    sec = 0;
    setTime = setInterval(tick, 1000);
    this.removeEventListener('click', arguments.callee);
});

smile.addEventListener('click', () => window.location.reload());

