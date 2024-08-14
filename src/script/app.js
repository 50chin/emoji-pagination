import { data } from './emoji.js';
const cardsNode = document.querySelector('.cards__wrapper');
const inputNode = document.querySelector('.header__input');

function searchEmoji(evt) {
  const search = evt.target.value.toLowerCase().trim();
  if (search.length === 0) {
    return;
  } else {
    const newData = data.filter(
      (el) =>
        el.title.toLowerCase().includes(search) || el.keywords.includes(search)
    );
    renderCards(newData);
    renderPagination();
  }
}

inputNode.addEventListener('input', searchEmoji);

// Функция по фильтрацию слов
function filterWords(str) {
  const filteredWords = [...new Set(str.split(' '))];
  return filteredWords.join(' ');
}

function createCard({ title, symbol, keywords }) {
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <p class='card__symbol'>${symbol}</p>
    <h3 class="card__title">${title}</h3> 
    <p class='card__desc'>${filterWords(keywords)}</p>
    `;
  return card;
}

let start = 1;
let end = 5;

const selectNode = document.querySelector('.footer__select');
// Слушатель событий на select
selectNode.addEventListener('change', () => {
  changeSelect(), renderCards(data), renderPagination(), (inputNode.value = '');
});

let defaultNum = 6;

// Функция по выбору select
function changeSelect() {
  defaultNum = selectNode.value;
  return defaultNum;
}

const footerListNode = document.querySelector('.footer__list');

renderPagination(start, end);

// Шаблон для Пагинации
function renderPagination(start = 1, end = 5, num = 1, totalPage) {
  footerListNode.innerHTML = '';
  footerListNode.innerHTML = `
 <li ><button class="footer__list-item" style=${
   num === 1 ? 'color:#ABB5BE;' : ''
 } type=${num === 1 ? 'disabled' : ''}>First</button></li>`;
  for (let i = start; i <= end; i++) {
    footerListNode.innerHTML += `<li><button class="footer__list-item"
     style='${num === i ? 'background:#055160; color:#FFF;' : ''}'
    ${num === i ? 'disabled' : ''}
    >${i}</button></li>`;
  }
  footerListNode.innerHTML += `<li ><button class="footer__list-item" style=${
    end === totalPage ? 'color:#ABB5BE;' : ''
  }  type=${end === totalPage ? 'disabled' : ''}>Last</button></li>`;
}

footerListNode.addEventListener('click', (evt) => {
  inputNode.value = '';
  const choiceSelect = changeSelect();
  let totalPage = Math.ceil(data.length / choiceSelect);
  let result = evt.target.innerText;
  let num;
  if (result === 'First') {
    num = 1;
    start = 1;
    end = start + 4;
  } else if (result === 'Last') {
    end = totalPage;
    start = end - 4;
    num = totalPage;
  } else {
    num = +result;
    if (num === 1 || num === 2 || num === 3) {
      start = 1;
      end = start + 4;
    } else if (
      num === totalPage ||
      num === totalPage - 1 ||
      num === totalPage - 2
    ) {
      start = totalPage - 4;
      end = totalPage;
    } else if (num >= end - 1) {
      start = num - 2;
      end = num + 2;
    } else if (num <= end - 1) {
      start = num - 2;
      end = num + 2;
    } else {
      start = start;
      end = end;
    }
  }
  renderPagination(start, end, num, totalPage);
  renderCards(data, num);
});

// Функция по рендеру карточек

function renderCards(data, num = 1) {
  const selectNum = changeSelect();
  let numPagination = num * selectNum;
  let starPagination = (num - 1) * selectNum;
  if (numPagination - data.length < 0) {
    numPagination = numPagination;
  } else {
    numPagination = data.length;
  }
  if (data.length === 0) {
    cardsNode.innerHTML = '<h2> ничего не найдено =(</h2>';
  } else {
    cardsNode.innerHTML = '';
    for (let i = starPagination; i < numPagination; i++) {
      let indexData = data[i];
      const card = createCard(indexData);
      cardsNode.append(card);
    }
  }
}

renderCards(data);
