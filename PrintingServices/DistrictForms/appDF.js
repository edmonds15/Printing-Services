$(function () {
    $("#df").css("width", "" + $("#ui-id-4").width() + "px");

    $(window).resize(function () {
        $("#df").css("width", "" + $("#ui-id-4").width() + "px");
    });
})