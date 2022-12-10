'use strict';

import { getResourse } from "../services/services";

function cards() {
  class Product {
    constructor(src, alt, title, description, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.tranfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.tranfer;
    }

    render() {
      const element = document.createElement('div');
      
      if (this.classes.length === 0) {
        element.classList.add('menu__item');
      } else {
        this.classes.forEach((className) => {
          element.classList.add(className);
        });
      }
      
      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}">
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.description}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>`;
      this.parent.append(element);
    }
  }

  getResourse('http://localhost:3000/menu')
  .then(data => {
    data.forEach(({img, altimg, title, descr, price}) => {
      new Product(img, altimg, title, descr, price, '.menu .container').render();
    });
  });
}

export default cards;