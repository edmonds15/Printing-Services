$(function () {
    $("#df").css("width", "" + $("#ui-id-4").width() + "px");

    $(window).resize(function () {
        $("#df").css("width", "" + $("#ui-id-4").width() + "px");
    });

    $("button").button();
    $(".spinner").spinner({
        min: 1,
        max: 20
    });

    $("#addRow").click(function () {
        $("#entries").append("<div class=\"entry\">New Entry</div>");
    });

    $("#submit").click(function () {
        $(".entry").each(function (index) {
            console.log("Entry " + index);
        });
    });
});