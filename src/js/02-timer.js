// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDate = document.querySelector('#datetime-picker');
const submitDate = document.querySelector('[data-start]');
let userDate = null;
let timerSetter = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onOpen(selectedDates) {
    Notify.info('Select the date on which you want to set the counter');
  },
  onClose(selectedDates) {
    if (selectedDates[0] >= new Date()) {
      submitDate.removeAttribute('disabled');
    } else {
      submitDate.setAttribute('disabled', 'disabled');
      Notify.failure("Please choose a date in the future");
    }
    userDate = selectedDates[0];
  },
};

function logDate() {
  const timeToWait = userDate - new Date();
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
  timerSetter = setInterval(() => {
    const diff = userDate - new Date();
    if (diff <= 0) {
      clearInterval(timerSetter);
      submitDate.removeAttribute('disabled');
    return;
    }
    submitDate.setAttribute('disabled', 'disabled');
  setTimer(diff);
  }, 1000);
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
