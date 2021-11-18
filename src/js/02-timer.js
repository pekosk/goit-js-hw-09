// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const inputDate = document.querySelector('#datetime-picker');
const submitDate = document.querySelector('[data-start]');
let userDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] >= new Date()) {
      submitDate.removeAttribute('disabled');
    } else {
      submitDate.setAttribute('disabled', 'disabled');
      window.alert("Please choose a date in the future");
    }
    // console.log(selectedDates[0]);
    userDate = selectedDates[0];
    logDate()
  },
};

function logDate() {
  const timeToWait = Date.parse(userDate) - Date.parse(new Date());
  const timerTime = convertMs(timeToWait);
  console.log(convertMs(timeToWait));
  return timerTime;
}

function setTimer() {
  const { days, hours, minutes, seconds } = logDate();
  document.querySelector('[data-days]').textContent = days.toString().padStart(2, '0');
  document.querySelector('[data-hours]').textContent = hours.toString().padStart(2, '0');
  document.querySelector('[data-minutes]').textContent = minutes.toString().padStart(2, '0');
  document.querySelector('[data-seconds]').textContent = seconds.toString().padStart(2, '0');
}

function submitDateClick() {
  const diff = Date.parse(userDate) - Date.parse(new Date());
  const timerSetter = setInterval(setTimer, 1000);
    if (diff < 1000) {
      console.log(diff)
      clearInterval(timerSetter);
    }
}

submitDate.addEventListener('click', submitDateClick);

const fp = flatpickr(inputDate, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
