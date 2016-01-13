$(function () {
    var keyCodeValid = true;
    var accountCodeValid = true;

    $("#ciError").hide();

    // Fix the width to be inside the tab
    $("#ci").css("width", "" + $("#ui-id-12").width() + "px");
    $(window).resize(function () {
        $("#ci").css("width", "" + $("#ui-id-12").width() + "px");
    });

    // Set up JQueryUI controls
    $("button").button();
    $("#submitCI").button("option", "disabled", true);
    $("#removeRowCI").button("option", "disabled", true);
    $(".numCI").spinner({
        min: 1
    });
    $("#confirmCI").dialog({
        autoOpen: false,
        resizable: false,
        modal: true,
        buttons: {
            "Yes, Submit": function () {
                $(this).dialog("close");
                submitCI();
            },
            "No, Go Back": function () {
                $(this).dialog("close");
                $("#submitCI").button("option", "disabled", false);
            }
        }
    });

    $("#acctCode3CI").val("0570");
    $("#acctCode3CI").prop("disabled", true);

    // Get all catalogue items
    $.ajax({
        url: "CatalogItem/getItems.aspx",
        success: function (data) {
            // If successful, put the data in the item select box
            if (data.charAt(0) == "[" && data.charAt(data.length - 1) == "]") {
                data = JSON.parse(data);
                $.each(data, function (index, value) {
                    var option = $("<option value=\"" + value + "\">" + value + "</option>")
                    $(".itemCI").append(option);
                });
            } else {
                $("#ciBody").hide();
                $("#ciError").show().append(document.createTextNode("getItems - " + data));
            }
        },
        error: function (xhr) {
            $("#ciBody").hide();
            $("#ciError").show().append(document.createTextNode("getItems - " + xhr.status + " " + xhr.statusText));
        }
    });

    // If enter key is pressed, try to submit the form
    $("#ci").keyup(function (event) {
        if (event.which == 13) {
            $("#submitCI").click();
        }
    });

    // Check whether all select boxes are valid, to enable or disable submitting
    $("#ciEntries").on("change", ".itemCI", function () {
        validateInput();
    });

    // Make sure quantity box does not go below 1
    $("#ciEntries").on("change", ".numCI", function () {
        if ($(this).val() < 1) {
            $(this).val(1);
        }
    });

    // Trim deliver input
    $("#ciEntries").on("change", ".toCI", function () {
        $(this).val($(this).val().trim());
    });

    // Trim comment input
    $("#ciEntries").on("change", ".commentCI", function () {
        $(this).val($(this).val().trim());
    });

    // Add a new entry to submit
    $("#addRowCI").click(function () {
        // Destroy current spinners so that they do not get stacked when rebuild
        $(".numCI").spinner("destroy");
        // Copy the first entry and append it to the form
        var entry = $("<div class=\"entryCI\" style=\"display: none\">" + $(".entryCI:first").html() + "</div>");
        $("#ciEntries").append(entry);
        $(".entryCI:last").slideDown(250);
        // Rebuild the form
        $(".numCI").spinner({
            min: 1
        });
        $("#removeRowCI").button("option", "disabled", false);
        $("#submitCI").button("option", "disabled", true);
    });

    // Remove the last entry
    $("#removeRowCI").click(function () {
        // Disable this option if there will be only 1 entry left after remove
        if ($(".entryCI").length == 2) {
            $("#removeRowCI").button("option", "disabled", true);
        }
        $(".entryCI:last").slideUp(250, function () {
            $(this).remove();
        });
    });

    // Trim input and make red if it's not a number
    $("#keyCodeCI").change(function () {
        $(this).val($(this).val().trim());
        if (isNaN($(this).val())) {
            $(this).css("background-color", "#FA5858");
        } else {
            $(this).removeAttr("style");
        }
    });

    $("#keyCodeCI").keyup(function () {
        if (isNaN($(this).val())) {
            keyCodeValid = false;
        } else {
            keyCodeValid = true;
        }
    });

    // Trim input and make red if it's not a number or the length is not 4
    $(".acct4Digit").change(function () {
        $(this).val($(this).val().trim());
        if (isAcctValid(this, 4)) {
            $(this).removeAttr("style");
        } else {
            $(this).css("background-color", "#FA5858");
        }
    });

    // Tab to the next field once the length reaches 4
    $(".acct4Digit").keyup(function () {
        if ($(this).val().length == 4) {
            $(this).next("input").focus();
        }
    });

    // Trim input and make red if it's not a number or the length is not 3
    $(".acct3Digit").change(function () {
        $(this).val($(this).val().trim());
        if (isAcctValid(this, 3)) {
            $(this).removeAttr("style");
        } else {
            $(this).css("background-color", "#FA5858");
        }
    });

    // Tab to the next field once the length reaches 3
    $(".acct3Digit").keyup(function () {
        if ($(this).val().length == 3) {
            $(this).next("input").focus();
        }
    });

    // Trim input and make red if it's not a number or the length is not 2
    $(".acct2Digit").change(function () {
        $(this).val($(this).val().trim());
        if (isAcctValid(this, 2)) {
            $(this).removeAttr("style");
        } else {
            $(this).css("background-color", "#FA5858");
        }
    });

    // Tab to the next field once the length reaches 2
    $(".acct2Digit").keyup(function () {
        if ($(this).val().length == 2) {
            $(this).next("input").next("input").focus();
        }
    });

    // Set whether the whole account code is valid or not
    $(".acctCode").keyup(function () {
        if (isAcctAllGood() || isAcctAllEmpty()) {
            accountCodeValid = true;
        } else {
            accountCodeValid = false;
        }
    });

    $(".input").keyup(function () {
        validateInput();
    })

    // Put up confirmation box
    $("#submitCI").click(function () {
        $(this).button("option", "disabled", true);
        $("#confirmCI").dialog("open");
    });

    // Submit all entries to be processed
    function submitCI() {
        // Run the request process for every entry
        var requestIds = "";
        var error = false;
        $(".entryCI").each(function (index) {
            var item = $(".itemCI:eq(" + index + ")").val();
            var num = $(".numCI:eq(" + index + ")").val();
            var to = $(".toCI:eq(" + index + ")").val();
            var comment = $(".commentCI:eq(" + index + ")").val();
            var keyCode = $("#keyCodeCI").val();
            var acctCode = "";
            if (!isAcctAllEmpty()) {
                acctCode = $("#acctCode1CI").val() + " " + $("#acctCode2CI").val() + " " +
                        $("#acctCode3CI").val() + " " + $("#acctCode4CI").val() + " " +
                        $("#acctCode5CI").val() + " " + $("#acctCode6CI").val();
            }
            var entry = { item: item, num: num, to: to, comment: comment, keyCode: keyCode, acctCode: acctCode };
            $.ajax({
                url: "CatalogItem/recordCI.aspx",
                method: "POST",
                data: entry,
                async: false,
                success: function (result) {
                    console.log(result);
                    // If any entry errors, display the error and stop
                    var results = result.split("\n");
                    if (results.length != 3) {
                        $("#ciBody").hide();
                        $("#ciError").show().append(document.createTextNode("submitCI - " + result));
                        error = true;
                    }
                    var reqId = results[0].split(":")[1];
                    if (reqId == "" || results[1].charAt(0) != "1") {
                        $("#ciBody").hide();
                        $("#ciError").show().append(document.createTextNode("submitCI - Request processed incorrectly"));
                        error = true;
                    }
                    requestIds += " " + reqId + ",";
                },
                error: function (xhr) {
                    $("#ciBody").hide();
                    $("#ciError").show().append(document.createTextNode("submitCI - " + xhr.status + " " + xhr.statusText));
                    error = true;
                }
            });
            if (error) {
                return false;
            }
        });

        // Remove all extra entries and blank all fields
        requestIds = requestIds.slice(0, -1);
        var entryNum = $(".entryCI").length;
        while (entryNum > 1) {
            $(".entryCI:last").remove();
            entryNum -= 1;
        }
        $(".itemCI").val("none");
        $(".numCI").val(1);
        $(".toCI").val("");
        $(".comment").val("");
        $("#keyCodeCI").val("");
        $("#acctCode1CI").val("");
        $("#acctCode2CI").val("");
        $("#acctCode4CI").val("");
        $("#acctCode5CI").val("");
        $("#acctCode6CI").val("");
        // Put up confirmation message if no error
        if (!error) {
            var alertMsg = "<div class=\"alert alert-success\" role=\"alert\" id=\"alertSuccess\">";
            alertMsg += "<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>";
            alertMsg += "Request Submitted Successfully! Your Request IDs are:<b>" + requestIds + "</b></div>";
            var alert = $(alertMsg);
            alert.prependTo("#ci");
            $("#alertSuccess").alert();
        }
    }

    // Checks all relevant input fields for validity
    function validateInput() {
        if (!keyCodeValid || !accountCodeValid || ($("#keyCodeCI").val() == "" && isAcctAllEmpty()) || !itemValid()) {
            $("#submitCI").button("option", "disabled", true);
        } else {
            $("#submitCI").button("option", "disabled", false);
        }
    }

    // Check whether the given account code field is valid
    function isAcctValid(field, num) {
        return !isNaN($(field).val()) && ($(field).val().length == num || $(field).val() == "");
    }

    // Check that all account fields have all correct numbers
    function isAcctAllGood() {
        return isAcctGood("#acctCode1CI", 4) && isAcctGood("#acctCode2CI", 2) && isAcctGood("#acctCode4CI", 3) &&
                isAcctGood("#acctCode5CI", 4) && isAcctGood("#acctCode6CI", 4);
    }

    // Check that the given account field has the given number of numbers in it
    function isAcctGood(field, num) {
        return !isNaN($(field).val()) && $(field).val().length == num;
    }

    // Check if all account fields are empty
    function isAcctAllEmpty() {
        return $("#acctCode1CI").val() == "" && $("#acctCode2CI").val() == "" && $("#acctCode4CI").val() == "" &&
                $("#acctCode5CI").val() == "" && $("#acctCode6CI").val() == "";
    }

    // Validate item section
    function itemValid() {
        var allValid = true;
        $(".itemCI").each(function (index, value) {
            if ($(this).val() == "none") {
                allValid = false;
            }
        });
        return allValid;
    }
});