

// GENERAL TOGGLE FUNCTION
// general function for toggling stuff via data-attributes

$('[data-action=body-action]').click(function(e) {
     e.preventDefault();
    var bodyTarget = $(this).data("action-target");
    $('body').toggleClass(bodyTarget);
});


//
// NAV TOGGLE
//

$(".nav-toggle").click(function() {
  $(".nav-toggle").toggleClass("cross");
  $("body").toggleClass("navigation-active");

});

$(".navbar-search-link").click(function() {
  $(".nav-toggle").addClass("cross");
  $("body").addClass("navigation-active");
  $("body").addClass("menu-search-form-active");
});


//
// SMOOTH SCROLLING
//

$(function() {
    $('.smoothscroller').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 100
                }, 1000);
                return false;
            }
        }
    });
});

// DATA IMAGE FUNCTION
// general function for toggling stuff via data-attributes
  $('.data-image').each(function(){
    var imageUrl = $(this).find('img').attr('src');
    $(this).css('background-image', 'url(' + imageUrl + ')');
 });



//initialize swiper when document ready  
var defaultSwiper = new Swiper('.swiper-container', {
    pagination: {
       el: '.swiper-pagination',
       type: 'bullets',
       clickable: true,
    },
    slidesPerView: 'auto',
    paginationClickable: true,
    spaceBetween: 0,
    navigation: {
        nextEl: '.slider-btn-next',
        prevEl: '.slider-btn-prev',
    },
    slideVisible: '.slide-visible',
    loop: false,
    watchSlidesProgress: true,
    watchSlidesVisibility: true
})
