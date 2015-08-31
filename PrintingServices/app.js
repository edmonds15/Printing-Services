$(function () {
    $("#progressbar").progressbar({ value: false });
    $("#progressbar").find(".ui-progressbar-value").css({ "background": "#FFFFFF" });
    $("#progressbar").css("display", "none");
    var tab = Number($("#tab").text());
    $("#tabs").tabs({
        active: tab
    });

    new ResizeSensor($("#body"), function () {
        var mainHeight = $(".container:first").height() + 200;
        $("#main").css("height", mainHeight + "px");
    });
});