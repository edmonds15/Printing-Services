$(function () {
    var tab = Number($("#tab").text());
    $("#tabs").tabs({
        active: tab
    });
});