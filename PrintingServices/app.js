﻿$(function () {
    // Set the active tab to whatever is in the tab element
    // This should be whatever tab was last viewed
    // This prevents the page going back to the home tab whenever the page is refreshed
    var tab = Number($("#tab").text());
    $("#tabs").tabs({
        active: tab
    });

    // Set a resize sensor on the body to make the blue height dependent on the tab height
    // Resize sensor plugin fires every time the body height changes
    new ResizeSensor($("#body"), function () {
        var mainHeight = $(".container:first").height() + 150;
        $("#main").css("height", mainHeight + "px");
    });
});