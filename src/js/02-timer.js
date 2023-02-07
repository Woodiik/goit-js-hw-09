import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
   input: document.querySelector('#datetime-picker'),
   startBtn: document.querySelector('[data-start]'),
   daysValue: document.querySelector('[data-days]'),
   hoursValue: document.querySelector('[data-hours]'),
   minutesValue: document.querySelector('[data-minutes]'),
   secondsValue: document.querySelector('[data-seconds]'),
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
     console.log(selectedDates[0]);
       if(selectedDates[0] < Date.now()) {
      Notify.warning("Please choose a date in the future")
       } else {
          refs.startBtn.classList.remove('inactive');
      }
   }
};

let intervalId = null;
const calendar = flatpickr(refs.input, options);

refs.startBtn.classList.add('inactive')
refs.startBtn.addEventListener('click', startTimer)



function startTimer() {
   intervalId = setInterval(() => {
      const deltaTime = calendar.selectedDates[0] - Date.now();
   
      refs.daysValue.textContent = addLeadingZero(convertMs(deltaTime).days);
      refs.hoursValue.textContent = addLeadingZero(convertMs(deltaTime).hours);
      refs.minutesValue.textContent = addLeadingZero(convertMs(deltaTime).minutes);
      refs.secondsValue.textContent = addLeadingZero(convertMs(deltaTime).seconds);
      if (deltaTime <= 999) {
         stopTimer();
      }
   }, 1000)

}
function stopTimer() {
   clearInterval(intervalId);
   refs.startBtn.style.pointerEvents = 'none';
}
function addLeadingZero(value) {
   return String(value).padStart(2, '0')
}

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
