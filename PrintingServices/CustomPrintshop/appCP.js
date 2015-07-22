$(function () {
    $("#cp").css("width", "" + $("#ui-id-8").width() + "px");

    $(window).resize(function () {
        $("#cp").css("width", "" + $("#ui-id-8").width() + "px");
    });

    $("button").button();
    $("#fulfill").datepicker({
        showAnim: "fadeIn"
    });
});