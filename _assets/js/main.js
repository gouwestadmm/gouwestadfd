// 
// set/get cookie function
//


docCookies = {
    getItem: function(sKey) {
        if (!sKey || !this.hasItem(sKey)) {
            return null; }
        return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
    },
    setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/.test(sKey)) {
            return; }
        var sExpires = "";
        if (vEnd) {
            switch (typeof vEnd) {
                case "number":
                    sExpires = "; max-age=" + vEnd;
                    break;
                case "string":
                    sExpires = "; expires=" + vEnd;
                    break;
                case "object":
                    if (vEnd.hasOwnProperty("toGMTString")) { sExpires = "; expires=" + vEnd.toGMTString(); }
                    break;
            }
        }
        document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    },
    removeItem: function(sKey) {
        if (!sKey || !this.hasItem(sKey)) {
            return; }
        var oExpDate = new Date();
        oExpDate.setDate(oExpDate.getDate() - 1);
        document.cookie = escape(sKey) + "=; expires=" + oExpDate.toGMTString() + "; path=/";
    },
    hasItem: function(sKey) {
        return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie); }
};


//
// Start detection of Internet Explorer
//
// detect IE
var IEversion = detectIE();

//what to do
if (IEversion !== false) {
   $('body').addClass("IE"+"_"+IEversion);
} else {
  $('body').addClass("NO-IE");
}

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
  var ua = window.navigator.userAgent;

  // Test values; Uncomment to check result …

  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
  
  // IE 11
 //var ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  
  // IE 12 / Spartan
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
  
  // Edge (IE 12+)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

//
// set a cookie when warning has been clicked away
//

function IEwarning() {
    docCookies.setItem("ieWarning", "dismissed", 6048e2, "/"); // this cookie will expire in one DAY
}

// check ie cookie clicked
var ieWarningDismissed = document.cookie.indexOf("ieWarning=dismissed") >= 0;

if (ieWarningDismissed) {
    $('body').addClass("warning-dismissed");
}

//
// END IE DETECTION
//

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

  //
    // NAVIGATION HIDDEN ON SCROLL
    //
    $('.headroom').each(function() {
        var $win = $(window),
        $self = $(this),
        isHidden = false,
        lastScrollTop = 20,
        menuActive = false

        $win.on('scroll', function() {
            var scrollTop = $win.scrollTop()
            var offset = scrollTop - lastScrollTop
            lastScrollTop = scrollTop

            if ($('body').hasClass('navigation-active')){
                menuActive = true
            }
            else {
                menuActive = false
            }

            // min-offset, min-scroll-top
            if (offset > 10 && scrollTop > 200) {
                if (!isHidden && !menuActive) {
                    $self.addClass('headroom-hidden')
                    isHidden = true
                }
            } else if (offset < -10 || scrollTop < 200) {
                if (isHidden) {
                    $self.removeClass('headroom-hidden')
                    isHidden = false
                }
            }
        })
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


function onSubmit(token) {
   $.ajax({
        type: 'post',
        url: '#',
        data: $('#bezichtiging-form').serialize(),
        success: function () {
            window.ConversationalForm.addRobotChatResponse("Bedankt voor je aanmelding.");
            window.ConversationalForm.addRobotChatResponse("We nemen zo snel mogelijk contact met je op.");
            var $el = $("#bezichtiging-confirmation");
            setTimeout(function () {
                $el.addClass('active');
            }, 1000);
            console.log("form send");
        }
    });
}

window.onload = function() {
    var conversationalForm = window.cf.ConversationalForm.startTheConversation({
        formEl: document.getElementById("bezichtiging-form"),
        context: document.getElementById("cf-context"),
        robotImage: "/img/logo-mark.svg",
        submitCallback: function() {
            grecaptcha.execute();
        },
        dictionaryData: {
            "entry-not-found": "We hebben je invoer niet gevonde",
            "input-placeholder": "Vul hier je antwoord in ...",
            "input-placeholder-required": "Vul een antwoord in ...",
            "input-placeholder-error": "Je invoer is onjuist ...",
            "input-placeholder-file-error": "Upload mislukt ...",
            "input-placeholder-file-size-error": "Helaas, je bestand is te groot ...",
            "input-no-filter": "Geen resultaten voor {input-value}",
            "user-reponse-and": " en ",
            "user-reponse-missing": "Je hebt geen antwoord ingevuld of geen voorkeur ...",
            "general": "Algemeen Type1|Algemeen Type2"
        },
        dictionaryRobot: {
            "text": "Schrijf hier je antwoord.",
            "input": "Schrijf hier je antwoord.",
            "name": "Hoe heet je?",
            "email": "Wat is je emailadres?",
            "password": "Vul het wachtwoord in",
            "tel": "Wat is je telefoonnummer?",
            "radio": "Kies er 1.",
            "checkbox": "Kies er zoveel als je wilt",
            "select": "Kies een van deze mogelijkheden.",
            "general": "Algemeen1|Algemeen2|Algemeen3.."
        }// empty will throw error
    });
};
