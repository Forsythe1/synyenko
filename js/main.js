// //Menu fixed
let header = $('#main-nav');
let intro = $('#about_us');
let introH;
let scrollPos = $(window).scrollTop();

$(window).on('scroll load resize', function () {
  let introH = intro.innerHeight();
  scrollPos = $(this).scrollTop() - 80;
  if (scrollPos > introH) {
    header.addClass('fixed');
  } else {
    header.removeClass('fixed');
  }
});

//scroll
$('[data-scroll]').on('click', function (event) {
  event.preventDefault();
  var blockId = $(this).data('scroll'),
    blockOffset = $(blockId).offset().top - 150;

  $('html, body').animate(
    {
      scrollTop: blockOffset,
    },
    700
  );
});

//Burger
const iconMenu = document.querySelector('.menu__icon');
const mainNav = document.querySelector('.main-nav__menu-mobl');
if (iconMenu) {
  iconMenu.addEventListener('click', () => {
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('menu__icon--active');
    mainNav.classList.toggle('main-nav__menu-mobl--active');
  });
}

//scroll
const menuLinks = document.querySelectorAll('#main-nav__link[data-goto]');
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener('click', onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top +
        scrollY -
        document.querySelector('.main-nav').offsetHeight;

      if (iconMenu.classList.contains('menu__icon--active')) {
        document.body.classList.remove('_lock');
        iconMenu.classList.remove('menu__icon--active');
        mainNav.classList.remove('main-nav__menu-mobl--active');
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: 'smooth',
      });
      e.preventDefault(); // отключает ссылку
    }
  }
}

//Slider
const swiper = new Swiper('.mySwiper5', {
  slidesPerView: 3,
  spaceBetween: 20,
  slidesPerGroup: 3,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    991: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
    },
    360: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 20,
    },
  },
});

var swiper1 = new Swiper('.mySwiper', {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});

var swiper2 = new Swiper('.mySwiper2', {
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: swiper1,
  },
});

var swiper3 = new Swiper('.mySwiper4', {
  pagination: {
    el: '.swiper-paginations',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: swiper,
  },
});

//Accordion
document.querySelectorAll('.accordion-item__trigger').forEach((item) =>
  item.addEventListener('click', () => {
    const parent = item.parentNode;

    if (parent.classList.contains('accordion-item--active')) {
      parent.classList.remove('accordion-item--active');
    } else {
      document
        .querySelectorAll('.accordion-item')
        .forEach((child) => child.classList.remove('accordion-item--active'));

      parent.classList.add('accordion-item--active');
    }
    // parent.classList.toggle('accordion-item--active'); //что бы все открывались, удалить условие if
  })
);

$(document).ready(function () {
  $('.accordion-item__trigger').click(function (event) {
    if ($('.accordion').hasClass('one')) {
      $('.accordion-item__trigger').not($(this)).removeClass('active');
      $('.accordion-item__content').not($(this).next()).slideUp(300);
    }
    $(this).toggleClass('active').next().slideToggle(300);
  });
});

//services arrow Accordion
document.querySelectorAll('.services-item__trigger').forEach((item) =>
  item.addEventListener('click', () => {
    const parent = item.parentNode;

    if (parent.classList.contains('services-item--active')) {
      parent.classList.remove('services-item--active');
    } else {
      document
        .querySelectorAll('.services-item')
        .forEach((child) => child.classList.remove('services-item--active'));

      parent.classList.add('services-item--active');
    }
  })
);

//Modal
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;
//проверка
if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}
//закрывает попап
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  }
}
//функция для открытия попапа
function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = '0px';
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}
//закрывает попап клавишей Esc
document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});

//Полифилы под старые браузера
(function () {
  if (!Element.prototype.slosest) {
    Element.prototype.closest = function (css) {
      var node = this;
      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();

(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();

//Form
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);
    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add('_sending');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        // fromPreview.innerHTML = '';
        form.reset();
        form.classList.remove('_sending');
      } else {
        alert('Ошибка');
        form.classList.remove('_sending');
      }
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (
        input.getAttribute('type') === 'checkbox' &&
        input.checked === false
      ) {
        formAddError(input);
        error++;
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }

      if (input.classList.contains('_tel')) {
        if (telTest(input)) {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }
  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
  function telTest(input) {
    return !/^\d+$/.test(input.value);
  }
});
