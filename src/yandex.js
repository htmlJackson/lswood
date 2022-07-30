var fired = false;

window.addEventListener('scroll', () => {
    if (fired === false) {
        fired = true;

        setTimeout(() => {
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(53623114, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
            });
        }, 1000)
    }
});

function yandexGoal (yaCounter, goal, params) {

    if (typeof(yaCounter) == "object") {
        if (typeof(params) !== 'undefined') {
            yaCounter.reachGoal(goal, params);
        }
        else {
            yaCounter.reachGoal(goal);
        }
    }
}