var Basket = (function() {

	function Basket() {	
		this.items = {};
		this.restoreState();
	}

	function validateObject(src, input) {

		if (typeof src !== "object" 
			|| typeof input !== "object") {
				return false;
		}

		for (let index in src) {

			if (typeof src[index] !== typeof input[index]
				|| (typeof src[index] === "object" 
					&& validate(src[index], input[index]) === false)) {
				return false;
			}

		}

		return true;

	}	

	Basket.prototype.set = function(product, icount) {

		if (!validateObject({product_id: 0}, product)) {
			//console.log("id not validated");
			return this;
		}

		let product_id = product.product_id;
		let count = 1;

		if (typeof icount === "number") {
			count = icount;
		}

		if (typeof this.items[product_id] === "object") {
			this.items[product_id].count += count;
		} else {
			product.count = count;
			this.items[product_id] = product;
		}

		this.refresh();

		return this;

	}

	Basket.prototype.remove = function(product_id, icount) {

		if (typeof this.items[product_id] === 'undefined') {
			return this;
		}

		if (typeof icount !== "number" || this.items[product_id].count <= icount) {
			delete this.items[product_id];
		} else {
			this.items[product_id].count -= icount;
		}

		this.refresh();

		return this;

	}

	Basket.prototype.removeAll = function() {

		for(var i in this.items) {
			delete this.items[i];
		};

		this.refresh();

		return this;
	}

	Basket.prototype.count = function() {
		//return Object.keys(this.items).length || 0;
		var count = 0;
		for (var i in this.items) {
			count += this.items[i].count;
		}
		return count;
	}

	Basket.prototype.show = function() {
		console.log(this.items);
	}

	Basket.prototype.saveState = function() {

		if (typeof window.localStorage !== "object") {
			return this;
		}

		window.localStorage.setItem("basket", JSON.stringify(this.items));

	}

	Basket.prototype.restoreState = function() {

		if (typeof window.localStorage !== "object") {
			return this;
		}

		let item = window.localStorage.getItem("basket");

		if (typeof item === "string") {
			this.items = JSON.parse(item);
		}

	}

	Basket.prototype.refresh = function() {
		this.saveState();
	}

	return Basket;

})();

window.lswood_basket = new Basket();