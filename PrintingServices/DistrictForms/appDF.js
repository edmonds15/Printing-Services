$(function () {
    $("#df").css("width", "" + $("#ui-id-4").width() + "px");

    $(window).resize(function () {
        $("#df").css("width", "" + $("#ui-id-4").width() + "px");
    });

    $("button").button();
    $(".spinner").spinner({
        min: 1
    });

    $("#addRow").click(function () {
        $(".spinner").spinner("destroy");
        $("#entries").append("<div class=\"entry\">" + $(".entry:first").html() + "</div>");
        $(".spinner").spinner({
            min: 1
        });
    });

    $("#removeRow").click(function () {
        if ($(".entry").length > 1) {
            $(".entry:last").remove();
        }
    });

    $("#submit").click(function () {
        $(".entry").each(function (index) {
            console.log("Entry " + index);
        });
    });

    $("#entries").on("change", ".spinner", function () {
        if ($(this).val() < 1) {
            $(this).val(1);
        }
    });
});