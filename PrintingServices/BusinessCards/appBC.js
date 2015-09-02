$(function () {
    $("#bc").css("width", "" + $("#ui-id-4").width() + "px");
    $(window).resize(function () {
        $("#bc").css("width", "" + $("#ui-id-4").width() + "px");
    });
});