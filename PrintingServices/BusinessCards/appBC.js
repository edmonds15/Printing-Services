$(function () {
    var keyCodeValid = true;
    var accountCodeValid = true;

    $("#bcError").hide();

    // Fix the width to be inside the tab
    $("#bc").css("width", "" + $("#ui-id-4").width() + "px");
    $(window).resize(function () {
        $("#bc").css("width", "" + $("#ui-id-4").width() + "px");
    });

    // Setup JQueryUI controls
    $("#numBC").spinner({
        min: 1,
        max: 2,
        stop: function () {
            calculatePrice();
        }
    });
    $("button").button();
    $("#removePhone").button("option", "disabled", true);
    $("#submitBC").button("option", "disabled", true);
    $("#confirmBC").dialog({
        autoOpen: false,
        resizable: false,
        modal: true,
        buttons: {
            "Yes, Submit": function () {
                $(this).dialog("close");
                submitBC();
            },
            "No, Go Back": function () {
                $(this).dialog("close");
                $("#submitBC").button("option", "disabled", false);
            }
        }
    });
    $("#acctCode3BC").val("0570");
    $("#acctCode3BC").prop("disabled", true);

    // If enter key is pressed, try to submit
    $("#bc").keyup(function (event) {
        if (event.which == 13) {
            $("#submitBC").click();
        }
    });

    // Trim name input
    $("#name").change(function () {
        $(this).val($(this).val().trim());
    });

    // Trim title input
    $("#title").change(function () {
        $(this).val($(this).val().trim());
    });

    // Trim email input
    $("#email").change(function () {
        $(this).val($(this).val().trim());
    })

    // Trim all phone input
    $("#phoneEntries").on("change", ".phoneNum", function () {
        $(this).val($(this).val().trim());
    })

    // Add a phone number to the list by copying the first entry and appending it
    $("#addPhone").click(function () {
        var entry = $("<span class=\"phoneEntry\">" + $(".phoneEntry:first").html() + "</span>");
        entry.appendTo($("#phoneEntries"));
        $("#removePhone").button("option", "disabled", false);
    });

    // Remove the latest phone number from the list
    $("#removePhone").click(function () {
        if ($(".phoneEntry").length == 2) {
            $("#removePhone").button("option", "disabled", true);
        }
        $(".phoneEntry:last").remove();
    });

    $("#numBC").change(function () {
        if ($(this).val() < 1 || isNaN($(this).val())) {
            $(this).val(1);
        }
        if ($(this).val() > 2) {
            $(this).val(2);
        }
        calculatePrice();
    })

    $(".priceChange").change(function () {
        calculatePrice()
    });

    // Trim input and make red if it's not a number
    $("#keyCodeBC").change(function () {
        $(this).val($(this).val().trim());
        if (isNaN($(this).val())) {
            $(this).css("background-color", "#FA5858");
        } else {
            $(this).removeAttr("style");
        }
    });

    $("#keyCodeBC").keyup(function () {
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

    // Trim deliver input
    $("#toBC").change(function () {
        $(this).val($(this).val().trim());
    });

    // Validate the input after every keypress
    $("input").keyup(function () {
        validateInput();
    });

    // Trim comments input
    $("#commentsBC").change(function () {
        $(this).val($(this).val().trim());
    });

    // Put up confirmation box
    $("#submitBC").click(function () {
        $(this).button("option", "disabled", true);
        $("#confirmBC").dialog("open");
    });

    // Submit the form to the server
    function submitBC() {
        // Pull info from fields
        var name = $("#name").val();
        var title = $("#title").val();
        var email = $("#email").val();
        var phone = "";
        for (var i = 0; i < $(".phoneEntry").length - 1; i++) {
            phone += $(".phoneNum:eq(" + i + ")").val().replace(",", "") + ", " + $(".phoneType:eq(" + i + ")").val().replace(",", "") + ", ";
        }
        phone += $(".phoneNum:last").val() + ", " + $(".phoneType:last").val();
        var num = $("#numBC").val();
        var finish = $("#finish").val();
        var side = $("#side").val();
        var keyCode = $("#keyCodeBC").val();
        var acctCode = "";
        if (!isAcctAllEmpty()) {
            acctCode = $("#acctCode1BC").val() + " " + $("#acctCode2BC").val() + " " +
                    $("#acctCode3BC").val() + " " + $("#acctCode4BC").val() + " " +
                    $("#acctCode5BC").val() + " " + $("#acctCode6BC").val();
        }
        var to = $("#toBC").val();
        var comments = $("#commentsBC").val();
        var submit = {
            name: name,
            title: title,
            email: email,
            phone: phone,
            num: num,
            finish: finish,
            side: side,
            keyCode: keyCode,
            acctCode: acctCode,
            to: to,
            comments: comments
        };
        console.log(submit);
        // Send it to the server
        $.ajax({
            url: "BusinessCards/recordBC.aspx",
            method: "POST",
            data: submit,
            success: function (result) {
                console.log(result);
                // Should have 2 lines: request id and number of rows written
                var results = result.split("\n");
                if (results.length != 2) {
                    $("#bcBody").hide();
                    $("#bcError").show().append(document.createTextNode("submitBC - " + result));
                    return;
                }
                var reqId = results[0].split(":")[1];
                if (reqId == "0" || results[1].charAt(0) != "1") {
                    $("#bcBody").hide();
                    $("#bcError").show().append(document.createTextNode("submitBC - Request processed incorrectly."));
                    return;
                }
                var alertMsg = "<div class=\"alert alert-success\" role=\"alert\" id=\"alertSuccess\">";
                alertMsg += "<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>";
                alertMsg += "Request Submitted Successfully! Your Request ID is: <b>" + reqId + "</b></div>";
                var alert = $(alertMsg);
                alert.prependTo("#bc");
                $("#alertSuccess").alert();
            },
            error: function (xhr) {
                $("#bcBody").hide();
                $("#bcError").show().append(document.createTextNode("submitBC - " + xhr.status + " " + xhr.statusText));
            }
        });
        // Reset all values to default
        $("#name").val("");
        $("#title").val("");
        $("#email").val("");
        // Remove all extra phone numbers
        var numPhone = $(".phoneEntry").length;
        while (numPhone > 1) {
            $(".phoneEntry:last").remove();
            numPhone--;
        }
        $(".phoneType").val("work");
        $(".phoneNum").val("");
        $("#numBC").val(1);
        $("#finish").val("matte");
        $("#keyCodeBC").val("");
        $("#acctCode1BC").val("");
        $("#acctCode2BC").val("");
        $("#acctCode4BC").val("");
        $("#acctCode5BC").val("");
        $("#acctCode6BC").val("");
        $("#toBC").val("");
        $("#commentsBC").val("");
        $("#submitBC").button("option", "disabled", true);
    }

    // Calculate the price of the request
    function calculatePrice() {
        var num = $("#numBC").val();
        var finish = $("#finish").val();
        var side = $("#side").val();
        var base = 7.5;
        var multiplier = 1;

        if (side == "single") {
            multiplier = 5.5;
        } else {
            multiplier = 8.5
        }
        var price = Number(base + (num * multiplier)).toFixed(2);
        if (isNaN(price) || num < 1 || num > 2) {
            price = "???";
        }
        $("#price").html("<b>Price: $" + price + "</b>");
    }

    // Checks all relevant input fields for validity
    function validateInput() {
        if (!keyCodeValid || !accountCodeValid || ($("#keyCodeBC").val() == "" && isAcctAllEmpty()) ||
                    $("#name").val() == "" || $("#title").val() == "" || $("#email").val() == "" ||
                    $(".phoneNum:first").val() == "") {
            $("#submitBC").button("option", "disabled", true);
        } else {
            $("#submitBC").button("option", "disabled", false);
        }
    }

    // Check whether the given account code field is valid
    function isAcctValid(field, num) {
        return !isNaN($(field).val()) && ($(field).val().length == num || $(field).val() == "");
    }

    // Check that all account fields have all correct numbers
    function isAcctAllGood() {
        return isAcctGood("#acctCode1BC", 4) && isAcctGood("#acctCode2BC", 2) && isAcctGood("#acctCode4BC", 3) &&
                isAcctGood("#acctCode5BC", 4) && isAcctGood("#acctCode6BC", 4);
    }

    // Check that the given account field has the given number of numbers in it
    function isAcctGood(field, num) {
        return !isNaN($(field).val()) && $(field).val().length == num;
    }

    // Check if all account fields are empty
    function isAcctAllEmpty() {
        return $("#acctCode1BC").val() == "" && $("#acctCode2BC").val() == "" && $("#acctCode4BC").val() == "" &&
                $("#acctCode5BC").val() == "" && $("#acctCode6BC").val() == "";
    }
});