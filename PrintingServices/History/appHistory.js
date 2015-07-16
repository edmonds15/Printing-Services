$(function () {
    $("#history").css("width", "" + $("#ui-id-4").width() + "px");

    $(window).resize(function () {
        $("#history").css("width", "" + $("#ui-id-4").width() + "px");
    });
});