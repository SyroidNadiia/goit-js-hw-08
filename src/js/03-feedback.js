import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

const feedbackFormEL = document.querySelector('.feedback-form');

feedbackFormEL.addEventListener('input', throttle(onTextInput, 500));
feedbackFormEL.addEventListener('submit', onFormSubmit);

onSavedData();

function onTextInput(event) {
  formData[event.target.name] = event.target.value;
  const savedFormData = localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(formData)
  );
}

function onFormSubmit(event) {
  event.preventDefault();
  event.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onSavedData() {
  try {
    savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    for (let key in savedFormData) {
      feedbackFormEL.elements[key].value = savedFormData[key];
      console.log(feedbackFormEL.elements[key].value);
    }
  } catch (error) {
    console.log(error.name);
  }
}
