$(function () {
    $("#history").css("width", "" + $("#ui-id-10").width() + "px");

    $(window).resize(function () {
        $("#history").css("width", "" + $("#ui-id-10").width() + "px");
    });
});