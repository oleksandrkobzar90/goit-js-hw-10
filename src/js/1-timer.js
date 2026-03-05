// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import errorIcon from '../img/Error.svg';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let userSelectedDate;
let intervalId;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: 'Y-m-d H:i',
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate.getTime() > options.defaultDate.getTime()) {
      startBtn.disabled = false;
    } else {
      startBtn.disabled = true;
      iziToast.error({
        position: 'topRight',
        message: 'Please choose a date in the future',
        backgroundColor: '#ef4040',
        iconUrl: errorIcon,
        messageColor: '#fff',
        close: false,
        progressBar: false,
      });
    }
  },
};

flatpickr('#datetime-picker', options);

const handleOnStartBtn = () => {
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const diff = userSelectedDate - currentTime;

    if (userSelectedDate <= currentTime) {
      clearInterval(intervalId);
      dateInput.disabled = false;
      return;
    }

    const time = convertMs(diff);
    days.textContent = addLeadingZero(time.days);
    hours.textContent = addLeadingZero(time.hours);
    minutes.textContent = addLeadingZero(time.minutes);
    seconds.textContent = addLeadingZero(time.seconds);
  }, 1000);
  startBtn.disabled = true;
  dateInput.disabled = true;
};

startBtn.addEventListener('click', handleOnStartBtn);

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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
