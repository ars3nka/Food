'use strict';

function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
  const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        sliderPrevBtn = document.querySelector(prevArrow),
        sliderNextBtn = document.querySelector(nextArrow);

  const sliderTotalCounter = document.querySelector(totalCounter);
  const sliderCurrentCounter = document.querySelector(currentCounter);

  const slidesWrapper = document.querySelector(wrapper);
  const slidesField = document.querySelector(field);
  const width = window.getComputedStyle(slidesWrapper).width;

  let slideTotal = slides.length;
  let slideIndex = 1;
  let offset = 0;

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol');
  const dots = [];
  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  sliderNextBtn.addEventListener('click', () => {
    if (offset == clearNumber(width) * (slides.length - 1)) {
      offset = 0;
      slideIndex = 1;
    } else {
      offset += clearNumber(width);
      slideIndex ++;
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    updateCurrentSlide();
    dotsOpacity();
  });

  sliderPrevBtn.addEventListener('click', () => {
    if (offset == 0) {
      offset = clearNumber(width) * (slides.length - 1);
      slideIndex = slides.length;
    } else {
      offset -= clearNumber(width);
      slideIndex --;
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    updateCurrentSlide();
    dotsOpacity();
  });

  updateCurrentSlide();
  sliderTotalCounter.textContent = amountSort(slideTotal);

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = +width.replace(/\D/g, '') * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      dotsOpacity();
      updateCurrentSlide();
    });
  });

  function amountSort(amoult) {
    if (amoult < 10) {
      return `0${amoult}`;
    } else {
      return amoult;
    }
  }

  function updateCurrentSlide() {
    sliderCurrentCounter.textContent = amountSort(slideIndex);
  }

  function dotsOpacity() {
    dots.forEach((dot) => dot.style.opacity = 0.5);
    dots[slideIndex - 1].style.opacity = 1;
  }

  function clearNumber(num) {
    return +num.replace(/\D/g, '');
  }
}

export default slider;