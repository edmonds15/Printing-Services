$(function () {
    $("#dfError").hide();

    // Fix the width to be inside the tab
    $("#df").css("width", "" + $("#ui-id-10").width() + "px");
    $(window).resize(function () {
        $("#df").css("width", "" + $("#ui-id-10").width() + "px");
    });

    // Set up JQueryUI controls
    $("button").button();
    $("#submitDF").button("option", "disabled", true);
    $("#removeRowDF").button("option", "disabled", true);
    $(".numDF").spinner({
        min: 1
    });
    $("#confirmDF").dialog({
        autoOpen: false,
        resizable: false,
        modal: true,
        buttons: {
            "Yes, Submit": function () {
                $(this).dialog("close");
                submitDF();
            },
            "No, Go Back": function () {
                $(this).dialog("close");
                $("#submitDF").button("option", "disabled", false);
            }
        }
    });

    // Get all district forms
    $.ajax({
        url: "DistrictForms/getForms.aspx",
        success: function (data) {
            // If successful, put the data in the form select box
            if (data.charAt(0) == "[" && data.charAt(data.length - 1) == "]") {
                data = JSON.parse(data);
                $.each(data, function (index, value) {
                    var option = $("<option value=\"" + value + "\">" + value + "</option>")
                    $(".formDF").append(option);
                });
            } else {
                $("#dfBody").hide();
                $("#dfError").show().append(document.createTextNode("getForms - " + data));
            }
        },
        error: function (xhr) {
            $("#dfBody").hide();
            $("#dfError").show().append(document.createTextNode("getForms - " + xhr.status + " " + xhr.statusText));
        }
    });

    // If enter key is pressed, try to submit the form
    $("#df").keyup(function (event) {
        if (event.which == 13) {
            $("#submitDF").click();
        }
    });

    // Check whether all select boxes are valid, to enable or disable submitting
    $("#dfEntries").on("change", ".formDF", function () {
        var allValid = true;
        // If any select boxes are invalid, disable submitting
        $(".formDF").each(function (index, value) {
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

    // Make sure quantity box does not go below 1
    $("#dfEntries").on("change", ".numDF", function () {
        if ($(this).val() < 1 || isNaN($(this).val())) {
            $(this).val(1);
        }
    });

    // Trim deliver input
    $("#dfEntries").on("change", ".toDF", function () {
        $(this).val($(this).val().trim());
    });

    // Trim comment input
    $("#dfEntries").on("change", ".commentDF", function () {
        $(this).val($(this).val().trim());
    });

    // Add a new entry to submit
    $("#addRowDF").click(function () {
        // Destroy current spinners so that they do not get stacked when rebuild
        $(".numDF").spinner("destroy");
        // Copy the first entry and append it to the form
        var entry = $("<div class=\"entryDF\" style=\"display: none\">" + $(".entryDF:first").html() + "</div>");
        $("#dfEntries").append(entry);
        $(".entryDF:last").slideDown(250);
        // Rebuild the form
        $(".numDF").spinner({
            min: 1
        });
        $("#removeRowDF").button("option", "disabled", false);
        $("#submitDF").button("option", "disabled", true);
    });

    // Remove the last entry
    $("#removeRowDF").click(function () {
        // Disable this option if there will be only 1 entry left after remove
        if ($(".entryDF").length == 2) {
            $("#removeRowDF").button("option", "disabled", true);
        }
        $(".entryDF:last").slideUp(250, function () {
            $(this).remove();
        });
    });

    // Put up confirmation box
    $("#submitDF").click(function () {
        $(this).button("option", "disabled", true);
        $("#confirmDF").dialog("open");
    });

    // Submit all entries to be processed
    function submitDF() {
        // Run the request process for every entry
        var requestIds = "";
        var error = false;
        $(".entryDF").each(function (index) {
            var form = $(".formDF:eq(" + index + ")").val();
            var num = $(".numDF:eq(" + index + ")").val();
            var to = $(".toDF:eq(" + index + ")").val();
            var comment = $(".commentDF:eq(" + index + ")").val();
            var entry = { form: form, num: num, to: to, comment: comment };
            $.ajax({
                url: "DistrictForms/recordDF.aspx",
                method: "POST",
                data: entry,
                async: false,
                success: function (result) {
                    console.log(result);
                    // If any entry errors, display the error and stop
                    var results = result.split("\n");
                    if (results.length != 3) {
                        $("#dfBody").hide();
                        $("#dfError").show().append(document.createTextNode("submitDF - " + result));
                        error = true;
                    }
                    var reqId = results[0].split(":")[1];
                    if (reqId == "" || results[1].charAt(0) != "1") {
                        $("#dfBody").hide();
                        $("#dfError").show().append(document.createTextNode("submitDF - Request processed incorrectly"));
                        error = true;
                    }
                    requestIds += " " + reqId + ",";
                },
                error: function (xhr) {
                    $("#dfBody").hide();
                    $("#dfError").show().append(document.createTextNode("submitDF - " + xhr.status + " " + xhr.statusText));
                }
            });
            if (error) {
                return false;
            }
        });
        // Remove all extra entries and blank all fields
        requestIds = requestIds.slice(0, -1);
        var entryNum = $(".entryDF").length;
        while (entryNum > 1) {
            $(".entryDF:last").remove();
            entryNum -= 1;
        }
        $(".formDF").val("none");
        $(".numDF").val(1);
        $(".toDF").val("");
        $(".commentDF").val("");
        // Put up confirmation message if no error
        if (!error) {
            var alertMsg = "<div class=\"alert alert-success\" role=\"alert\" id=\"alertSuccess\">";
            alertMsg += "<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>";
            alertMsg += "Request Submitted Successfully! Your Request IDs are:<b>" + requestIds + "</b></div>";
            var alert = $(alertMsg);
            alert.prependTo("#df");
            $("#alertSuccess").alert();
        }
    }
});