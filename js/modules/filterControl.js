import {API_URL, VACANCY_URL, appData} from '../script.js';
import {getData} from './getData.js';
import {renderError} from './renderError.js';
import {renderVacancies} from './renderVacancies.js';
import {Loader} from '../loader.js';
import {selectCityControl} from './selectCityControl.js';
import {getVacancies} from './getVacancies.js';

const vacanciesFilter = document.querySelector('.vacancies__filter');
const vacanciesFilterBtn = document.querySelector('.vacancies__filter-btn');
const filterForm = document.querySelector(".filter__form");

const openFilter = (btn, dropDown, classNameBtn, classNameDd) => {
  dropDown.style.height = `${dropDown.scrollHeight}px`;
  btn.classList.add(classNameBtn);
  dropDown.classList.add(classNameDd);
};

const closeFilter = (btn, dropDown, classNameBtn, classNameDd) => {
  btn.classList.remove(classNameBtn);
  dropDown.classList.remove(classNameDd);
  dropDown.style.height = "";
};

// filter
export const toggleFilter = () => {
  vacanciesFilterBtn.addEventListener("click", () => {
    if (vacanciesFilterBtn.classList.contains("vacancies__filter-btn_active")) {
      closeFilter(
        vacanciesFilterBtn,
        vacanciesFilter,
        "vacancies__filter-btn_active",
        "vacancies__filter_active",
      );
    } else {
      openFilter(
        vacanciesFilterBtn,
        vacanciesFilter,
        "vacancies__filter-btn_active",
        "vacancies__filter_active",
      );
    }
  });

  window.addEventListener("resize", () => {
    if (vacanciesFilterBtn.classList.contains("vacancies__filter-btn_active")) {
      // 1)
      // vacanciesFilter.style.height = `${vacanciesFilter.scrollHeight}px`;
      // 2)
      closeFilter(
        vacanciesFilterBtn,
        vacanciesFilter,
        "vacancies__filter-btn_active",
        "vacancies__filter_active",
      );
    }
  });
};

export const resetForm = (cityChoices) => {
  const resetButton = document.querySelector('.filter__reset');

  resetButton.addEventListener('click', () => {
    filterForm.reset();

    cityChoices.destroy();
    cityChoices.init();

    selectCityControl(cityChoices);
    getVacancies();
  })
};

export const controlFormFilter = () => {

  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    Loader.open();

    const formData = new FormData(filterForm);

    const urlWithParam = new URL(`${API_URL}${VACANCY_URL}`);

    formData.forEach((value, key) => {
      urlWithParam.searchParams.append(key, value);
    });

    getData(urlWithParam, renderVacancies, renderError)
      .then(() => {
        appData.lastUrl = urlWithParam;
      })
      .then(() => {
        closeFilter(
          vacanciesFilterBtn,
          vacanciesFilter,
          "vacancies__filter-btn_active",
          "vacancies__filter_active",
        );
      })
      .finally(() => Loader.close());
  });
};