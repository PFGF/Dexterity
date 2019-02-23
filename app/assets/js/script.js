// $(function() {
//     FastClick.attach(document.body);
// });

$(document).ready(function(){

    updateScroll();

    $(function() {
        $('body a').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

                    if (target.length) {
                        $('html,body').animate({
                                scrollTop: (target.offset().top)
            }, 500); return false;}
            }
        });
    });

    function updateScroll() {

        var pos = $(window).scrollTop();
        var headerheight = $("header").height() / 4;
        pos > headerheight ? $(".top-navigation").addClass("scrolled") : $(".top-navigation").removeClass("scrolled");

    };

    $(window).on('scroll', function(){
        updateScroll();
    });

    $(window).on('resize', function(){
        headerSlider();
        postsSlider();
    });

    $("#search").on("click", function(){
        $("#searchfield").addClass("show");
    });

    $(".hamburger-menu").on("click", function(){
        $("header nav").toggleClass("opened");
    });

});
