$(function () {
    $("#df").css("width", "" + $("#ui-id-4").width() + "px");
    $(window).resize(function () {
        $("#df").css("width", "" + $("#ui-id-4").width() + "px");
    });

    $("button").button();
    $("#submitDF").button("option", "disabled", true);
    $(".spinner").spinner({
        min: 1
    });

    $.get("DistrictForms/getForms.aspx", function (data) {
        if (data.charAt(0) == "[" && data.charAt(data.length - 1) == "]") {
            data = JSON.parse(data);
            $.each(data, function (index, value) {
                var option = $("<option value=\"" + value + "\">" + value + "</option>")
                $(".form").append(option);
            });
        } else {
            console.log(data);
        }
    });

    $.get("DistrictForms/getLocations.aspx", function (data) {
        if (data.charAt(0) == "[" && data.charAt(data.length - 1) == "]") {
            data = JSON.parse(data);
            $.each(data, function (index, value) {
                var option = $("<option value=\"" + value + "\">" + value + "</option>")
                $(".loc").append(option);
            });
        } else {
            console.log(data);
        }
    });

    $("select").change(function () {
        if ($(".form").val() != "none" && $(".loc").val() != "none") {
            $("#submitDF").button("option", "disabled", false);
        } else {
            $("#submitDF").button("option", "disabled", true);
        }
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
        $(this).button("option", "disabled", true);
        $(".entry").each(function (index) {
            var form = $(".form:eq(" + index + ")").val();
            var loc = $(".loc:eq(" + index + ")").val();
            var num = $(".spinner:eq(" + index + ")").val();
            var comment = $(".comment:eq(" + index + ")").val();
            var entry = { form: form, loc: loc, num: num, comment: comment };
            console.log(entry);
        });
        var alert = $("<div class=\"alert alert-success\" role=\"alert\" id=\"alertSuccess\">Request Submitted Successfully!</div>");
        alert.prependTo("#df");
        $("#alertSuccess").alert();
        window.setTimeout(function () {
            $("#alertSuccess").slideUp(250, function () {
                $(this).remove();
            });
            $("#submitDF").button("option", "disabled", false);
        }, 3000);
    });
});