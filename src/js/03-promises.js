import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

const onFormSubmit = (event) => {
  event.preventDefault();

  let delay = Number(form.elements.delay.value);
  let step = Number(form.elements.step.value);
  let amount = Number(form.elements.amount.value);

for(let position = 1; position <= amount; position += 1) {
  createPromise(position, delay)
  .then(onSuccess)
  .catch(onError)
  delay += step;
}
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
  setInterval(() => {
  if (shouldResolve) {
    resolve({ position, delay });
  } else {
    reject({ position, delay });
  }
}, delay);
})
}

function onSuccess({ position, delay }) {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  console.log(position);
}

function onError({ position, delay }) {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  console.log(position);
}

form.addEventListener('submit', onFormSubmit);