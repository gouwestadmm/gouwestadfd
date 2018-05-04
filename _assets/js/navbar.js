
//Function for toggling the main menu 
function menuToggle() {
    if ($('body').hasClass('navigation-menu-active')) {
            $('body').removeClass('navigation-menu-active'),
            $('.m-bar').removeClass('animate');
    } else if ($('body').hasClass('sidebar-active')) {
            $('body').removeClass('sidebar-active'),
            $('body').addClass('navigation-menu-active'),
            $('.m-bar').addClass('animate');
    } else {
            $('.m-bar').addClass('animate'),
            $('body').addClass('navigation-menu-active');
    }
}


$(".side-nav-toggle").click(function(e) {
    e.preventDefault();
    console.log("menu-clicked");
    menuToggle();
});

$(".page-overlay").click(function(e) {
    e.preventDefault();
    pageOverlayToggle();
});

// fucntion for closing the side menu and then openin sidebar when menu is active
function sidebarToggle() {
    if ($('body').hasClass('side-nav-active')) {
        $('body').addClass('sidebar-active');
        $('body').removeClass('side-nav-active');
        $('.m-bar').removeClass('animate');
    } else if ($('body').hasClass('sidebar-active')) {
        $('body').removeClass('sidebar-active');
    } else {
        $('body').addClass('sidebar-active');
    }
}

// Function for toggling the page overlay and closing stuff
function pageOverlayToggle() {
    // if sidebar or sidemenu is active close that on click
    if ($('body').hasClass('sidebar-nav-active')) {
        $('body').removeClass('sidebar-nav-active'),
            $('.m-bar').removeClass('animate');
    } else if ($('body').hasClass('sidebar-active')) {
        $('body').removeClass('sidebar-active');
    }
}
