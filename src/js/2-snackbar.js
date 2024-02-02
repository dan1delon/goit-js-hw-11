import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css'; 

const form = document.querySelector('form');

form.addEventListener('submit', addPromise);

function addPromise(event) {
    event.preventDefault();
    const { delay, state } = event.currentTarget.elements;

    createPromise(delay.value, state.value)
        .then(() => iziToast.success({
            title: 'OK',
            message: `✅ Fulfilled promise in ${delay.value}ms`,
            position: "topCenter",
        }))
        .catch(()=> iziToast.error({
            title: 'Error',
            message: `❌ Rejected promise in ${delay.value}ms`,
            position: "topCenter",
        }));
}

function createPromise(delay, value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (value === 'fulfilled') {
                resolve(value);
            } else {
                reject(value);
            }
        }, delay);
    });
}