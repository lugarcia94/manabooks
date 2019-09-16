import './style.styl';


function debounce(func) {
    var timer;
    return function (event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 200, event);
    };
}

function navigationHiddenResize() {
    const widthNavigation = $('.menu--navigation .menu__ul--nv1').outerWidth();
    let widthCurrent = 0;
    $('.menu--navigation .menu__item--nv1').removeClass('menu__item--hidden');
    $('.menu--navigation .menu__item--nv1').each(function () {
        widthCurrent += $(this).outerWidth();
        if (widthCurrent > widthNavigation) {
            $(this).addClass('menu__item--hidden');
        }
    });
}

function navigationAlign() {
    $('.menu--navigation').each(function () {

        $(this).find('.menu--nv2').removeClass('menu--rtl');

        $(this).find('.menu--nv2').each(function () {
            const nav = $(this).closest('.menu--nv1').outerWidth();
            const left = $(this).offset().left + $(this).outerWidth() - $(this).closest('.menu--nv1').offset().left;

            if (left > nav) {
                $(this).addClass('menu--rtl');
                resize(this);
            }
        });
    })
}

function resize(el) {
    var left = $(el).offset().left;
    var leftContainer = $(el).closest('.menu--nv1').offset().left;

    if (left < leftContainer) {
        $(el).css({
            right: left - leftContainer
        });
    }
}


const childs = Array.from(document.querySelectorAll('.menu__item--has-child'));

childs.forEach((child) => {
    child.addEventListener('click', (evt) => {
        const target = evt.target;
        if (target.classList.contains('menu__item--has-child')) {
            let expanded = target.getAttribute('aria-expanded');
            if (expanded !== 'true' && expanded !== 'false') expanded = 'false';
            target.setAttribute('aria-expanded', expanded === 'true' ? false : true);
            $(target).find('> .menu--sub').slideToggle();
        }
    }, false);
});

window.addEventListener('resize', debounce(function (e) {
    navigationHiddenResize();
    navigationAlign();
}));

navigationHiddenResize();
navigationAlign();