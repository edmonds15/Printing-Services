$(function () {
    var schoolInfo = [];
    var keyCodeValid = true;
    var accountCodeValid = true;

    $("#letterError").hide();

    // Fix the width to be inside the tab
    $("#letter").css("width", "" + $("#ui-id-6").width() + "px");
    $(window).resize(function () {
        $("#letter").css("width", "" + $("#ui-id-6").width() + "px");
    });

    $("button").button();
    $("#removeNameLetter").button("option", "disabled", true);
    $("#submitLetter").button("option", "disabled", true);
    $("#confirmLetter").dialog({
        autoOpen: false,
        resizable: false,
        modal: true,
        buttons: {
            "Yes, Submit": function () {
                $(this).dialog("close");
                submitLetter();
            },
            "No, Go Back": function () {
                $(this).dialog("close");
                $("#submitLetter").button("option", "disabled", false);
            }
        }
    });

    $("#acctCode3Letter").val("0570");
    $("#acctCode3Letter").prop("disabled", true);

    // Get School info
    $.ajax({
        url: "Letterhead/getSchools.aspx",
        success: function (data) {
            if (data.charAt(0) == "[" && data.charAt(data.length - 1) == "]") {
                schoolInfo = JSON.parse(data);
                $.each(schoolInfo, function (index, value) {
                    var option = $("<option value=\"" + index + "\">" + value.name + "</option>")
                    $("#schoolLetter").append(option);
                });
            } else {
                $("#letterBody").hide();
                $("#letterError").show().append(document.createTextNode("getSchools - " + data));
            }
        },
        error: function (xhr) {
            $("#letterBody").hide();
            $("#letterError").show().append(document.createTextNode("getSchools - " + xhr.status + " " + xhr.statusText));
        }
    });

    $("#schoolLetter").change(function () {
        if ($("#schoolLetter").val() != "none") {
            var school = schoolInfo[$("#schoolLetter").val()];
            $("#addressLetter").val(school["address"]).prop("disabled", school["address"] != "");
            $("#phoneLetter").val(school["phone"]).prop("disabled", school["phone"] != "");
            $("#faxLetter").val(school["fax"]).prop("disabled", school["fax"] != "");
        } else {
            $("#addressLetter").val("").prop("disabled", false);
            $("#phoneLetter").val("").prop("disabled", false);
            $("#faxLetter").val("").prop("disabled", false);
        }
        $("#submitLetter").button("option", "disabled", !allValid());
    });

    // Trim input and make red if it's not a number
    $("#keyCodeLetter").change(function () {
        $(this).val($(this).val().trim());
        if (isNaN($(this).val())) {
            $(this).css("background-color", "#FA5858");
        } else {
            $(this).removeAttr("style");
        }
    });

    $("#keyCodeLetter").keyup(function () {
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

    // Add a new name
    $("#addNameLetter").click(function () {
        if ($(".entryLetter").length == 3) {
            $("#addNameLetter").button("option", "disabled", true);
        }
        // Copy the first entry and append it to the form
        var entry = $("<div class=\"entryLetter\" style=\"display: none\">" + $(".entryLetter:first").html() + "</div>");
        $("#letterEntries").append(entry);
        $(".entryLetter:last").slideDown(250);
        $("#removeNameLetter").button("option", "disabled", false);
        if ($(".letterEntries").length == 4) {
            $("#addNameLetter").button("option", "disabled", true);
        }
        $("#submitLetter").button("option", "disabled", !allValid());
    });

    // Remove the last entry
    $("#removeNameLetter").click(function () {
        // Disable this option if there will be only 1 entry left after remove
        if ($(".entryLetter").length == 2) {
            $("#removeNameLetter").button("option", "disabled", true);
        }
        $(".entryLetter:last").slideUp(250, function () {
            $(this).remove();
        });
        $("#addNameLetter").button("option", "disabled", false);
        $("#submitLetter").button("option", "disabled", !allValid());
    });

    $("input").keyup(function () {
        $("#submitLetter").button("option", "disabled", !allValid());
    })

    $("#letterEntries").on("keyup", ".input", function () {
        $("#submitLetter").button("option", "disabled", !allValid());
    });

    $("#submitLetter").click(function () {
        $(this).button("option", "disabled", true);
        $("#confirmLetter").dialog("open");
    });

    function submitLetter() {
        // Pull info from fields
        var school = schoolInfo[$("#schoolLetter").val()].name;
        var address = $("#addressLetter").val();
        var phone = $("#phoneLetter").val();
        var fax = $("#faxLetter").val();
        var names = "";
        for (var i = 0; i < $(".entryLetter").length - 1; i++) {
            if ($(".nameLetter:eq(" + i + ")").val() != undefined || $(".nameLetter:eq(" + i + ")").val() != "") {
                names += $(".nameLetter:eq(" + i + ")").val().replace(",", "") + ", " + $(".titleLetter:eq(" + i + ")").val().replace(",", "") + ", ";
            }
        }
        if ($(".nameLetter:last").val() != undefined && $(".nameLetter:last").val() != "") {
            names += $(".nameLetter:last").val() + ", " + $(".titleLetter:last").val();
        }
        var keyCode = $("#keyCodeLetter").val();
        var acctCode = "";
        if (!isAcctAllEmpty()) {
            acctCode = $("#acctCode1Letter").val() + " " + $("#acctCode2Letter").val() + " " +
                    $("#acctCode3Letter").val() + " " + $("#acctCode4Letter").val() + " " +
                    $("#acctCode5Letter").val() + " " + $("#acctCode6Letter").val();
        }
        var submit = {
            school: school,
            address: address,
            phone: phone,
            fax: fax,
            names: names,
            keyCode: keyCode,
            acctCode: acctCode
        };
        // Send it to the server
        $.ajax({
            url: "Letterhead/recordLetter.aspx",
            method: "POST",
            data: submit,
            success: function (result) {
                console.log(result);
                // Should have 2 lines: request id and number of rows written
                var results = result.split("\n");
                if (results.length != 2) {
                    $("#LetterBody").hide();
                    $("#LetterError").show().append(document.createTextNode("submitLetter - " + result));
                    return;
                }
                var reqId = results[0].split(":")[1];
                if (reqId == "0" || results[1].charAt(0) != "1") {
                    $("#LetterBody").hide();
                    $("#LetterError").show().append(document.createTextNode("submitLetter - Request processed incorrectly."));
                    return;
                }
                var alertMsg = "<div class=\"alert alert-success\" role=\"alert\" id=\"alertSuccess\">";
                alertMsg += "<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>";
                alertMsg += "Request Submitted Successfully! Your Request ID is: <b>" + reqId + "</b></div>";
                var alert = $(alertMsg);
                alert.prependTo("#letter");
                $("#alertSuccess").alert();
            },
            error: function (xhr) {
                $("#letterBody").hide();
                $("#letterError").show().append(document.createTextNode("submitLetter - " + xhr.status + " " + xhr.statusText));
            }
        });
        // Reset all values to default
        $("#schoolLetter").val("none");
        $("#addressLetter").val("").prop("disabled", false);
        $("#phoneLetter").val("").prop("disabled", false);
        $("#faxLetter").val("").prop("disabled", false);
        var entryNum = $(".entryLetter").length;
        while (entryNum > 1) {
            $(".entryLetter:last").remove();
            entryNum -= 1;
        }
        $(".nameLetter").val("");
        $(".titleLetter").val("");
        $("#keyCodeLetter").val("");
        $("#acctCode1Letter").val("");
        $("#acctCode2Letter").val("");
        $("#acctCode4Letter").val("");
        $("#acctCode5Letter").val("");
        $("#acctCode6Letter").val("");
        $("#submitLetter").button("option", "disabled", true);
    }

    function allValid() {
        var result = $("#schoolLetter").val() != "none" && $("#addressLetter").val() != "" && $("#phoneLetter").val() != "" &&
            $("#faxLetter").val() != "" && namesValid() && keyCodeValid && accountCodeValid && !($("#keyCodeLetter").val() == "" && isAcctAllEmpty());
        console.log(result);
        return result;
    }

    function namesValid() {
        var valid = true;
        $(".entryLetter").each(function (index) {
            if ($(".nameLetter:eq(" + index + ")").val() == "" && $(".titleLetter:eq(" + index + ")").val() != "" ||
                $(".nameLetter:eq(" + index + ")").val() != "" && $(".titleLetter:eq(" + index + ")").val() == "") {
                valid = false;
            }
            return valid;
        });
        return valid;
    }

    // Check whether the given account code field is valid
    function isAcctValid(field, num) {
        return !isNaN($(field).val()) && ($(field).val().length == num || $(field).val() == "");
    }

    // Check that all account fields have all correct numbers
    function isAcctAllGood() {
        return isAcctGood("#acctCode1Letter", 4) && isAcctGood("#acctCode2Letter", 2) && isAcctGood("#acctCode4Letter", 3) &&
                isAcctGood("#acctCode5Letter", 4) && isAcctGood("#acctCode6Letter", 4);
    }

    // Check that the given account field has the given number of numbers in it
    function isAcctGood(field, num) {
        return !isNaN($(field).val()) && $(field).val().length == num;
    }

    // Check if all account fields are empty
    function isAcctAllEmpty() {
        return $("#acctCode1Letter").val() == "" && $("#acctCode2Letter").val() == "" && $("#acctCode4Letter").val() == "" &&
                $("#acctCode5Letter").val() == "" && $("#acctCode6Letter").val() == "";
    }
});