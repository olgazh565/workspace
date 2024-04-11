import {Loader} from '../loader.js';
import {API_URL, VACANCY_URL} from '../script.js';

const validateForm = (form) => {
  const validate = new JustValidate(form, {
    errorLabelStyle: {
      color: '#f00',
    },
    errorFieldStyle: {
      borderColor: '#f00'
    },
    errorFieldCssClass: 'invalid',
    // errorsContainer: document.querySelector('.employer__error'),
  });

  validate
    .addField('#logo', [
      {
        rule: 'minFilesCount',
        value: 1,
        errorMessage: 'Добавьте логотип'
      },
      {
        rule: 'files',
        value: {
          files: {
            extensions: ['jpeg', 'png', 'jpg'],
            maxSize: 102400,
            minSize: 1000,
            types: ['image/jpeg', 'image/png'],
          }
        },
        errorMessage: 'Размер файла должен быть не более 100Кб'
      }
    ])
    .addField('#company', [
      {
        rule: 'required',
        errorMessage: 'Заполните название компании'
      }
    ])
    .addField('#title', [
      {
        rule: 'required',
        errorMessage: 'Заполните название вакансии'
      }
    ])
    .addField('#salary', [
      {
        rule: 'required',
        errorMessage: 'Заполните заработную плату'
      }
    ])
    .addField('#location', [
      {
        rule: 'required',
        errorMessage: 'Заполните город'
      }
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Заполните емейл'
      },
      {
        rule: 'email',
        errorMessage: 'Неверный формат емейла'
      }
    ])
    .addField('#description', [
      {
        rule: 'required',
        errorMessage: 'Заполните описание'
      }
    ])
    .addRequiredGroup('#format', 'Выберите формат')
    .addRequiredGroup('#experience', 'Выберите опыт работы')
    .addRequiredGroup('#type', 'Выберите вид занятости');

  return validate;
};

export const fileControl = () => {
  const file = document.querySelector('.file');
  const preview = file.querySelector('.file__preview');
  const input = file.querySelector('.file__input');

  input.addEventListener('change', (event) => {
    if (event.target.files.length > 0) {
      const src = URL.createObjectURL(event.target.files[0])
      file.classList.add('file_active');
      preview.src = src;
      preview.style.display = 'block';
    } else {
      preview.src = '';
      file.classList.remove('file_active');
      preview.style.display = 'none';
    }
  });
};

export const formControl = () => {
  const form = document.querySelector('.employer__form');
  const employerError = document.querySelector('.employer__error');
  const validate = validateForm(form);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validate.isValid) return;

    try {
      const formData = new FormData(form);
      Loader.open();
      const response = await fetch(`${API_URL}${VACANCY_URL}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        Loader.close();
        employerError.textContent = '';

        window.location.href = 'index.html';
      }
    } catch (error) {
      employerError.textContent = 'Произошла ошибка';

      console.error('error: ', error);
    }
  });
};

export const controlNumberInputForFirefox = () => {
  const inputNumberElements = document.querySelectorAll('input[type="number"]');

  inputNumberElements.forEach((input) => {
    let str = '';

    input.addEventListener('input', (event) => {
      console.log('event.data: ', event.data);
      if (isNaN(parseInt(event.data)) && event.data !== null) {
        event.target.value = str;
        return;
      }
      str = event.target.value;
    });
  });
};