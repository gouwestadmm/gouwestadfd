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

