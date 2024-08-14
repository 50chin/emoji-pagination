import { data } from "./emoji.js";
const cardsNode = document.querySelector(".cards__wrapper");
const inputNode = document.querySelector(".header__input");

function searchEmoji(evt) {
  const search = evt.target.value.toLowerCase().trim();
  const newData = data.filter(
    (el) =>
      el.title.toLowerCase().includes(search) || el.keywords.includes(search)
  );
  renderCards(newData);
}

inputNode.addEventListener("input", searchEmoji);

// Функция по фильтрацию слов
function filterWords(str) {
  const filteredWords = [...new Set(str.split(" "))];
  return filteredWords.join(" ");
}

function createCard({ title, symbol, keywords }) {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <p class='card__symbol'>${symbol}</p>
    <h3 class="card__title">${title}</h3> 
    <p class='card__desc'>${filterWords(keywords)}</p>
    `;
  return card;
}

// const renderCards = (arr) => {
//   cardsNode.innerHTML = "";
//   arr.forEach((el) => {
//     const card = createCard(el);
//     cardsNode.append(card);
//   });
// };

// renderCards(data);

const selectNode = document.querySelector(".footer__select");
// Слушатель событий на select
selectNode.addEventListener("change", () => {
  changeSelect(), renderCards(data);
});

let defaultNum = 6;
// Функция по выбору select
function changeSelect() {
  defaultNum = selectNode.value;
  return defaultNum;
}

const footerListNode = document.querySelector(".footer__list");

let end = 5;
let start = 1;

renderPagination(start, end);

// Шаблон для Пагинации
function renderPagination(start, end, num = 1) {
  footerListNode.innerHTML = "";
  footerListNode.innerHTML = `
 <li ><button class="footer__list-item" style=${
   start === 1 ? "color:#ABB5BE;" : ""
 } type=${start === 1 ? "disabled" : ""}>First</button></li>`;
  for (let i = start; i <= end; i++) {
    footerListNode.innerHTML += `<li><button class="footer__list-item"
     style='${num === i ? "background:#055160; color:#FFF;" : ""}'
    ${num === i ? "disabled" : ""}
    >${i}</button></li>`;
  }
  footerListNode.innerHTML += `<li ><button class="footer__list-item" style=${
    end === 100 ? "color:#ABB5BE;" : ""
  }  type=${end === 100 ? "disabled" : ""}>Last</button></li>`;
}



footerListNode.addEventListener("click", (evt) => {
  let result = evt.target.innerText;
  let num;
  if (result === "First") {
    start = 1;
    end = start + 4;
  } else if (result === "Last") {
    end = 100;
    start = end - 4;
  } else {
    num = +result;
    if (num === 1) {
      start = 1;
      end = 5;
    } else if (num >= end - 2) {
      start += 2;
      end += 2;
    } else if (num <= end - 2) {
      start -= 2;
      end -= 2;
    } else {
      start = start;
      end = end;
    }
  }
  renderPagination(start, end, num);
});

// Функция по рендеру карточек

function renderCards(data) {
  let numPagination = 1;
  const selectNum = changeSelect();
  numPagination *= selectNum;
  cardsNode.innerHTML = "";
  for (let i = 0; i < numPagination; i++) {
    let indexData = data[i];
    const card = createCard(indexData);
    cardsNode.append(card);
  }
}

renderCards(data);
