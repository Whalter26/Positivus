const slider = document.querySelector('.reviews__slider-list');
const slides = document.querySelectorAll('.reviews__slider-item');
const paginationButtons = document.querySelectorAll('.pagination__button');
const prevButton = document.querySelector('.reviews__actions .reviews__arrow-button:first-child');
const nextButton = document.querySelector('.reviews__actions .reviews__arrow-button:last-child');

let currentIndex = 0;
let isScrolling = false;

function updatePagination(index) {
  paginationButtons.forEach(button => button.classList.remove('is-current'));

  if (paginationButtons[index]) {
    paginationButtons[index].classList.add('is-current');
  }
}

function updateArrows(index) {
  if (prevButton) prevButton.disabled = index === 0;
  if (nextButton) nextButton.disabled = index === slides.length - 1;
}

function goToSlide(index) {
  if (!slides[index]) return;

  isScrolling = true;

  slides[index].scrollIntoView({
    behavior: 'smooth',
    inline: 'center',
    block: 'nearest',
  });

  currentIndex = index;
  updatePagination(index);
  updateArrows(index);


  setTimeout(() => {
    isScrolling = false;
  }, 500);
}


updateArrows(currentIndex);
updatePagination(currentIndex);

paginationButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    goToSlide(index);
  });
});

if (nextButton) {
  nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      goToSlide(currentIndex + 1);
    }
  });
}


if (prevButton) {
  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  });
}


if (slider) {
  slider.addEventListener('scroll', () => {
    if (isScrolling) return;

    const sliderCenter = slider.scrollLeft + slider.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      const distance = Math.abs(sliderCenter - slideCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== currentIndex) {
      currentIndex = closestIndex;
      updatePagination(currentIndex);
      updateArrows(currentIndex);
    }
  });
}
