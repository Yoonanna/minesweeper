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

let field = document.createElement('div');
field.className = 'field';
game.append(field);

function start(width, heigth, minesCount) {
    let cells = width * heigth;
    field.innerHTML = '<button></button>'.repeat(cells);
};
start(10, 10, 10);

