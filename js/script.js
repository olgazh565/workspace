import {controlFormFilter, resetForm, toggleFilter} from './modules/filterControl.js';
import {controlNumberInputForFirefox, fileControl, formControl} from './modules/formControl.js';
import {getVacancies} from './modules/getVacancies.js';
import {modalControl} from './modules/modalControl.js';
import {selectCityControl} from './modules/selectCityControl.js';

export const API_URL = 'https://sunrise-succulent-forest.glitch.me/';
export const LOCATION_URL = 'api/locations';
export const VACANCY_URL = 'api/vacancy';
export const cardsList = document.querySelector('.cards__list');
const citySelect = document.querySelector("#city");
export const pagination = {};
export const appData = {
  lastUrl: '',
};

const init = () => {
  try {
    const cityChoices = new Choices(citySelect, {
      itemSelectText: "",
      allowHTML: true,
    });

    toggleFilter();
    selectCityControl(cityChoices);
    getVacancies();
    modalControl();
    controlFormFilter();
    resetForm(cityChoices);
  } catch (error) {
    console.log('error: ', error);
    console.warn('Мы не на странице index.html');
  }
  try {
    fileControl();
    formControl();
    controlNumberInputForFirefox();
  } catch (error) {
    console.log('error: ', error);
    console.warn('Мы не на странице employer.html');
  }
};

init();
