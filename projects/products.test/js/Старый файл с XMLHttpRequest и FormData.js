'use strict';

window.addEventListener('DOMContentLoaded', () => {
    // Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs Tabs 
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
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

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer Timer Timer Timer Timer Timer Timer Timer Timer Timer Timer Timer Timer Timer Timer Timer Timer Timer Timer Timer Timer Timer Timer Timer Timer Timer Timer Timer Timer 

    const deadline = '2023-05-02';

    // Получаем оставшееся время
    function getTimeRemaining(endtime) { 
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()); // Считаем разницу между окончанием работы таймера(deadline) и временем на данный момент
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

    // Добавляем "0" если число меньше 10
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // Получаем элементы со страницы и устанавливаем таймер
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

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }


    }

    setClock('.timer', deadline);

    // Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal 

    const btnsModal = document.querySelectorAll('[data-modal]'),
          modalWindow = document.querySelector('.modal');
    
    
    function openModal() {
        modalWindow.classList.add('show', 'fade');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    btnsModal.forEach(item => {
        item.addEventListener('click', openModal);
    });

    function closeModal() {
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show', 'fade');
        document.body.style.overflow = '';
    }

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) { // (Уже прокрученное растояние + оставшаяся высота клиентской области >= всей высоты скролла )
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);



    // Class Class Class Class Class Class Class Class Class Class Class Class Class Class Class Class Class Class Class Class Class Class Class Class Class Class Class Class Class 


    const menuContainer = document.querySelector('.menu__field .container');
    
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = parentSelector;
            this.classes = classes;
            this.transfer = 79;
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = this.price * this.transfer;
        }

        createNewCard() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> рублей/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard('img/tabs/vegy.jpg',
                 'vegy', 
                 'Меню "Фитнес"', 
                 `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. 
                  Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`, 
                  4,
                 menuContainer,
                 'menu__item',
                 'big').createNewCard();
    new MenuCard('img/tabs/elite.jpg',
                 'elite', 
                 'Меню “Премиум”', 
                 `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. 
                  Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`, 
                 11,
                 menuContainer,
                 'menu__item',
                 'big').createNewCard();
    new MenuCard('img/tabs/post.jpg',
                 'post', 
                 'Меню "Постное"', 
                 `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, 
                  молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`, 
                 6,
                 menuContainer,
                 'menu__item',
                 'big').createNewCard();
    
    
    // Forms Forms Forms Forms Forms Forms Forms Forms Forms Forms Forms Forms Forms Forms Forms Forms Forms Forms Forms Forms Forms Forms Forms Forms Forms Forms Forms Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            // request.setRequestHeader('Content-type', 'multipart/form-data'); // При работе с FormData заголовок не указывается
            request.setRequestHeader('Content-type', 'application/json'); // Для работы с JSON устанавливаем заголовки
            const formData = new FormData(form);

            // (Начало)Часть для JSON отправки данных, при работе с FormData не нужно делать 
            const object = {};

            formData.forEach((value, key) => {
                object[key] = value;
            });

            const json = JSON.stringify(object);
            
            request.send(json);

            // (Конец)Часть для JSON отправки данных, при работе с FormData не нужно делать

            // request.send(formData);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                }
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog")

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        body: JSON.stringify({name: 'Alex'}),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => console.log(json));

});