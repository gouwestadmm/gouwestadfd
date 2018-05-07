

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
  $("body").toggleClass("navigation-menu-active");

  if( $("body").hasClass("menu-search-form-active")){
    $("body").removeClass("menu-search-form-active");
  }
});

$(".navbar-search-link").click(function() {
  $(".nav-toggle").addClass("cross");
  $("body").addClass("navigation-menu-active");
  $("body").addClass("menu-search-form-active");
});

$(".video-play-icon").click(function() {
  var videoSrc = $(this).data("video-src");
  $("#video-player").attr('src',videoSrc);
});

 $(".video-close-icon").click(function() {
  $('#video-player').attr('src', $('#video-player').attr('src'));
});

$(".overlay-content-icon").click(function() {
  var contentSrc = $(this).data("content-src");
  $("#content-holder").attr('src',contentSrc);
});

 $(".overlay-content-close-icon").click(function() {
  $('#content-holder').attr('src', $('#video-player').attr('src'));
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

    var filterOnLoad = window.location.hash ? (window.location.hash).replace('#', '') : '0';
    console.log(filterOnLoad);
    $('body').addClass(filterOnLoad);
    // find object based on hash
};

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

window.onhashchange = locationHashChanged();


//
// CLOUDCANNON AJAX FORM DATA
// Helper function to get form data in the supported format
function getFormDataString(formEl) {
  var formData = new FormData(formEl),
      data = [];

  for (var keyValue of formData) {
    data.push(encodeURIComponent(keyValue[0]) + "=" + encodeURIComponent(keyValue[1]));
  }

  return data.join("&");
}

// Fetch the form element
var formEl = document.getElementById("contact-form");

// Override the submit event
formEl.addEventListener("submit", function (e) {
  e.preventDefault();

  if (grecaptcha) {
    var recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) { // reCAPTCHA not clicked yet
      return false;
    }
  }

  var request = new XMLHttpRequest();

  request.addEventListener("load", function () {
    if (request.status === 302) { // CloudCannon redirects on success
      // It worked
    }
  });

  request.open(formEl.method, formEl.action);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.send(getFormDataString(formEl));
});
