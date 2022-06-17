const canvas = document.getElementById('gameBoard');
const ctx = canvas.getContext('2d');

ctx.font = '40px FontAwesome';

const FIELDS = [];
const ICONS = ['\uf188', '\uf02a', '\uf121', '\uf542', '\uf085', '\uf126'];
const iconValues = {};

let firstClick = 0;
let nextClick = 0;
let firstElemCords;
let nextElemCords;

canvas.addEventListener('click', (e) => {
    let x = e.offsetX;
    let y = e.offsetY;

    x = Math.floor(x / 80);
    y = Math.floor(y / 100);
    FIELDS[y][x][0] = 1;

    showIcon();

    if (firstClick === 0) {
        firstClick = FIELDS[y][x];
        firstElemCords = [x, y];
    } else {
        nextClick = FIELDS[y][x];
        nextElemCords = [x, y];
    }

    if (firstClick !== 0 && nextClick !== 0) {
        if (firstClick[1] === nextClick[1]) {
            ctx.clearRect(firstElemCords[0] * 80, firstElemCords[1] * 100, 80, 100);
            ctx.clearRect(nextElemCords[0] * 80, nextElemCords[1] * 100, 80, 100);
            firstClick = 0;
            nextClick = 0;
        } else {
            ctx.clearRect(firstElemCords[0] * 80, firstElemCords[1] * 100, 80, 100);
            ctx.clearRect(nextElemCords[0] * 80, nextElemCords[1] * 100, 80, 100);
            ctx.strokeStyle = 'green';
            ctx.fillStyle = 'black'
            ctx.lineWidth = '2';
            ctx.fillRect(firstElemCords[0] * 80, firstElemCords[1] * 100, 80, 100);
            ctx.fillRect(nextElemCords[0] * 80, nextElemCords[1] * 100, 80, 100);
            ctx.stroke();
            firstClick = 0;
            nextClick = 0;
        }
    }
    FIELDS[y][x][0] = 0;
});

const getStart = () => {
    let col = 10;
    let row = 6;

    for (let i = 0; i < row; i++) {
        FIELDS[i] = [];
        for (let k = 0, x = 0; k < col; k++, x++) {
            let iconValue = Math.floor(Math.random() * ICONS.length);
            FIELDS[i][k, x] = [0, iconValue];
        }
    }
console.log(FIELDS);
    let startX = 0;
    let startY = 0;
    for (let h = 0; h < FIELDS.length; h++) {
        for (let w = 0; w < FIELDS[1].length; w++) {
            ctx.strokeStyle = 'green';
            ctx.fillStyle = 'black'
            ctx.lineWidth = '2';
            ctx.rect(startX, startY, 80, 100);
            ctx.fill();
            ctx.stroke();
    
            startX += 80;
        }
        startX = 0;
        startY += 100;
    }
}

const showIcon = () => {
    for (let i = 0; i < 6; i++) {
        for (let k = 0; k < 10; k++) {
            if (FIELDS[i][k][0] == 1) {
                ctx.fillStyle = 'green'
                ctx.fillText(ICONS[FIELDS[i][k][1]], k * 80 + 20, i * 100 + 60);
                // console.log(ICONS[FIELDS[i][k][1]]);
            }   
        }
    }
}

const clearField = () => {
    for (let i = 0; i < 6; i++) {
        for (let k = 0; k < 10; k++) {
            if (FIELDS[i][k][0] == 1) {
                ctx.clearRect(k[0] * 80, i * 100, 80, 100);
            }   
        }
    }
}


getStart();