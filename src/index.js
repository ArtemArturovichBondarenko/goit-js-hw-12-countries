import fetchCountries from './js/fetchCountries';
import markupTemplate from './templates/markup.hbs';
import listCountriesTemplate from './templates/listCountries.hbs';
import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';
import PNotifyButtons from '../node_modules/pnotify/dist/es/PNotifyButtons.js';
import PNotifyStyleMaterial from '../node_modules/pnotify/dist/es/PNotifyStyleMaterial.js';
import "../node_modules/pnotify/dist/PNotifyBrightTheme.css";
import './styles.css';

PNotify.defaults.styling = 'material';
const debounce = require('lodash.debounce');

const refs = {
  input: document.querySelector('#input'),
  div: document.querySelector('#country_mapping'),
};

refs.input.addEventListener('input', debounce(countrySearch, 500));

function countrySearch(e) {
  fetchCountries(e.target.value).then(data => {
    const country = bildMarkup(data);
    const countries = bildListCountries(data);
    console.log(data);
    if(data.length > 10) {
        PNotify.error({
            text: 'Too many matches found. Please enter a more specific query!',
            
          });
    } else {
        if (data.length > 1) {
            insertMarkup(countries);
          } else {
            insertMarkup(country);
          }
    }
    
  });
}

function insertMarkup(markup) {
  refs.div.innerHTML = markup;
}

function bildMarkup(items) {
  return markupTemplate(items);
}

function bildListCountries(items) {
  return listCountriesTemplate(items);
}


