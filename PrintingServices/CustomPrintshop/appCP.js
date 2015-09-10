$(function () {
    var keyCodeValid = true;
    var accountCodeValid = true;
    var badBrowser = false;

    $("#cpError").hide();

    $("#cp").css("width", "" + $("#ui-id-6").width() + "px");
    $(window).resize(function () {
        $("#cp").css("width", "" + $("#ui-id-6").width() + "px");
    });

    $("button").button();
    $("#submitCP").button("option", "disabled", true);
    $("#fulfill").datepicker({
        dateFormat: "m/d/yy",
        minDate: 3,
        showAnim: "fadeIn"
    });

    if (document.all && !window.atob) {
        var msg = $("<div id=\"oldIE\"><b>Alert:</b> You appear to be using Internet Explorer version 9 or below. Uploading attachments is not supported in this browser. Please upgrade to the latest version <a href=\"http://windows.microsoft.com/en-us/internet-explorer/download-ie\">here</a> to send an attachment.</div>");
        $("#cp").prepend(msg);
        $("#attach").prop("disabled", true);
        badBrowser = true;
    }

    $("#cp").keyup(function (event) {
        if (event.which == 13) {
            $("#submitCP").click();
        }
    });

    $("#keyCode").change(function () {
        $(this).val($(this).val().trim());
        if (isNaN($(this).val())) {
            $(this).css("background-color", "#FA5858");
            keyCodeValid = false;
        } else {
            $(this).removeAttr("style");
            keyCodeValid = true;
        }
    });

    $(".acct4Digit").change(function () {
        $(this).val($(this).val().trim());
        if (isAcctValid(this, 4)) {
            $(this).removeAttr("style");
        } else {
            $(this).css("background-color", "#FA5858"); 
        }
    });

    $(".acct4Digit").keyup(function () {
        if ($(this).val().length == 4) {
            $(this).next("input").focus();
        }
    });

    $(".acct3Digit").change(function () {
        $(this).val($(this).val().trim());
        if (isAcctValid(this, 3)) {
            $(this).removeAttr("style");
        } else {
            $(this).css("background-color", "#FA5858");
        }
    });

    $(".acct3Digit").keyup(function () {
        if ($(this).val().length == 3) {
            $(this).next("input").focus();
        }
    });

    $(".acct2Digit").change(function () {
        $(this).val($(this).val().trim());
        if (isAcctValid(this, 2)) {
            $(this).removeAttr("style");
        } else {
            $(this).css("background-color", "#FA5858");
        }
    });

    $(".acct2Digit").keyup(function () {
        if ($(this).val().length == 2) {
            $(this).next("input").focus();
        }
    });

    $(".acctCode").keyup(function () {
        if (isAcctAllGood() || isAcctAllEmpty()) {
            accountCodeValid = true;
        } else {
            accountCodeValid = false;
        }
    });

    $(".input").keyup(function () {
        validateInput();
    });

    $("#submitCP").click(function () {
        $(this).button("option", "disabled", true);
        if (!badBrowser) {
            var data = new FormData();
            data.append("desc", $("#desc").val());
            data.append("fulfill", $("#fulfill").val());
            var numFiles = $("#attach")[0].files.length;
            for (var i = 0; i < $("#attach")[0].files.length; i++) {
                data.append("file" + i, $("#attach")[0].files[i]);
            }
            if ($("#keyCode").val() != undefined || $("#keyCode").val() != "") {
                data.append("keyCode", $("#keyCode").val());
            }
            var acctCode = $("#acctCode1").val() + " " + $("#acctCode2").val() + " " + $("#acctCode3").val() +
                     " " + $("#acctCode4").val() + " " + $("#acctCode5").val() + " " + $("#acctCode6").val();
            if (acctCode != "     ") {
                data.append("acctCode", acctCode);
            }
            data.append("instruct", $("#instruct").val());
            $.ajax({
                method: "POST",
                url: "CustomPrintshop/recordCP.aspx",
                data: data,
                processData: false,
                contentType: false,
                success: function (result) {
                    console.log(result);
                    var results = result.split("\n");
                    if (results.length != 3) {
                        $("#cpBody").hide();
                        $("#cpError").show();
                        $("#cpError").append(document.createTextNode(result));
                        return;
                    }
                    var reqId = results[0].split(":")[1];
                    if (reqId == "" || results[1].charAt(0) != "1" || results[2].charAt(0) != numFiles) {
                        $("#cpBody").hide();
                        $("#cpError").show();
                        $("#cpError").append(document.createTextNode("Request processed incorrectly"));
                        return;
                    }
                    var alertMsg = "<div class=\"alert alert-success\" role=\"alert\" id=\"alertSuccess\">";
                    alertMsg += "<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>";
                    alertMsg += "Request Submitted Successfully! Your Request ID is: <b>" + reqId + "</b></div>";
                    var alert = $(alertMsg);
                    alert.prependTo("#cp");
                    $("#alertSuccess").alert();
                }
            });
        } else {
            var desc = $("#desc").val();
            var fulfill = $("#fulfill").val();
            var keyCode = $("#keyCode").val();
            var acctCode = $("#acctCode1").val() + " " + $("#acctCode2").val() + " " + $("#acctCode3").val() +
                     " " + $("#acctCode4").val() + " " + $("#acctCode5").val() + " " + $("#acctCode6").val();
            var instruct = $("#instruct").val();
            var data = { desc: desc, fulfill: fulfill, keyCode: keyCode, acctCode: acctCode, instruct: instruct };
            $.post("CustomPrintshop/recordCP.aspx", data, function (result) {
                console.log(result);
            });
        }
        $("#desc").val("");
        $("#fulfill").val("");
        $("#attach").wrap("<form>").closest("form").get(0).reset();
        $("#attach").unwrap();
        $("#keyCode").val("");
        $("#acctCode1").val("");
        $("#acctCode2").val("");
        $("#acctCode3").val("");
        $("#acctCode4").val("");
        $("#acctCode5").val("");
        $("#acctCode6").val("");
        $("#instruct").val("");
    });

    function validateInput() {
        if (!keyCodeValid || !accountCodeValid || ($("#keyCode").val() == "" && isAcctAllEmpty()) || $("#desc").val() == "" || $("#instruct").val() == "") {
            $("#submitCP").button("option", "disabled", true);
        } else {
            $("#submitCP").button("option", "disabled", false);
        }
    }

    function isAcctValid(field, num) {
        return !isNaN($(field).val()) && ($(field).val().length == num || $(field).val() == "");
    }

    function isAcctAllGood() {
        return isAcctGood("#acctCode1", 4) && isAcctGood("#acctCode2", 2) && isAcctGood("#acctCode3", 4) &&
            isAcctGood("#acctCode4", 3) && isAcctGood("#acctCode5", 4) && isAcctGood("#acctCode6", 4);
    }

    function isAcctGood(field, num) {
        return !isNaN($(field).val()) && $(field).val().length == num;
    }

    function isAcctAllEmpty() {
        return $("#acctCode1").val() == "" && $("#acctCode2").val() == "" && $("#acctCode3").val() == "" &&
            $("#acctCode4").val() == "" && $("#acctCode5").val() == "" && $("#acctCode6").val() == "";
    }
});