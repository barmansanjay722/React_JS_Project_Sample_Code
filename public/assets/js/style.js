$(document).on("click",".menu-toggle",function () {
    $(".sidebar").toggleClass("open");
    if ($(window).width() < 1023) {
        $(".sidebar").removeClass("sidebar-mini");
    }
}),
$(document).on("click",".btn-right a",function () {
    $(".rightbar").toggleClass("open");
}),
$(document).on("click",".sidebar-mini-btn",function () {
    $(".sidebar").toggleClass("sidebar-mini");
}),
$(document).on("click",".hamburger-icon",function () {
    $(this).toggleClass("active");
    if ($(window).width() < 1024) {
        $(".sidebar").toggleClass("sidebar-mini");
    }
})
$(document).on("click",".quick-light-dark",function () {
    $(this).toggleClass("active"),
        "light" == localStorage.getItem("theme")
            ? (document.documentElement.setAttribute("data-theme", "dark"), localStorage.setItem("theme", "dark"), $("#theme-switch").prop("checked", !0))
            : (document.documentElement.setAttribute("data-theme", "light"), localStorage.setItem("theme", "light"), $("#theme-switch").prop("checked", !1));
});

// active menu
jQuery(function($) {
    var path = window.location.href; 
    // because the 'href' property of the DOM element is the absolute path
    $('ul.menu-list a').each(function() {
      if (this.href === path) {
        $(this).parent().siblings().children('.m-link').removeClass('active');
        $(this).addClass('active');
        
      }
    });
  });