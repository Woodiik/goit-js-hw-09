
const refs = {
   startBtn: document.querySelector('[data-start]'),
   stopBtn: document.querySelector('[data-stop]'),
   body: document.querySelector('body'),
}
let timerId = null;


refs.startBtn.addEventListener('click', changeBodyColor);
refs.stopBtn.addEventListener('click', stopChangeColor);
refs.stopBtn.classList.add('inactive');


function changeBodyColor() {
   timerId = setInterval(() => {
      refs.body.style.backgroundColor = getRandomHexColor()
   }, 1000);
   refs.startBtn.classList.add('inactive')
   refs.stopBtn.classList.remove('inactive')
}

function stopChangeColor() {
   clearInterval(timerId);
   refs.startBtn.classList.remove('inactive');
   refs.stopBtn.classList.add('inactive');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}