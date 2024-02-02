import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css'; 


const timer = document.querySelector('.timer');
const spanDays = timer.querySelector('div span[data-days]');
const spanHours = timer.querySelector('div span[data-hours]');
const spanMinutes = timer.querySelector('div span[data-minutes]');
const spanSeconds = timer.querySelector('div span[data-seconds]');
const button = document.querySelector('button');
let userSelectedDate;
button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      
      if (selectedDate < Date.now()) {
        return iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
          position: "topCenter",
        });
      } else {
          button.disabled = false;
          userSelectedDate = selectedDate;
      }
  },
};

flatpickr('#datetime-picker', options);

button.addEventListener('click', startTimer);


function startTimer() {
  button.disabled = true;

  const intervalId = setInterval(() => {

    const currentTime = Date.now();
    const difference = convertMs(userSelectedDate - currentTime);
    addTime(difference);
    const values = Object.values(difference);
    if (values.every(value => value === 0)) {
      clearInterval(intervalId)
    }
    }, 1000);
}

function addTime({ days, hours, minutes, seconds }) {
  spanDays.textContent = addZero(days);
  spanHours.textContent = addZero(hours);
  spanMinutes.textContent = addZero(minutes);
  spanSeconds.textContent = addZero(seconds);
}

function addZero(num) {
  return num.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}