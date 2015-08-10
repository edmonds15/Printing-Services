$(function () {
    var keyCodeValid = true;
    var accountCodeValid = true;

    $("#cp").css("width", "" + $("#ui-id-8").width() + "px");
    $("#instruct").css("max-width", "" + $("#ui-id-8").width() + "px");

    $(window).resize(function () {
        $("#cp").css("width", "" + $("#ui-id-8").width() + "px");
        $("#instruct").css("max-width", "" + $("#ui-id-8").width() + "px");
    });

    $("button").button();
    $("#submitCP").button("option", "disabled", true);
    $("#fulfill").datepicker({
        dateFormat: "m/d/yy",
        minDate: 0,
        showAnim: "fadeIn"
    });

    if (document.all && !window.atob) {
        var msg = $("<div id=\"oldIE\"><b>Alert:</b> You appear to be using Internet Explorer version 9 or below. Uploading attachments is not supported in this browser. Please upgrade to the latest version <a href=\"http://windows.microsoft.com/en-us/internet-explorer/download-ie\">here</a> to send an attachment.</div>");
        $("#cp").prepend(msg);
        $("#attach").prop("disabled", true);
    }

    $("#attach").change(function () {
        $.each($(this)[0].files, function (index, value) {
            console.log(value.name);
        });
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

    $(".acct3Digit").change(function () {
        $(this).val($(this).val().trim());
        if (isAcctValid(this, 3)) {
            $(this).removeAttr("style");
        } else {
            $(this).css("background-color", "#FA5858");
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

    $(".acctCode").change(function () {
        if (isAcctAllGood() || isAcctAllEmpty()) {
            accountCodeValid = true;
        } else {
            accountCodeValid = false;
        }
    });

    $("input").change(function () {
        validateInput();
    });

    $("#submitCP").click(function () {
        $(this).button("option", "disabled", true);
        var alert = $("<div class=\"alert alert-success\" role=\"alert\" id=\"alertSuccess\">Request Submitted Successfully!</div>");
        alert.prependTo("#cp");
        $("#alertSuccess").alert();
        window.setTimeout(function () {
            $("#alertSuccess").slideUp(250, function () {
                $(this).remove();
            });
            $("#submitCP").button("option", "disabled", false);
        }, 3000);
    });

    function validateInput() {
        if (!keyCodeValid || !accountCodeValid || ($("#keyCode").val() == "" && isAcctAllEmpty())) {
            $("#submitCP").button("option", "disabled", true);
        } else {
            $("#submitCP").button("option", "disabled", false);
        }
    }

    function isAcctValid(field, num) {
        return !isNaN($(field).val()) && ($(field).val().length == num || $(field).val() == "");
    }

    function isKeyCodeValid() {
        return !isNaN($("#keyCode").val()) && $("#keyCode").val()
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