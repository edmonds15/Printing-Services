$(function () {
    $("#cp").css("width", "" + $("#ui-id-10").width() + "px");

    $(window).resize(function () {
        $("#cp").css("width", "" + $("#ui-id-10").width() + "px");
    });
});