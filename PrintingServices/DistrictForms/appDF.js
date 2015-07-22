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

    $("#addRow").click(function () {
        $(".spinner").spinner("destroy");
        var entry = $("<div class=\"entry\">" + $(".entry:first").html() + "</div>");
        $("#entries").append(entry);
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
        $("#submit").prop("disabled", true);
        $(".entry").each(function (index) {
            console.log("Entry " + index);
        });
        var alert = $("<div class=\"alert alert-success\" role=\"alert\" id=\"alertSuccess\">Request Submitted successfully!</div>");
        alert.prependTo("#df");
        $("#alertSuccess").alert();
        window.setTimeout(function () {
            $("#alertSuccess").fadeTo(500, 0).slideUp(500, function () {
                $(this).remove();
            });
            $("#submit").prop("disabled", false);
        }, 3000);
    });
});