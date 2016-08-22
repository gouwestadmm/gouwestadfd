//
// GENERAL TOGGLE FUNCTION
// general function for toggling stuff via data-attributes

$('[data-action=body-action]').click(function(e) {
    e.preventDefault();
    var bodyTarget = $(this).data("action-target");
    $('body').toggleClass(bodyTarget);

    if ($(this).data("sticky-action") === "rebuild") {
        console.log('sticky rebuild started');
        Stickyfill.rebuild();
    };
});


$(document).ready(function() {
    
    // load image url into parents background
    $('.data-image').each(function() {
        var imageUrl = $(this).find('img').attr('src');
        $(this).css('background-image', 'url(' + imageUrl + ')');
    });

});


//initialize swiper when document ready  
var homeProductSwiper = new Swiper('.home-product-swiper-container', {
    // Optional parameters
    pagination: '.swiper-pagination',
    slidesPerView: 'auto',
    paginationClickable: true,
    nextButton: '.swiper-next',
    prevButton: '.swiper-prev'
})