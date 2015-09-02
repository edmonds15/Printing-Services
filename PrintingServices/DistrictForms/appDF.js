$(function () {
    $.ajaxSetup({ async: false });

    $("#dfError").hide();

    $("#df").css("width", "" + $("#ui-id-8").width() + "px");
    $(window).resize(function () {
        $("#df").css("width", "" + $("#ui-id-8").width() + "px");
    });

    $("button").button();
    $("#submitDF").button("option", "disabled", true);
    $("#removeRow").button("option", "disabled", true);
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
            $("#dfBody").hide();
            $("#dfError").show().append(document.createTextNode(data));
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
            $("#dfBody").hide();
            $("#dfError").show().append(document.createTextNode(data));
            console.log(data);
        }
    });

    $("#entries").on("change", "select", function () {
        var allValid = true;
        $("select").each(function (index, value) {
            if ($(this).val() == "none") {
                allValid = false;
            }
        });
        if (!allValid) {
            $("#submitDF").button("option", "disabled", true);
        } else {
            $("#submitDF").button("option", "disabled", false);
        }
    })

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
        $("#removeRow").button("option", "disabled", false);
        $("#submitDF").button("option", "disabled", true);
    });

    $("#removeRow").click(function () {
        if ($(".entry").length == 2) {
            $("#removeRow").button("option", "disabled", true);
        }
        $(".entry:last").slideUp(250, function () {
            $(this).remove();
        });
    });

    $("#submitDF").click(function () {
        $(this).button("option", "disabled", true);
        $(".entry").each(function (index) {
            var form = $(".form:eq(" + index + ")").val();
            var loc = $(".loc:eq(" + index + ")").val();
            var num = $(".spinner:eq(" + index + ")").val();
            var comment = $(".comment:eq(" + index + ")").val();
            var entry = { form: form, loc: loc, num: num, comment: comment };
            $.post("DistrictForms/recordDF.aspx", entry, function (result) {
                console.log(result);
            });
        });
        var entryNum = $(".entry").length;
        while (entryNum > 1) {
            $(".entry:last").remove();
            entryNum -= 1;
        }
        $(".form").val("none");
        $(".loc").val("none");
        $(".spinner").val(1);
        $(".comment").val("");
        var alert = $("<div class=\"alert alert-success\" role=\"alert\" id=\"alertSuccess\">Request Submitted Successfully!</div>");
        alert.prependTo("#df");
        $("#alertSuccess").alert();
        window.setTimeout(function () {
            $("#alertSuccess").slideUp(250, function () {
                $(this).remove();
            });
        }, 3000);
    });
});