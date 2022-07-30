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

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function reloadTable() {

  $('.js-cart-table tr:not(.cart__header)').remove();
  if ($('.js-cart-table').length > 0) {

    var itogo = 0;

    for (var i in lswood_basket.items) {
      let item = lswood_basket.items[i];
      let template = cart_template;

      if (item.type == 0) {
        var m2 = getM2ByItems(item.count,item.height,item.width);
        var m2_out = getM2ByItems(item.count,item.height,item.width);
        var cur_price = _round(m2_out*item.price,4);
      } else {
        var m2 = '-';
        var m2_out = 0;
        var cur_price = item.price * item.count;
      }

      itogo += cur_price;      

      template = template.replaceAll("{{product_id}}", item.product_id);
      template = template.replaceAll("{{thumb}}", item.thumb);
      template = template.replaceAll("{{name}}", item.name);
      template = template.replaceAll("{{price}}", item.price);      
      template = template.replaceAll("{{m2_count}}", m2);  
      template = template.replaceAll("{{itog_price}}", cur_price);      
      template = template.replaceAll("{{count}}", item.count);

      $('.js-cart-table tbody').append(template);

    }

    let last_row = cart_template_last;
    last_row = last_row.replaceAll("{{price}}", itogo); 
    $('.js-cart-table tbody').append(last_row);

  }

}

$(document).ready(function () {

    var basket_count = parseInt(lswood_basket.count()) > 99 ? 99 : lswood_basket.count();
    $('.js-basket-count').text(basket_count);

  reloadTable();

  $('body').on('click', '.js-product-minus', function(){
      var row = $(this).closest('tr');
      var product_id = parseInt( row.attr('data-product-id') );
      lswood_basket.remove(product_id, 1);
      reloadTable();
  });

  $('body').on('click', '.js-product-plus', function(){
      var row = $(this).closest('tr');
      var product_id = parseInt( row.attr('data-product-id') );
      lswood_basket.set({product_id: product_id}, 1);
      console.log('plus');
      reloadTable();
  });

  $('body').on('click', '.js-remove-product', function(){
      var row = $(this).closest('tr');
      var product_id = row.attr('data-product-id');
      lswood_basket.remove(product_id);
      row.remove();
      console.log('remove');
      reloadTable();
  });

  $('.js-remove-all').click(function(){
      lswood_basket.removeAll();
      var basket_count = parseInt(lswood_basket.count()) > 99 ? 99 : lswood_basket.count();
      $('.js-basket-count').text(basket_count);
      $('.js-cart-table tr:not(.cart__header)').remove();
  });

  $('.js-order-submit').click(function(event){

      event.preventDefault();

      var _form = $(this).closest('form');

      var email = _form.find("input[name='order[email]']");
      var phone = _form.find("input[name='order[phone]']");

      var miss = true;

      email.removeClass("checkout__input_error");
      phone.removeClass("checkout__input_error");

      if (email.val().length < 1) {
          email.addClass("checkout__input_error");
          miss = false;
      }

      if (phone.val().length < 1) {
          phone.addClass("checkout__input_error");
          miss = false;
      }

      if (!miss) {
          return false;
      }

      var self = $(this);
      self.hide();

      $.ajax({
          url: "/ajax/?func=setorder",
          type: "post",
          dataType: "json",
          data: $('.cart__box').find('select, textarea, input').serialize(),
          error: function(z,x,c) {},
          complete: function(strData) {},
          success: function(ans) {
            console.log(ans);
            if (ans.type !== undefined && ans.type === 'error') {
                popup('Ошибка оформления заказа.', ans.msg);
            } else {
                popup('Спасибо! Заказ оформлен.', 'В ближайшее время с вами свяжется наш менеджер.');
            }
            self.show();
          }
      });

      return false;

  });

  $('.js-order-btn').click(function(event){

    event.preventDefault();

    var tr = $(this).closest('tr');

    var product_id = parseInt( tr.attr('data-product-id') );
    var m2 = tr.find('.js-tcalc[data-type=2]').val();
    var count = parseInt( tr.find('.js-tcalc[data-type=3]').val() );

    if (isNaN(count)) {
      count = parseInt( tr.attr('data-count') );
    }

    if (isNaN(count)) {
      count = 1;
    }    

    var price = tr.attr('data-price');

    var thickness = tr.attr('data-thickness');
    var width = tr.attr('data-width');
    var height = tr.attr('data-height');

    var name = tr.attr('data-product-name');
    var thumb = tr.attr('data-product-thumb');

    var type = tr.attr('data-product-type');
    var tara_name = tr.attr('data-tara-name');

    lswood_basket.set({
      product_id: product_id,
      name: name,
      thumb: thumb,
      count: count,
      price: price,
      thickness: thickness,
      width: width,
      height: height,
      type: type,
      tara_name: tara_name
    }, count);

    lswood_basket.show();

      var basket_count = parseInt(lswood_basket.count()) > 99 ? 99 : lswood_basket.count();
    $('.js-basket-count').text(basket_count);

    popup();

    return false;

  });

  $(".js-tcalc").bind("keypress paste", function (e) {

    var keyCode = e.which ? e.which : e.keyCode
               
    if (!(keyCode >= 48 && keyCode <= 57)) {
      return false;
    }

  });

  $(".js-tcalc").bind("keyup", function (e) {

    var type = $(this).attr('data-type');
    var row = $(this).closest('tr');

    var thickness = row.attr('data-thickness');
    var width = row.attr('data-width');
    var height = row.attr('data-height');
    var price = row.attr('data-price');

    var value = parseInt($(this).val());
    if (isNaN(value)) { 
      value = 0; 
    }

    if (type == 1) {

      var m3 = value;
      var items = Math.ceil(m3/(height*width*thickness/Math.pow(10,9)));
      var m2 = getM2ByItems(items,height,width);
      var m2_out = getM2ByItems(items,height,width);
      var itogo = _round(m2_out*price,4);

      row.find("input[data-type='3']").val(items);
      row.find("input[data-type='2']").val(m2);
      row.find('.js-itogo').text(itogo);

    } else if (type == 2) {

      var m2 = value;

      console.log(m2 + ' ' + width + ' ' + height);

      var items = Math.ceil(m2/(width*height/Math.pow(10,6)));            
      var m3 = getM3ByItems(items,height,width,thickness);
      var m2_out = getM2ByItems(items,height,width);
      var itogo = _round(m2_out*price,4);

      row.find("input[data-type='3']").val(items);
      row.find("input[data-type='1']").val(m3);
      row.find('.js-itogo').text(itogo);


    } else if (type == 3) {

      var items = value;
      var m2 = getM2ByItems(items,height,width);
      var m3 = getM3ByItems(items,height,width,thickness);
      var m2_out = getM2ByItems(items,height,width);
      var itogo = _round(m2_out*price,4);

      row.find("input[data-type='2']").val(m2);
      row.find("input[data-type='1']").val(m3);
      row.find('.js-itogo').text(itogo);

    }

    var count = parseInt( row.find("input[data-type='3']").val() );
    if (count > 0) {
      row.find('.buy_btn').removeClass('disabled');
    } else {
      row.find('.buy_btn').addClass('disabled');
    }

  });

});