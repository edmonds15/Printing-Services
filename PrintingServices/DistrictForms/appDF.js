$(function () {
    $("#df").css("width", "" + $("#ui-id-6").width() + "px");

    $(window).resize(function () {
        $("#df").css("width", "" + $("#ui-id-6").width() + "px");
    });
})