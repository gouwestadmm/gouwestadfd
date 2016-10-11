//
// GENERAL TOGGLE FUNCTION
// general function for toggling stuff via data-attributes

$('[data-action=body-action]').click(function(e) {
    //e.preventDefault();
    var bodyTarget = $(this).data("action-target");
    $('body').toggleClass(bodyTarget);

    if ($(this).data("sticky-action") === "rebuild") {
        console.log('sticky rebuild started');
        Stickyfill.rebuild();
    };
});



// CLOSE PAGE OVERLAY WHEN BACK BUTTON PRESSED
// 

function hashNav() {
    // check if there is a url hash that contains *-active, and if so, 
    // save it as a variable and prepend a 
    // else, set variable as the default "all"
    if(window.location.hash) {
        console.log('contains hash');

        var thehash = window.location.hash;
           if (thehash *= "active"){

              console.log(thehash); // returns "#search"
              $('body').addClass(thehash);

           }
    }

    //var filterOnLoad = window.location.hash ? (window.location.hash).replace('#', '') : '0';
    //console.log(filterOnLoad);
    //$('body').addClass(filterOnLoad);

    // find object based on hash
};

/*
if ("onhashchange" in window) {
    console.log("The browser supports the hashchange event!");
}

function locationHashChanged() {
    console.log('hash changed');
    if (location.hash *= "active") {
        var filterOnLoad = window.location.hash ? (window.location.hash).replace('#', '') : '0';
        console.log(filterOnLoad);
        $('body').addClass(filterOnLoad);
    }
}

window.onhashchange = locationHashChanged();*/


//initialize swiper when document ready  
var homeProductSwiper = new Swiper('.home-product-swiper-container', {
    // Optional parameters
    pagination: '.swiper-pagination',
    slidesPerView: 'auto',
    paginationClickable: true,
    nextButton: '.swiper-next',
    prevButton: '.swiper-prev'
})


$(document).ready(function() {
    
    // load image url into parents background
    $('.data-image').each(function() {
        var imageUrl = $(this).find('img').attr('src');
        $(this).css('background-image', 'url(' + imageUrl + ')');
    });


});
