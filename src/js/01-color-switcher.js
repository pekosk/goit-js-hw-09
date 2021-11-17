function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const changeBtn = document.querySelector('.change-color');
const body = document.querySelector('body');
const colorVal = document.querySelector('.color')

const clrCngClick = () => {  
  const bgColor = body.style.backgroundColor = getRandomHexColor();
  colorVal.textContent = bgColor}

changeBtn.addEventListener('click', clrCngClick);

setInterval(clrCngClick, 1)
