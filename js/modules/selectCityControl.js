import {API_URL, LOCATION_URL} from '../script.js';
import {getData} from './getData.js';

export const selectCityControl = (cityChoices) => {
  getData(
    `${API_URL}${LOCATION_URL}`,
    (locationData) => {
      const locations = locationData.map((location) => ({
        value: location,
      }));

      cityChoices.setChoices(locations, "value", "label", false);
    },
    (err) => {
      console.log(err);
    },
  );
};