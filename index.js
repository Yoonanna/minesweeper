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

    field.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON')
            return;
        let index = fieldCells.indexOf(event.target);
        let column = index % width;
        let row = Math.floor(index / width);
        open(row, column);
        counter.innerText++;

    });
    function open(row, column) {
        let index = row * width + column;
        let cell = fieldCells[index];
        cell.innerHTML = isMine(row, column) ? '\u{1F4A3}' : ' ';
        if (cell.innerHTML == '\u{1F4A3}') {
            modal.classList.add('active');
            modal.innerText = 'Game over... Try again! =)';
            clearInterval(setTime);
        }

    }
    function isMine(row, column) {
        let index = row * width + column;

        return mines.includes(index);

    }
};
start(10, 10, 10);

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
    this.removeEventListener("click", arguments.callee);
});

smile.addEventListener('click', () => window.location.reload());