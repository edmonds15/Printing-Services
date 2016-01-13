$(function () {
    var keyCodeValid = true;
    var accountCodeValid = true;
    var badBrowser = false;

    $("#cpError").hide();
    $("#instructError").hide();

    // Fix the width to be inside the tab
    $("#cp").css("width", "" + $("#ui-id-8").width() + "px");
    $(window).resize(function () {
        $("#cp").css("width", "" + $("#ui-id-8").width() + "px");
    });

    // Set up JQueryUI controls
    $("button").button();
    $("#submitCP").button("option", "disabled", true);
    $("#fulfill").datepicker({
        dateFormat: "m/d/yy",
        minDate: 3,
        showAnim: "fadeIn"
    });

    $("#numCP").spinner({
        min: 1
    });

    $("#confirmCP").dialog({
        autoOpen: false,
        resizable: false,
        modal: true,
        buttons: {
            "Yes, Submit": function () {
                $(this).dialog("close");
                submitCP();
            },
            "No, Go Back": function () {
                $(this).dialog("close");
                $("#submitCP").button("option", "disabled", false);
            }
        }
    });

    $("#acctCode3CP").val("0570");
    $("#acctCode3CP").prop("disabled", true);

    // If browser has the capabilities of IE9 or below, alert user and disable attachments
    if (document.all && !window.atob) {
        var msg = "<div id=\"oldIE\"><b>Alert:</b> You appear to be using Internet Explorer ";
        msg += "version 9 or below. Uploading attachments is not supported in this browser. ";
        msg += "Upgrade to the latest version ";
        msg += "<a href=\"http://windows.microsoft.com/en-us/internet-explorer/download-ie\">here</a> ";
        msg += "or switch browsers to send attachments.<br />"
        msg += "If you believe this message is in error, contact Technology for assistance.</div>";
        var alert = $(msg);
        $("#cp").prepend(alert);
        $("#attach").prop("disabled", true);
        badBrowser = true;
    }

    // If Enter is pressed, try to submit
    $(".sub").keyup(function (event) {
        if (event.which == 13) {
            console.log($(this).attr("id"));
            $("#submitCP").click();
        }
    });

    // Trim input and make red if it's not a number
    $("#keyCodeCP").change(function () {
        $(this).val($(this).val().trim());
        if (isNaN($(this).val())) {
            $(this).css("background-color", "#FA5858");
        } else {
            $(this).removeAttr("style");
        }
    });

    $("#keyCodeCP").keyup(function () {
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

    // Show the error if instruct length is too long
    $("#instruct").keyup(function () {
        if ($(this).val().length > 65535) {
            $("#instructError").show();
        } else {
            $("#instructError").hide();
        }
    });

    // Validate the input after every keypress
    $(".input").keyup(function () {
        validateInput();
    });

    // Put up confirmation box
    $("#submitCP").click(function () {
        $(this).button("option", "disabled", true);
        $("#confirmCP").dialog("open");
    });

    // Submit the request to the server
    function submitCP() {
        // Two different submit methods depending on whether their browser is IE9- or not
        if (!badBrowser) {
            // If newer browser, use the FormData object to include files and submit to server
            var data = new FormData();
            data.append("desc", $("#desc").val());
            data.append("to", $("#toCP").val());
            data.append("fulfill", $("#fulfill").val());
            var numFiles = $("#attach")[0].files.length;
            for (var i = 0; i < $("#attach")[0].files.length; i++) {
                data.append("file" + i, $("#attach")[0].files[i]);
            }
            data.append("keyCode", $("#keyCodeCP").val());
            var acctCode = "";
            if (!isAcctAllEmpty()) {
                acctCode = $("#acctCode1CP").val() + " " + $("#acctCode2CP").val() + " " +
                        $("#acctCode3CP").val() + " " + $("#acctCode4CP").val() + " " +
                        $("#acctCode5CP").val() + " " + $("#acctCode6CP").val();
            }
            data.append("acctCode", acctCode);
            data.append("type", $("#type").val());
            data.append("num", $("#numCP").val());
            data.append("sideCP", $("#sideCP").val());
            //data.append("side", $("#side").val());
            data.append("instruct", $("#instruct").val().replace("\n", "  "));
            var itr = data.entries();
            console.log(itr.next());
            $.ajax({
                method: "POST",
                url: "CustomPrintshop/recordCP.aspx",
                data: data,
                processData: false,
                contentType: false,
                success: function (result) {
                    validateResult(result, numFiles);
                },
                error: function (xhr) {
                    showError(xhr);
                }
            });
        } else {
            // If older browser, use standard submission without files
            var desc = $("#desc").val();
            var to = $("#toCP").val();
            var fulfill = $("#fulfill").val();
            var keyCode = $("#keyCodeCP").val();
            var acctCode = "";
            if (!isAcctAllEmpty()) {
                acctCode = $("#acctCode1CP").val() + " " + $("#acctCode2CP").val() + " " +
                        $("#acctCode3CP").val() + " " + $("#acctCode4CP").val() + " " +
                        $("#acctCode5CP").val() + " " + $("#acctCode6CP").val();
            }
            var type = $("#type").val();
            var num = $("#numCP").val();
            //var side = $("#side").val();
            var sideCP = $("#sideCP").val();
            var instruct = $("#instruct").val().replace("\n", "  ");
            var data = {
                desc: desc,
                to: to,
                fulfill: fulfill,
                keyCode: keyCode,
                acctCode: acctCode,
                type: type,
                num: num,
                sideCP: sideCP,
                instruct: instruct
            };
            $.ajax({
                url: "CustomPrintshop/recordCP.aspx",
                method: "POST",
                data: data,
                success: function (result) {
                    validateResult(result, 0);
                },
                error: function (xhr) {
                    showError(xhr);
                }
            });
        }
        // Reset all values to default
        $("#desc").val("");
        $("#fulfill").val("");
        // Reset files by wrapping in form and resetting form.
        $("#attach").wrap("<form>").closest("form").get(0).reset();
        $("#attach").unwrap();
        $("#keyCodeCP").val("");
        $("#acctCode1CP").val("");
        $("#acctCode2CP").val("");
        $("#acctCode4CP").val("");
        $("#acctCode5CP").val("");
        $("#acctCode6CP").val("");
        $("#instruct").val("");
    }

    // Checks all relevant input fields for validity
    function validateInput() {
        if (!keyCodeValid || !accountCodeValid || ($("#keyCodeCP").val() == "" && isAcctAllEmpty()) ||
                    $("#desc").val() == "" || $("#instruct").val() == "" || $("#instruct").val().length > 65535) {
            $("#submitCP").button("option", "disabled", true);
        } else {
            $("#submitCP").button("option", "disabled", false);
        }
    }

    // Check whether the given account code field is valid
    function isAcctValid(field, num) {
        return !isNaN($(field).val()) && ($(field).val().length == num || $(field).val() == "");
    }

    // Check that all account fields have all correct numbers
    function isAcctAllGood() {
        return isAcctGood("#acctCode1CP", 4) && isAcctGood("#acctCode2CP", 2) && isAcctGood("#acctCode4CP", 3) &&
                isAcctGood("#acctCode5CP", 4) && isAcctGood("#acctCode6CP", 4);
    }

    // Check that the given account field has the given number of numbers in it
    function isAcctGood(field, num) {
        return !isNaN($(field).val()) && $(field).val().length == num;
    }

    // Check if all account fields are empty
    function isAcctAllEmpty() {
        return $("#acctCode1CP").val() == "" && $("#acctCode2CP").val() == "" && $("#acctCode4CP").val() == "" &&
                $("#acctCode5CP").val() == "" && $("#acctCode6CP").val() == "";
    }

    // Check the return of the ajax calls to make sure everything got entered correctly
    function validateResult(result, numFiles) {
        console.log(result);
        // Should have 3 rows: request id, lines written in database, and files saved
        var results = result.split("\n");
        if (results.length != 3) {
            $("#cpBody").hide();
            $("#cpError").show().append(document.createTextNode("submitCP - " + result));
            return;
        }
        var reqId = results[0].split(":")[1];
        //var requestdID = reqId.split("_")[0];    // Chris added 20150924     // Jonathan changed back 20151221
        if (reqId == "0" || results[1].charAt(0) != "1" || results[2].charAt(0) != numFiles) {
            $("#cpBody").hide();
            $("#cpError").show().append(document.createTextNode("submitCP - Request processed incorrectly"));
            return;
        }
        var alertMsg = "<div class=\"alert alert-success\" role=\"alert\" id=\"alertSuccess\">";
        alertMsg += "<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>";
        alertMsg += "Request Submitted Successfully! Your Request ID is: <b>" + reqId + "</b></div>";      // Chris commented out 20150924      // Jonathan changed back 20151221
        //alertMsg += "Request Submitted Successfully! Your Request ID is: <b>" + requestdID + "</b></div>";   // Chris added to fix this Success Message: "Request Submitted Successfully! Your Request ID is:  9696_New Account Info.txtRequest ID"  to only show 9696      // Jonathan changed back 20151221
        var alert = $(alertMsg);
        alert.prependTo("#cp");
        $("#alertSuccess").alert();
    }

    function showError(xhr) {
        $("#cpBody").hide();
        $("#cpError").show().append(document.createTextNode("submitCP - " + xhr.status + " " + xhr.statusText));
    }
});