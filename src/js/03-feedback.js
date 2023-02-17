import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

const feedbackFormEL = document.querySelector('.feedback-form');
const inputEl = document.querySelector('input');
const textAreaEl = document.querySelector('textarea');

feedbackFormEL.addEventListener('input', throttle(onTextInput, 500));
feedbackFormEL.addEventListener('submit', onFormSubmit);

onSavedData();

function onTextInput(event) {
  formData[event.target.name] = event.target.value;
  const savedFormData = localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(formData)
  );
  console.log(formData);
}

function onFormSubmit(event) {
  event.preventDefault();
  event.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onSavedData() {
  const savedDataInLocal = localStorage.getItem(STORAGE_KEY);

  if (savedDataInLocal) {
    const parseSavedDataInLocal = JSON.parse(savedDataInLocal);
    console.log(parseSavedDataInLocal);

    inputEl.value = parseSavedDataInLocal.email;
    textAreaEl.value = parseSavedDataInLocal.message;
  }
}
