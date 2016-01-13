$(function () {
    // Fix the width to be inside the tab
    $("#help").css("width", "" + $("#ui-id-16").width() + "px");
    $(window).resize(function () {
        $("#help").css("width", "" + $("#ui-id-16").width() + "px");
    });
});