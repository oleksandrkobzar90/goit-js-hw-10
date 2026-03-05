// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

function createPromise(state, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const delay = Number(formData.get('delay'));
  const state = formData.get('state');

  createPromise(state, delay)
    .then(message => {
      iziToast.success({
        position: 'topRight',
        icon: false,
        close: false,
        progressBar: false,
        message: `✅ ${message}`,
      });
    })
    .catch(message => {
      iziToast.error({
        position: 'topRight',
        icon: false,
        close: false,
        progressBar: false,
        message: `❌ ${message}`,
      });
    });

  form.reset();
}
