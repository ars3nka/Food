'use strict';

window.addEventListener('DOMContentLoaded', () => {

  //Tabs

  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');


  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => item.classList.remove('tabheader__item_active'));
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    console.log(target);
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target === item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //Timer

  const deadline = '2022-10-31';

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((t / (1000 * 60)) % 60);
      seconds = Math.floor((t / 1000) % 60);
    }
          
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline);

  //Modal

  const modalOpenBtns = document.querySelectorAll('[data-modal]');
  const modalCloseBtn = document.querySelector('[date-close]');
  const modal = document.querySelector('.modal');

  function openModal() {
    // modal.style.display = 'block';

    modal.classList.add('show');
    modal.classList.remove('hide');

    // modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  function closeModal() {
    // modal.style.display = 'none';

    modal.classList.add('hide');
    modal.classList.remove('show');

    // modal.classList.toggle('show');

    document.body.style.overflow = '';
  }

  modalOpenBtns.forEach((btn) => {
    btn.addEventListener('click', openModal);
  });

  modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
  }});

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 5000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

  //menu

  const menu = document.querySelector('.menu'),
        menuContainer = menu.querySelector('.container');

  menuContainer.innerHTML = '';

  function createElement(tag, options = {}) {
    const element = document.createElement(tag);
    options.className && (element.className = options.className);
    options.textContent && (element.textContent = options.textContent);
    options.innerText && (element.innerText = options.innerText);
    options.placeholder && (element.placeholder = options.placeholder);
    return element;
  }
  
  class Product {
    constructor(img, name, description, price) {
      this.img = img;
      this.name = `Меню "${name}"`;
      this.description = description;
      this.price = price;
    }
  }

  const products = [];

  const product1 = new Product('img/tabs/vegy.jpg', 'Фитнес', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 229);

  const product2 = new Product('img/tabs/elite.jpg', 'Премиум', 'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 550);

  const product3 = new Product('img/tabs/post.jpg','Постное', 'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 430);

  products.push(product1, product2, product3);

  console.log(products);

  products.forEach((product) => {

    const menuItem = createElement('div', {className: 'menu__item'});
    const menuItemImg = createElement('img');
    const menuItemSubtitle = createElement('div', {className: 'menu__item-subtitle'});
    const menuItemDescr = createElement('div', {className: 'menu__item-descr'});
    const menuItemDivider = createElement('div', {className: 'menu__item-divider'});
    const menuItemPrice = createElement('div', {className: 'menu__item-price'});
    const menuItemPriceCost = createElement('div', {className: 'menu__item-cost', innerText: 'Цена:'});
    const menuItemPriceTotal = createElement('div', {className: 'menu__item-total', innerText: ' грн/день'});
    const menuItemPriceTotalSpan = createElement('span');

    menuItemImg.src = product.img;
    menuItemSubtitle.innerText = product.name;
    menuItemDescr.innerText = product.description;
    menuItemPriceTotalSpan.innerText = product.price;

    menuItem.append(menuItemImg, menuItemSubtitle, menuItemDescr, menuItemDivider, menuItemPrice);
    menuItemPrice.append(menuItemPriceCost, menuItemPriceTotal);
    menuItemPriceTotal.prepend(menuItemPriceTotalSpan);

    menuContainer.append(menuItem);
  });
});

