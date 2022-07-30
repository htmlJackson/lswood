$().ready(function(){

    $('.oil__color input').on('click', function () {
        $('.oil__color').removeClass('selected');
        $(this).parent().addClass('selected');

        var name = $(this).attr('data-name');
        document.querySelector('.oil__selected-output .js-oil-name').innerText = name;

    });

    const oilRange = $('.oil__range input');
    const jar = $('.oil__jar');
    const jarImg = $('.oil__jar img');

    const jarSettings = {
        '0': ['jar-s', '/catalog/view/theme/lswood/img/oil/jar-4.png'],
        '30': ['jar-m', '/catalog/view/theme/lswood/img/oil/jar-3.png'],
        '60': ['jar-l', '/catalog/view/theme/lswood/img/oil/jar-2.png'],
        '90': ['jar-xl', '/catalog/view/theme/lswood/img/oil/jar-1.png']
    };

    const jarValues = {
        '0' : '0.15',
        '30': '1',
        '60': '2.5',
        '90': '10',
    }

    const jarChanger = function (val) {
        jar.removeClass('jar-xl jar-l jar-m jar-s');
        const jarClass = jarSettings[val.toString()][0];
        const jarPicSrc = jarSettings[val.toString()][1];
        jar.addClass(jarClass);
        jarImg.attr('src', jarPicSrc);

        document.querySelector('.oil__selected-output .js-oil-volume').innerText = jarValues[val];
    }

    oilRange.on('change', function () {
        jarChanger(oilRange.val());
    });

    const colorsUl = $('.oil__colors');

    colorsUl.on('click', function () {

        if (event.target.tagName != 'INPUT') return;

        const currentColor = $(event.target).parent().css('backgroundColor');
        $('.jar-bg').css('backgroundColor', currentColor);
    });

    const oilSelectedResult = $('.oil__selected-result');
    let currentCounter = parseInt(oilSelectedResult.text());

    $('.oil__selected-btn').on('click', function () {

        if ($(this).hasClass('plus')) {
            currentCounter++;
            oilSelectedResult.text(currentCounter);
        } else if (currentCounter > 1) {
            currentCounter--;
        }

        oilSelectedResult.text(currentCounter + ' шт.');
    });

    /* Select2 */
    var data = [
        {
            id: 0,
            text: `
            <div>
              <span style="display: inline-block; vertical-align:middle; width: 25px; height: 25px; background-color: red"></span>
              <span style="display: inline-block; vertical-align:middle;padding-left: 5px;">308 SCHOKOLADEN BRAUN LL</span>
            </div>`,
            title: '308 SCHOKOLADEN BRAUN LL'
        }, {
            id: 1,
            text: `
            <div>
              <span style="display: inline-block; vertical-align:middle; width: 25px; height: 25px; background-color: blue"></span>
              <span style="display: inline-block; vertical-align:middle;padding-left: 5px;">308 SCHOKOLADEN BRAUN LL</span>
            </div>`,
            title: '308 SCHOKOLADEN BRAUN LL'
        }, {
            id: 3,
            text: `
            <div>
              <span style="display: inline-block; vertical-align:middle; width: 25px; height: 25px; background-color: green"></span>
              <span style="display: inline-block; vertical-align:middle;padding-left: 5px;">308 SCHOKOLADEN BRAUN LL</span>
            </div>`,
            title: '308 SCHOKOLADEN BRAUN LL'
        }
    ];

    $(".select2-colors").select2({
        data: data,
        escapeMarkup: function(markup) {
            return markup;
        }
    });
    $(".select2-size").select2();

});