$(function () {
    $("#cp").css("width", "" + $("#ui-id-8").width() + "px");

    $(window).resize(function () {
        $("#cp").css("width", "" + $("#ui-id-8").width() + "px");
    });
});