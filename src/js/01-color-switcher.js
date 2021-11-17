function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]')
const body = document.querySelector('body');
const colorVal = document.querySelector('.color')

const clrCngClick = () => {  
  startBtn.setAttribute('disabled', 'disabled');
  stopBtn.removeAttribute('disabled');
  colorBody = setInterval(cngClick, 1000);
  return body.style.backgroundColor = getRandomHexColor();
}

const stopCngClick = () => {
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', 'disabled');
  clearInterval(colorBody);
}

const cngClick = () => {
  const bgColor = body.style.backgroundColor = getRandomHexColor();
}

startBtn.addEventListener('click', clrCngClick);

stopBtn.addEventListener('click', stopCngClick);