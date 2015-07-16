$(function () {
    $("#bc").css("width", "" + $("#ui-id-8").width() + "px");

    $(window).resize(function () {
        $("#bc").css("width", "" + $("#ui-id-8").width() + "px");
    });
});