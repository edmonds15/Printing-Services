$(function () {
    $("#bc").css("width", "" + $("#ui-id-6").width() + "px");

    $(window).resize(function () {
        $("#bc").css("width", "" + $("#ui-id-6").width() + "px");
    });
});