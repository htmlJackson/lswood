document.addEventListener('readystatechange', function(evt) {
    if (evt.target.readyState === 'complete') {

        var cbtns = document.querySelectorAll(".js-callback-btn");
        if (cbtns && cbtns.length) {
            for (var cbtn of cbtns) {
                cbtn.addEventListener('click', function (event) {
                    event.preventDefault();

                    var form_s = event.target.closest('form');
                    var formData = serialize(form_s);

                    var self = $(this);
                    self.hide();

                    fetch("/ajax/?func=sendbackcall",{
                        method: 'POST',
                        body: formData,
                    }).then(() => {
                        popup('Спасибо!', 'В ближайшее время с вами свяжется наш менеджер.');
                        self.show();
                    });

                });
            }
        }

    }
}, false);

var serialize = function (form) {
    var arr = [];
    Array.prototype.slice.call(form.elements).forEach(function (field) {
        if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) return;
        if (field.type === 'select-multiple') {
            Array.prototype.slice.call(field.options).forEach(function (option) {
                if (!option.selected) return;
                arr.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(option.value));
            });
            return;
        }
        if (['checkbox', 'radio'].indexOf(field.type) >-1 && !field.checked) return;
        arr.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value));
    });
    return arr.join('&');
};