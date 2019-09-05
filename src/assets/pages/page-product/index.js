import './style.styl';


const buttonMoreLess = () => {
    const qtd = $("#quantidade:not(on)");
    const buttonLess = $("<button type='button' id='less' class='product__quantity product__quantity--less'> - </button>");
    const buttonMore = $("<button type='button' id='more' class='product__quantity product__quantity--more'> + </button>");
    qtd.append(buttonLess).append(buttonMore);
    qtd.addClass('on');

}

$(document).on('click', '#quantidade #more', function () {
    const qty = $('#quant');
    let val = parseInt(qty.val());

    if (val) {
        qty.val(++val);
    }
});

$(document).on('click', '#quantidade #less', function () {
    const qty = $('#quant');
    let val = parseInt(qty.val());
    if ((val - 1) > 0)
        qty.val(--val);
});

buttonMoreLess();

document.addEventListener('EVENT_VARIANT_FORM', function (e) {
    buttonMoreLess();
}, false);


if ($('.fotosCompreJunto').length > 0) {
    var aux;
    $.each($('.fotosCompreJunto .produto img'), function () {
        aux = $(this).attr('src');
        aux = aux.replace('/90_', '/180_');
        $(this).attr('src', aux);
    });
}


if (typeof $tray === 'function') {

    $tray(document).on('thumbs:start', function () {
        $('.thumbs__list').slick({
            slidesToShow: 5,
            slidesToScroll: 2,
            autoplaySpeed: 2000,
            dots: false,
            prevArrow: `<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>`,
            nextArrow: `<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>`,

            responsive: [{
                breakpoint: 993,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            }]

        })
    })
}

$('.related__list').each(function () {
    $(this).slick({
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: `<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>`,
        nextArrow: `<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>`,
        responsive: [{
                breakpoint: 424,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            }
        ]
    });
});