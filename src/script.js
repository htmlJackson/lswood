function _round(a,b) {
  b=b || 0;
  return Math.round(a*Math.pow(10,b))/Math.pow(10,b);
}

function getM2ByItems(items,iLength,iWide) {
  return _round((items*iLength*iWide/Math.pow(10,6)), 4);
}

function getM3ByItems(items,iHeight,iWide,iLength) {
  return _round((items*iHeight*iWide*iLength/Math.pow(10,9)), 4);
};

function calc() {
  this.type = 'calc__pieces';
}

calc.prototype.recalc = function() {

  let calc = document.querySelector('.calc');
  let data = {};

  let inputs = calc.querySelectorAll('input[type=number]');
  for(let input of inputs) {
    let name = input.getAttribute('name');
    data[name] = parseInt( input.value ) || 0;
  }

  let _m2 = calc.querySelector('input[name=calc__m2]');
  let _m3 = calc.querySelector('input[name=calc__m3]');
  let _pieces = calc.querySelector('input[name=calc__pieces]');

  let height = data['calc__length'];
  let width = data['calc__width'];
  let thickness = data['calc__weight'];

  if (this.type === 'calc__m3') {

    let m3 = data['calc__m3'];
    let items = Math.ceil(m3/(height*width*thickness/Math.pow(10,9)));
    let m2 = getM2ByItems(items,height,width);
    let m2_out = getM2ByItems(items,height,width);

    _pieces.value = items;
    _m2.value = m2;

  } else if (this.type === 'calc__m2') {

    let m2 = data['calc__m2'];
    let items = Math.ceil(m2/(width*height/Math.pow(10,6)));            
    let m3 = getM3ByItems(items,height,width,thickness);
    let m2_out = getM2ByItems(items,height,width);

    _pieces.value = items;
    _m3.value = m3;

  } else if (this.type === 'calc__pieces') {

    let items = data['calc__pieces'];
    let m2 = getM2ByItems(items,height,width);
    let m3 = getM3ByItems(items,height,width,thickness);
    let m2_out = getM2ByItems(items,height,width);

    _m2.value = m2;
    _m3.value = m3;

  }
  
}

calc.prototype.init = function() {

    $calc = this;

    let calc = document.querySelector('.calc');

    if (calc) {
      let numbers = calc.querySelectorAll('.calc__results input[type=number]');
      for (let number of numbers) {
        number.addEventListener('keyup', function () {
          $calc.type = this.getAttribute('name');
          $calc.recalc();
        });
      }

      let sizes = calc.querySelectorAll('.calc__range');
      for (let size of sizes) {
        size.addEventListener('input', function () {
          this.closest('.calc__box')
              .querySelector(".calc__input[type=number]")
              .value = this.value;
          $calc.recalc();
        });
      }
    }

}

window.calc = new calc();

document.addEventListener('readystatechange', function(evt) {
  if (evt.target.readyState === 'complete') {
    window.calc.init();
  }
}, false);

function popup(title, body) {
  $('.popup-wrapper').show();
  $('.popup-wrapper .top_modal').show();
  $('.popup-wrapper .top_modal .title').html(title);
  $('.popup-wrapper .top_modal .body').html(body);
}

$(document).ready(function() {

  $('#sort_image').lightGallery({
    width: '700px',
    height: '470px',
    mode: 'lg-fade',
    addClass: 'fixed-size',
    counter: false,
    download: false,
    startClass: '',
    enableSwipe: false,
    enableDrag: false,
    speed: 500
  });


    $(window).scroll(function() {
      $(window).scrollTop() > 66 ? $("body").addClass("scrolled") : $("body").removeClass("scrolled");
    });

  if ($('.calc').length > 0) {
    $('.calc .calc__range').on('input',function(e){
      $(this).closest('.calc__box').find(".calc__input[type=number]").val($(this).val());
    });    
  }

  $('.popup-wrapper .close').click(function(e){
      $('.popup-wrapper').hide();
  });

  $('.price-modification').change(function(){
    var $tr = $(this).closest('tr');
    var $activeOption = $(this).find('option:selected');
    var price = $activeOption.attr('data-price');
    $tr.find('.table-good__price').text(price);
  }); 

  $(document).on('input change', '.delivery input', function() {

      var el = $(this);
      var price = parseInt(el.attr('data-price'));
      var min = parseInt(el.attr('data-min'));
      var km = parseInt(el.val());

      var total = km * price;

      total = (total > min) ? total : min;

      el.closest('tr').find('.result').text(total + ' руб.');

  });

  $(document).on('change', '.js-support-good input', function() {

      var $count = $(this);
      var $el = $(this).closest('tr');

      var price = parseInt($el.find('.table-good__price').text());
      var count = parseInt($count.val());

      $el.attr('data-count', count);

      var total = price * count;

      $el.find('.total').text( total );

      if( total > 0 )
      {
          $el.find('button').addClass('active');
      } else {
          $el.find('button').removeClass('active');
      }

  });

  $('.js-mobile-menu-select').change(function(){
      window.location.href = $(this).val();
  });

  var callbackBtn = $('.callback__btn');
  var callbackModal = $('.callback__modal');
  var callbackClose = $('.callback__close');

  callbackBtn.on('click', function () {
    callbackModal.show();
  });

  callbackClose.on('click', function () {
    callbackModal.hide();
  });

  var acc = document.getElementsByClassName("accord__toggler");
  for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");

      var high = this.closest('.accord__panel');
      var panel = this.nextElementSibling;

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";

        if (high !== null) {
          high.style.maxHeight = (high.scrollHeight + panel.scrollHeight) + "px";
        }

      }

    });
  }

  var acas = document.querySelectorAll('.accord__toggler a');
  for (var ac of acas) {
    ac.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
    });
  }

  var navSvg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 15 15" style="enable-background:new 0 0 15 15;" xml:space="preserve">
     <g>
      <g>
        <path d="M14.7,5.3c0.1-0.1,0.1-0.2,0.1-0.4s0-0.3-0.1-0.4c-0.2-0.2-0.6-0.2-0.7,0l-6.5,6.5L0.9,4.6c-0.2-0.2-0.6-0.2-0.7,0
          C0,4.8,0,5.2,0.2,5.3l6.9,6.9c0.2,0.2,0.6,0.2,0.7,0L14.7,5.3z"/>
          <path d="M7.4,12.6c-0.2,0-0.4-0.1-0.5-0.2L0,5.5C-0.1,5.4-0.2,5.2-0.2,5c0-0.2,0.1-0.4,0.2-0.5c0.3-0.3,0.8-0.3,1.1,0l6.3,6.3
            l6.3-6.3c0.3-0.3,0.8-0.3,1.1,0C15,4.6,15,4.7,15,5c0,0.2-0.1,0.4-0.2,0.5L8,12.4C7.8,12.6,7.6,12.6,7.4,12.6z M0.6,4.7
            c-0.1,0-0.2,0-0.2,0.1c-0.1,0.1-0.1,0.3,0,0.4l6.9,6.9c0.1,0.1,0.3,0.1,0.4,0l6.9-6.9c0.1-0.1,0.1-0.1,0.1-0.2
            c0-0.1,0-0.1-0.1-0.2c-0.1-0.1-0.3-0.1-0.4,0l-6.7,6.7L0.8,4.8C0.7,4.7,0.6,4.7,0.6,4.7z"/>
        </g>
      </g>
    </svg>
  `;

  $('.owl-carousel.desk').owlCarousel({
    nav: true,
    loop: true,
    margin:15,
    navText: [navSvg, navSvg],
    responsive:{
      0: {
        items: 1,
      },
      992: {
        items: 4,
      }
    }
  });

  if ($(window).width() < 992) {
    $('.owl-carousel.mob').owlCarousel({
      items: 1,
      nav: true,
      loop: true,
      margin:15,
      navText: [navSvg, navSvg],
    });
  }

  $('.owl-three-items').owlCarousel({
    nav: true,
    loop: true,
    margin: 15,
    navText: [navSvg, navSvg],
    autoHeight: true,
    responsive:{
      0: {
        items: 1,
      },
      992: {
        items: 3,
      }
    }
  });

  $('.header__menu-toggler').on('click', function () {
    $(this).toggleClass('active');
    $('.header__mobile-menu').toggleClass('hidden');
  });

});
