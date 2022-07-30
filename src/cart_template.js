var cart_template = `

<tr class="cart__item item" data-product-id="{{product_id}}">
  <td>
    <div class="item__name">
      <img class="item__img" src="{{thumb}}" alt="" width="85" height="85">
      <a href="#">{{name}}</a>
    </div>
  </td>

  <td class="desktop-only">
    <span class="item__cubicmeters">{{m2_count}}</span>
  </td>

  <td>

    <div class="item__counter">
      <span class="item__descr mobile-only">Количество</span>
      <button class="item__counter-minus btn js-product-minus" type="button" name="button">-</button>
      <span class="item__counter-number">{{count}}</span>
      <button class="item__counter-plus btn js-product-plus" type="button" name="button">+</button>
    </div>
  </td>

  <td>
    <span class="mobile-only inline fwn">Цена (м<sup>2</sup>):</span>
    <span class="item__price">{{price}}<span class="item__currency">₽</span></span>
  </td>

  <td>
    <div class="item__result">
      <span class="mobile-only inline fwb">Итого:</span>
      <span class="item__result-price">{{itog_price}}<span class="item__currency">₽</span></span>
      <button class="item__remove-btn cart__cross-btn js-remove-product">Убрать товар</button>

      <input type="hidden" name="order[order][{{product_id}}][id]" value="{{product_id}}">
      <input type="hidden" name="order[order][{{product_id}}][count]" value="{{count}}">
      <input type="hidden" name="order[order][{{product_id}}][price]" value="{{price}}">
      <input type="hidden" name="order[order][{{product_id}}][m2count]" value="{{m2_count}}">
      <input type="hidden" name="order[order][{{product_id}}][itogo]" value="{{itog_price}}">

    </div>
  </td>

</tr>

`;

var cart_template_last = `

<tr class="cart__item item" data-product-id="{{product_id}}">

  <td></td>
  <td class="desktop-only"></td>
  <td></td>
  <td>
  	<span class="item__price">Итого: </span>
  </td>

  <td>
	<div class="item__result">
      <span class="item__result-price">{{price}}<span class="item__currency">₽</span></span>
    </div>
  </td>

</tr>

`