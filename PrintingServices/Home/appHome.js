$(function () {
    $("#home").css("width", "" + $("#ui-id-2").width() + "px");
    $(window).resize(function () {
        $("#home").css("width", "" + $("#ui-id-2").width() + "px");
    });
});