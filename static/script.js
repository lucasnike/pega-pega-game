let socket = io();

const boxP1 = document.getElementById("p1")
const boxP2 = document.getElementById("p2")

const scoreElement = document.querySelector('#pontuacao-p1')

let score = 0

let speed = 30;
let right = [10, 210];
let down = [10, 10];

let boxInfo1 = { x: right[0], y: down[0], width: 100, height: 100 }
let boxInfo2 = { x: right[1], y: down[1], width: 100, height: 100 }

// Funções

function moveRight(box, index = 0) {
  right[index] += speed;
  box.style.left = right[index] + "px"
}

function moveLeft(box = boxP1, index) {
  right[index] -= speed;
  box.style.left = right[index] + "px"
}

function moveUp(box, index) {
  down[index] -= speed
  box.style.top = down[index] + "px"
}

function moveDown(box, index) {
  down[index] += speed
  box.style.top = down[index] + "px"
}


function isBoxesTouchingEachOther() {
  boxInfo1 = { x: right[0], y: down[0], width: 100, height: 100 }
  boxInfo2 = { x: right[1], y: down[1], width: 100, height: 100 }


  if (boxInfo1.x < boxInfo2.x + boxInfo2.width &&
    boxInfo1.x + boxInfo1.width > boxInfo2.x &&
    boxInfo1.y < boxInfo2.y + boxInfo2.height &&
    boxInfo1.y + boxInfo1.height > boxInfo2.y) {

    score++
    scoreElement.textContent = score

    socket.emit('score', score)

    right = [10, 210];
    down = [10, 10];

    boxInfo1 = { x: right[0], y: down[0], width: 100, height: 100 }
    boxInfo2 = { x: right[1], y: down[1], width: 100, height: 100 }

    boxP1.style.top = '10px'
    boxP2.style.top = '10px'

    boxP1.style.left = '10px'
    boxP2.style.left = '210px'

    return true
  }

  return false
}

document.body.addEventListener('keydown', event => {
  //Player 1
  if (event.key == 'ArrowUp') {
    moveUp(boxP1, 0)
    isBoxesTouchingEachOther()
  }

  if (event.key == 'ArrowDown') {
    moveDown(boxP1, 0)
    isBoxesTouchingEachOther()
  }
  if (event.key == 'ArrowLeft') {
    moveLeft(boxP1, 0)
    isBoxesTouchingEachOther()
  }
  if (event.key == 'ArrowRight') {
    moveRight(boxP1, 0)
    isBoxesTouchingEachOther()
  }


  // Player 2
  if (event.key.toLowerCase() === 'w') {
    moveUp(boxP2, 1)
    isBoxesTouchingEachOther()
  }

  if (event.key.toLowerCase() === 's') {
    moveDown(boxP2, 1)
    isBoxesTouchingEachOther()
  }
  if (event.key.toLowerCase() === 'a') {
    moveLeft(boxP2, 1)
    isBoxesTouchingEachOther()
  }
  if (event.key.toLowerCase() === 'd') {
    moveRight(boxP2, 1)
    isBoxesTouchingEachOther()
  }


  socket.emit('keydown', {
    key: event.key,
    position: [{ x: right[0], y: down[0], width: 100, height: 100 },
    { x: right[1], y: down[1], width: 100, height: 100 }]
  })
})

socket.on('keydown', info => {
  console.log(info.key)

  right = [info.position[0].x, info.position[1].x];
  down = [info.position[0].y, info.position[1].y];

  boxInfo1 = { x: info.position[0].x, y: info.position[0].y, width: 100, height: 100 }
  boxInfo2 = { x: info.position[1].x, y: info.position[1].y, width: 100, height: 100 }

  boxP1.style.top = `${boxInfo1.y}px`
  boxP2.style.top = `${boxInfo2.y}px`

  boxP1.style.left = `${boxInfo1.x}px`
  boxP2.style.left = `${boxInfo2.x}px`

  isBoxesTouchingEachOther()
})

socket.on('score', score => {
  scoreElement.textContent = score
})
