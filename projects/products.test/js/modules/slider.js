function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          btnSlidePrev = document.querySelector(prevArrow),
          btnSlideNext = document.querySelector(nextArrow),
          currentSlide = document.querySelector(currentCounter),
          totalSlides = document.querySelector(totalCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;
    let indexSlide = 1,
        offset = 0;

    if (slides.length < 10) {
        totalSlides.textContent = `0${slides.length}`;
        currentSlide.textContent = `0${indexSlide}`;
    } else {
        totalSlides.textContent = slides.length;
        currentSlide.textContent = indexSlide;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function updateCounter() {
        currentSlide.textContent = indexSlide < 10 ? `0${indexSlide}` : indexSlide;

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[indexSlide-1].style.opacity = 1;
    }

    btnSlideNext.addEventListener('click', () => {
        if (offset == parseInt(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += parseInt(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (indexSlide == slides.length) {
            indexSlide = 1;
        } else {
            indexSlide++;
        }

        updateCounter();
    });

    btnSlidePrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = parseInt(width) * (slides.length - 1);
        } else {
            offset -= parseInt(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (indexSlide == 1) {
            indexSlide = slides.length;
        } else {
            indexSlide--;
        }

        updateCounter();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            indexSlide = slideTo;
            offset = parseInt(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            updateCounter();
        })
    });
}

export default slider;