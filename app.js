const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const againBtn = document.createElement('div')
const colors = ['#d20962', '#f47721', '#7ac143', '#00a78e', '#00bce4', '#7d3f98']

let time = 0
let score = 0
let current=0

startBtn.addEventListener('click', (event)=>{
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event =>{
    if (event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event =>{
    if (event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame(){
    score = 0
    timeEl.parentNode.classList.remove('hide')
    board.innerHTML = ""
    const timer = setInterval(()=>{
        if (time === 0){
            clearInterval(timer)
            finishGame()
        }else{
                current = --time
            if (current < 10){
                current = `0${current}`
            }
            setTime(current)
        }
    }, 1000)
    setTime(time)
    createRandomCircle()
}

// function decreaseTime(){
//     if (time === 0){
//         finishGame()
//     }else{
//             current = --time
//         if (current < 10){
//             current = `0${current}`
//         }
//         setTime(current)
//     }
// }
    
function setTime(value){
    timeEl.innerHTML = `00:${value}`
}

function finishGame(){
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
    againBtn.classList.add('againBtn')
    return board.append(againBtn)
    //board.innerHTML = `<a href="#start-screen">Заново</a>`

}

againBtn.addEventListener('click', ()=>{
    screens[1].classList.remove('up')
})


function createRandomCircle(){
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.background = getRandomColor()
    circle.style.height = `${size}px`
    circle.style.width = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function getRandomNumber(min, max){
    return Math.round(Math.random()*(max-min)+min)
}

function getRandomColor(){
    return colors[Math.floor(Math.random()*colors.length)]
}