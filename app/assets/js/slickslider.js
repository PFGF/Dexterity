$(document).ready(function() {
    $('.header-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        fade: true,
        arrows: false
    });

    $('.posts-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        infinite: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                }
            }
        ]
    });
});

/* ---------- Header slider ---------- */
headerSlider();
function headerSlider() {

    setTimeout(function() {
        $(".header-slider .slick-dots li").each(function() {
            var progressElement = document.createElement("div");
            $(this).append(progressElement);
            $(this).find("div").addClass("slick-progress");
        });

        // var element = $(".maxwidth-header-dots").detach();
        // $(".header-slider").append(element);
        var element2 = $(".header-slider .slick-dots").detach();
        $(".maxwidth-header-dots").append(element2);
    }, 300);

}

var headerSlideDuration = 6000;
var headerIntervalSpeed = 40;
var headerSlideProgressHeight = 0;

var progressInterval = setInterval(sliderProgressBar, headerIntervalSpeed);

function sliderProgressBar() {
    headerSlideProgressHeight += (headerIntervalSpeed / headerSlideDuration) * 100;

    $(".maxwidth-header-dots .slick-dots .slick-progress").css("height", "0%");
    $(".maxwidth-header-dots .slick-dots .slick-active .slick-progress").css("height", headerSlideProgressHeight + "%");

    if (headerSlideProgressHeight >= 100) {
        headerSlideProgressHeight = 0;
        $('.header-slider').slick('slickNext');
    }
}

$('.header-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    headerSlideProgressHeight = 0;
});

/* ---------- Posts slider ---------- */
postsSlider();
function postsSlider() {

    var element = $("#posts .slide-progress-container").detach();
    setTimeout(function() {
        $('.posts-slider').append(element);
    }, 100);

}

var postsSlideDuration = 6000;
var postsIntervalSpeed = 40;
var postsProgressWidth = 0;

var progressInterval = setInterval(postsSliderProgressBar, postsIntervalSpeed);

function postsSliderProgressBar() {
    postsProgressWidth += (postsIntervalSpeed / postsSlideDuration) * 100;

    $(".posts-slider .slide-progress-container .slide-progress").css("width", postsProgressWidth + "%");

    if (postsProgressWidth >= 100) {
        postsProgressWidth = 0;
        $('.posts-slider').slick('slickNext');
    }
}

$('.posts-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    postsProgressWidth = 0;
});
