import {cardsList, pagination} from '../script.js';
import {loadMoreVacancies} from './getVacancies.js';
import {createCards} from './createCards.js';

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadMoreVacancies();
      }
    });
  },
  {
    rootMargin: "100px",
  },
);

export const renderVacancies = (data) => {
  if (!data.vacancies.length) {
    cardsList.innerHTML = `
      <b style="font-size: 16px">
        Нет вакансий с выбранными параметрами
      </b>
    `;
    return;
  }

  cardsList.innerHTML = '';
  const cards = createCards(data);
  cardsList.append(...cards);

  if (data.pagination) {
    Object.assign(pagination, data.pagination);
  }

  observer.observe(cardsList.lastElementChild);
};

export const renderMoreVacancies = (data) => {
  const cards = createCards(data);
  cardsList.append(...cards);

  if (data.pagination) {
    Object.assign(pagination, data.pagination);
  }

  observer.observe(cardsList.lastElementChild);
};