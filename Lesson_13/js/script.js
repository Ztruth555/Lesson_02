window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),                  //если через классы или теги то []
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i =a ; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');                        //функция скрывает
        }
    }

    hideTabContent(1);                                                  //у нас скрываются все tabContent'ы кроме 1

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');                        //функция показывает какой-то определенный 
        }
    }

    info.addEventListener('click', function(event) {                    //будем сравнивать с тем, куда мы кликаем
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });


    // timer

    let deadline = '2018-12-31';

    function getTimeRemaining(endtime) {                            // Фукнций которая определяет остаток времени и вычленяет оттуда полностью время, 
        let t = Date.parse(endtime) - Date.parse(new Date()),       // часы, минуты и секунды
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));
        // hours = Math.floor((t / 1000 / 60 / 60) % 24),
        // days = Math.floor((t / (1000 * 60 * 60 * 24)));

        return {
            'total': t,
            'hours': hours.toString(),
            'minutes': minutes.toString(),
            'seconds': seconds.toString()
        };
    }

    function setClock(id, endtime) {                                // У нас есть фукция setClock, которая создает переменные, она их берёт со страницы
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {                                    // У нас есть фукция updateClock, которая сначала получает разницу между временем
            let t = getTimeRemaining(endtime);                      // при помощи функии timeRemaining, эта функций сначала возвращает целый объект, то что
            hours.textContent = t.hours;                            // нужно в ташем таймере и мы эти данные записываем прямо в вёрстку 
            minutes.textContent = t.minutes;                        // каждую секунду мы будем получать обновленное кол-во часов
            seconds.textContent = t.seconds;

            // чтобы не уходил в минус
            if (t.total < 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            // чтобы сделал проверку на количество нолей подставил
            } else {
                hours.textContent = t.hours.length < 2 ? `0${t.hours}` : t.hours;
                minutes.textContent = t.minutes.length < 2 ? `0${t.minutes}` : t.minutes;
                seconds.textContent = t.seconds.length < 2 ? `0${t.seconds}` : t.seconds;
            }
                
        }

    }

    setClock('timer', deadline); 

    // Modal
    function modal() {
        let more = document.querySelector('.more'),                     //подробнее
            overlay = document.querySelector('.overlay'),               //само окно
            close = document.querySelector('.popup-close'),             //крестик
            descrBtn = document.getElementsByClassName('description-btn');

        more.addEventListener('click', function () {
            overlay.style.display = 'block';
            this.classList.add('more-splash');                          //небольшая анимация
            document.body.style.overflow = 'hidden';

        });

        close.addEventListener('click', function () {    //  
            overlay.style.display = 'none';
            more.classList.remove('more-splash');
            document.body.style.overflow = '';
        });
        for (let i = 0; i < descrBtn.length; i++) {
            descrBtn[i].addEventListener('click', function() {
                overlay.style.display = 'block';
                this.classList.add('more-splash');
                document.body.style.overflow = 'hidden';

            });
        }

        for (let i = 0; i < descrBtn.length; i++) {
            close.addEventListener('click', function () {
                overlay.style.display = 'none';
                descrBtn[i].classList.remove('more-splash');
                document.body.style.overflow = '';
            });
        }
    }

    let inputPhone = document.getElementsByName('phone');
    modal();


    for (let i = 0; i < inputPhone.length; i++) {
        inputPhone[i].addEventListener('input', () => {
          inputPhone[i].value = inputPhone[i].value.replace(/[^\+?\d]/g, '');
        });
      }

   // Forms
   
   let form = document.getElementsByClassName('main-form')[0],
        formBottom = document.getElementById('form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),
        message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с вами свяжемся!',
            failure: 'Что-то пошло не так...'
        };
    statusMessage.classList.add('status');

    function sendForm(elem) {
        elem.addEventListener('submit', function(e) {
            e.preventDefault();
            elem.appendChild(statusMessage);

            let formData = new FormData(elem);

            let obj = {};
            formData.forEach(function (value, key) {
                obj[key] = value;
            });
            let json = JSON.stringify(obj);


            function postData(data) {
                return new Promise(function(resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                   

                    
                    request.onreadystatechange = function() {
                        if (request.readyState < 4) {
                            resolve()
                        } else if (request.readyState === 4 && request.status == 200) {
                            resolve()
                        } else {
                            reject()
                        }
                    }
                    
                    request.send(json); 
                });    
            }   
        

            function clearInput() {    
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            } 
            
            postData(json)
                .then(()=> statusMessage.innerHTML = message.loading)
                .then(()=> statusMessage.innerHTML = message.success)
                .catch(()=> statusMessage.innerHTML = message.failure)
                .then(clearInput)
        });

       
    }
    sendForm(form);
    sendForm(formBottom);

    // slider

    let slideIndex = 1,                                             // параметр текущего слайда
      slides = document.querySelectorAll('.slider-item'),   
      prev = document.querySelector('.prev'),
      next = document.querySelector('.next'),
      dotsWrap = document.querySelector('.slider-dots'),
      dots = document.querySelectorAll('.dot');
  
    showSlides(slideIndex);
  
    function showSlides(n) {                                        // 
  
      if (n > slides.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slides.length;
      }
  
      slides.forEach((item) => item.style.display = 'none');        // каждый слайд будет скрыт
      /* for (let i = 0; i < slide.length; i++) {
        slides[i].style.display = 'none';
      } */
      dots.forEach((item) => item.classList.remove('dot-active'));  // 
  
      slides[slideIndex - 1].style.display = 'block';               // 
      dots[slideIndex - 1].classList.add('dot-active');
  
    }
  
    function plusSlides(n) {
      showSlides(slideIndex += n);
    }
  
    function currentSlide(n) {
      showSlides(slideIndex = n);
    }
  
    prev.addEventListener('click', function () {
      plusSlides(-1);
    });
  
    next.addEventListener('click', function () {
      plusSlides(1);
    });
  
    dotsWrap.addEventListener('click', function (event) {
      for (let i = 0; i < dots.length + 1; i++) {
        if (event.target.classList.contains('dot') &&
          event.target == dots[i - 1]) {
          currentSlide(i);
        }
      }
    });
    

    //calculator

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0,
        counterInput = document.querySelectorAll('.counter-block-input');

        totalValue.innerHTML = 0;

        persons.addEventListener('change', function() {
            personsSum = +this.value;

            for(let i = 0; i < place.length; i++) {
                total = (daysSum + personsSum)*4000*place.options[place.selectedIndex].value
            }
            
            if(personsSum.value == '' || personsSum == 0 || daysSum == '' || daysSum == 0) {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total; 
            }
        });

        restDays.addEventListener('change', function() {
            daysSum = +this.value;

            for(let i = 0; i < place.length; i++) {
                total = (daysSum + personsSum)*4000*place.options[place.selectedIndex].value
            }
            
            if(personsSum.value == '' || personsSum == 0 || daysSum == '' || daysSum == 0) {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total; 
            }
        });

        place.addEventListener('change', function() {
            if(restDays.value == '' || persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
        });

        for (let i = 0; i < counterInput.length; i++) {
        counterInput[i].addEventListener('input', () => {
            counterInput[i].value = counterInput[i].value.replace(/(\D)/g, '');
        });
        };


        
});