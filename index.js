let wrapper = document.createElement('div');
wrapper.className = 'wrapper';
document.body.append(wrapper);

let caption = document.createElement('p');
caption.className = 'caption';
caption.innerText = 'pushhhhhhh...';
wrapper.append(caption);

let game = document.createElement('div');
game.className = 'game';
wrapper.append(game);

let info = document.createElement('div');
info.className = 'info';
game.append(info);
let counter = document.createElement('div');
counter.className = 'counter';
counter.innerText = '010';
info.append(counter);
let smile = document.createElement('div');
smile.className = 'smile';
smile.innerText = '\u{1F604}';
info.append(smile);
let timer = document.createElement('div');
timer.className = 'timer';
timer.innerText = 'time';
info.append(timer);

let field = document.createElement('div');
field.className = 'field';
game.append(field);

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

    });
    function open(row, column) {
        let index = row * width + column;
        let cell = fieldCells[index];
        cell.innerHTML = isMine(row, column) ? '\u{1F4A3}' : ' ';
    }
    function isMine(row, column) {
        let index = row * width + column;
        return mines.includes(index);
    }
};
start(10, 10, 10);