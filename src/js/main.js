const leftToRightTexts = document.querySelectorAll('.ltr');
const advantagesNumbers = document.querySelectorAll('.advantages__number');
const slidesList = document.querySelectorAll('.team__item');
const $slider = $(".team__list");

const showTeam = () => {
  document.addEventListener('wheel', (evt) => {
    const delta = evt.deltaY;
    if(delta > 0) {
      $('.about').addClass('about--hide');
      $('.team').addClass('team--show');
      $('body').removeClass('white');
      $('.team__photo').removeClass('team__photo--big');
    }
  })
};

const mouseWheel = ($slider) => {
  $('.team').on('wheel', { $slider: $slider }, mouseWheelHandler)
};

const mouseWheelHandler = (event) => {
  const $slider = event.data.$slider;
  const delta = event.originalEvent.deltaY;
  const currentSlide = $slider.slick('slickCurrentSlide');
  if (delta > 0) {
    if (currentSlide < slidesList.length - 1) {
      $slider.slick('slickNext');
    } else {
      document.addEventListener('wheel', (evt) => {
        const delta = evt.deltaY;
        if (delta > 0) {
          $('.about').removeClass('about--hide');
          $('.team').removeClass('team--show');
          $('body').addClass('white');
          $('.team__photo').addClass('team__photo--big');
          showTeam();
          setTimeout(() => {
            $slider.slick('slickGoTo', 0);
          }, 400);
        }
      });
    }
  } else {
    if (currentSlide === 0) {
      $('.about').removeClass('about--hide');
      $('.team').removeClass('team--show');
      $('body').addClass('white');
      $('.team__photo').addClass('team__photo--big');
    } else {
      $slider.slick('slickPrev');
    }
  }
};

showTeam();

$('.about__scroll--bottom').click(() => {
  const currentSlide = $slider.slick('slickCurrentSlide');
  if(currentSlide < slidesList.length - 1) {
    $slider.slick('slickNext');
  } else {
    $('.about').removeClass('about--hide');
    $('.team').removeClass('team--show');
    $('body').addClass('white');
    $('.team__photo').addClass('team__photo--big');
    setTimeout(() => {
      $('.team__members').slick('slickGoTo', 0);
    }, 400);
  }
});

$('.about__scroll--top').click((evt) => {
  evt.preventDefault();
  $('.about').addClass('about--hide');
  $('.team').addClass('team--show');
  $('body').removeClass('white');
  $('.team__photo').removeClass('team__photo--big')
});

$.fn.animationTextLeftToRight = function(time) {
  const string = this.text();
  return this.each(() => {
    const $this = $(this);
    $this.html(string.replace(/./g, '<span class="letter">$&</span>'));
    $this.find('span.letter').each((i, el) => {
      setTimeout(() => { 
        $(el).addClass('letter--show'); 
        }, time * i);
    });
  });
};

$('.about__play').click((evt) => {
  evt.preventDefault();
  $('.modal').fadeIn(1000);
});

$('.modal__btn').click(() => {
  $('.modal').fadeOut(1000);
});

$(window).on('load', () => {
  $('.about__bg').fadeIn(1000);
  setTimeout(() => {
    leftToRightTexts.forEach((item)=> {
      $(item).show();
      $(item).animationTextLeftToRight(100);
    })
  }, 400);
  setTimeout(() => {
    $('.about__content').addClass('about__content--show');
  }, 300);
  setTimeout(() => {
    advantagesNumbers.forEach((item)=> {
      $(item).addClass('advantages__number--active');
    })
  }, 700);
  
});


$('.team__members').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  asNavFor: '.team__list',
  dots: false,
  arrows: false,
  centerMode: false,
  focusOnSelect: true,
  infinite: false,
  variableWidth: true,
});

$slider
  .on('init', () => {
    mouseWheel($slider)
  })
  .slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.team__members',
    infinite: false
  });
