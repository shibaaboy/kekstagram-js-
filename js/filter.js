import {
  getRandomArrayInt
} from './util.js';

let filtersButtonsElements = document.querySelectorAll('.img-filters__button');
let defaultFilterButton = document.querySelector('#filter-default');
let randomFilterButton = document.querySelector('#filter-random');
let discussedFilterButton = document.querySelector('#filter-discussed');

const sortByQuantityComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const filterDefault = (photos, callback) => {
  defaultFilterButton.addEventListener('click', () => {
    filtersButtonsElements.forEach(element => element.classList.remove('img-filters__button--active'));
    defaultFilterButton.classList.add('img-filters__button--active');
    callback(photos);
  });
}

const filterRandom = (photos, callback) => {
  randomFilterButton.addEventListener('click', () => {
    filtersButtonsElements.forEach(element => element.classList.remove('img-filters__button--active'));
    randomFilterButton.classList.add('img-filters__button--active');
    let newArray = [];
    for (let i = 10; i > 0; i--) {
      let photo = photos.slice().splice(getRandomArrayInt(0, photos.length - 1), 1);
      while (newArray.includes(photo[0])) {
        photo = photos.slice().splice(getRandomArrayInt(0, photos.length - 1), 1);
      }
      newArray.push(photo[0]);
    }
    callback(newArray);
  });
}

const filterDiscussed = (photos, callback) => {
  discussedFilterButton.addEventListener('click', () => {
    filtersButtonsElements.forEach(element => element.classList.remove('img-filters__button--active'));
    discussedFilterButton.classList.add('img-filters__button--active');
    let newArray = photos.slice().sort(sortByQuantityComments);
    callback(newArray);
  });
}

export {
  filterDefault,
  filterRandom,
  filterDiscussed
};
