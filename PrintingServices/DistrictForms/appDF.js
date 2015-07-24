$(function () {
    $("#df").css("width", "" + $("#ui-id-4").width() + "px");

    $(window).resize(function () {
        $("#df").css("width", "" + $("#ui-id-4").width() + "px");
    });

    $("button").button();
    $(".spinner").spinner({
        min: 1
    });

    $("#entries").on("change", ".spinner", function () {
        if ($(this).val() < 1) {
            $(this).val(1);
        }
    });

    $("#comment").change(function () {
        $(this).val($(this).val().trim());
    });

    $("#addRow").click(function () {
        $(".spinner").spinner("destroy");
        var entry = $("<div class=\"entry\" style=\"display: none\">" + $(".entry:first").html() + "</div>");
        $("#entries").append(entry);
        $(".entry:last").slideDown(250);
        $(".spinner").spinner({
            min: 1
        });
    });

    $("#removeRow").click(function () {
        if ($(".entry").length > 1) {
            $(".entry:last").slideUp(250, function () {
                $(this).remove();
            });
        }
    });

    $("#submitDF").click(function () {
        $(this).prop("disabled", true).css("background", "white");
        $(".entry").each(function (index) {
            console.log("Entry " + index);
        });
        var alert = $("<div class=\"alert alert-success\" role=\"alert\" id=\"alertSuccess\">Request Submitted Successfully!</div>");
        alert.prependTo("#df");
        $("#alertSuccess").alert();
        window.setTimeout(function () {
            $("#alertSuccess").slideUp(250, function () {
                $(this).remove();
            });
            $("#submitDF").prop("disabled", false).removeAttr("style");
        }, 3000);
    });
});