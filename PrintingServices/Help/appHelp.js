$(function () {
    $("#progressbar").css("display", "none");

    $("#help").css("width", "" + $("#ui-id-12").width() + "px");
    $(window).resize(function () {
        $("#help").css("width", "" + $("#ui-id-12").width() + "px");
    });
});