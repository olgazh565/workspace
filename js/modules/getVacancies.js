import {API_URL, VACANCY_URL, appData, pagination} from '../script.js';
import {getData} from './getData.js';
import {renderVacancies, renderMoreVacancies} from './renderVacancies.js';
import {renderError} from './renderError.js';
import {Loader} from '../loader.js';

export const getVacancies = () => {
  const urlWithParams = new URL(`${API_URL}${VACANCY_URL}`);

  urlWithParams.searchParams.set("limit", window.innerWidth < 768 ? 6 : 12);
  urlWithParams.searchParams.set("page", 1);

  Loader.open();

  getData(urlWithParams, renderVacancies, renderError)
    .then(() => {
      appData.lastUrl = urlWithParams;
    })
    .finally(() => Loader.close());
};

export const loadMoreVacancies = () => {
  if (pagination.totalPages > pagination.currentPage) {
    const urlWithParams = new URL(appData.lastUrl);
    urlWithParams.searchParams.set("page", pagination.currentPage + 1);
    urlWithParams.searchParams.set("limit", window.innerWidth < 768 ? 6 : 12);

    getData(urlWithParams, renderMoreVacancies, renderError)
      .then(() => {
        appData.lastUrl = urlWithParams;
      });
  }
};