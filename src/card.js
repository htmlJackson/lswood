
    $(document).ready(function () {
      var navSvg = `
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
      </svg>`;
      $('#imageGallery').lightSlider({
        gallery:true,
        item:1,
        loop:true,
        thumbItem:3,
        slideMargin:0,
        enableDrag: false,
        currentPagerPosition:'left',
        prevHtml: navSvg,
        nextHtml: navSvg,
        onSliderLoad: function(el) {
            el.lightGallery({
                selector: '#imageGallery .lslide'
            });
        }
      });

      $('.calc__toggle-btn').on('click', function () {
        $('.calc').toggleClass('opened');
      });
    });
