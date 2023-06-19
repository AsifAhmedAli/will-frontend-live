var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

$(document).ready(function () {
  $("button.menu-link").click(function () {
    $(this).parents(".has-submenu").toggleClass("collapsed", 1000);
    $(this).parents(".has-submenu").siblings().addClass("collapsed", 1000);
  });

  checkChatScroll();
});

function checkChatScroll() {
  var objDiv = document.getElementsByClassName("dashboard-body")[0];
  var objDiv2 = $('.chat-history-canvas').find('.offcanvas-body');
  objDiv.scrollTop = objDiv.scrollHeight;
  objDiv2.scrollTop = objDiv2.scrollHeight;
}

function openSuggestionsClass() {
  $(".suggested-candidates").toggleClass("open", 1000, "easeOutSine");
}

function toggleAsideClass() {
  $("aside").toggleClass("d-block");
}

if ($(window).width() > 992) {
  // Toggle suggestions
  $("#toggle-suggestions").click(function () {
    $(".suggested-candidates").toggleClass("collapsed", 1000, "easeOutSine");
    $("main").toggleClass("full");
    $(".chat-box").toggleClass("full");
  });
}

if ($(window).width() < 991) {
  // Toggle suggestions
  $("#toggle-suggestions").click(function () {
    openSuggestionsClass();
    $("aside").removeClass("d-block");
  });

  $("#close-suggested-cd").click(function () {
    openSuggestionsClass();
  });
}

$("#toggle-menu").click(function () {
  toggleAsideClass();
  if ($(window).width() < 991){
    $(".suggested-candidates").removeClass("open", 1000, "easeOutSine");
  }
});

$("#close-sidebar").click(function () {
  toggleAsideClass();
});
