$(function () {
    var keyCodeValid = true;
    var accountCodeValid = true;

    $("#cp").css("width", "" + $("#ui-id-8").width() + "px");

    $(window).resize(function () {
        $("#cp").css("width", "" + $("#ui-id-8").width() + "px");
    });

    $("button").button();
    $("#fulfill").datepicker({
        dateFormat: "m/d/yy",
        minDate: 0,
        showAnim: "fadeIn"
    });

    if (document.all && !window.atob) {
        var msg = $("<div id=\"oldIe\"><b>Alert:</b> You appear to be using Internet Explorer version 9 or below. Uploading attachments is not supported in this browser. Please upgrade to the latest version <a href=\"http://windows.microsoft.com/en-us/internet-explorer/download-ie\">here</a> to send an attachment.</div>");
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
            accountCodeValid = false;
        }
    });

    $(".acct3Digit").change(function () {
        $(this).val($(this).val().trim());
        if (isAcctValid(this, 3)) {
            $(this).removeAttr("style");
        } else {
            $(this).css("background-color", "#FA5858");
            accountCodeValid = false;
        }
    });

    $(".acct2Digit").change(function () {
        $(this).val($(this).val().trim());
        if (isAcctValid(this, 2)) {
            $(this).removeAttr("style");
        } else {
            $(this).css("background-color", "#FA5858");
            accountCodeValid = false;
        }
    });

    $(".acctCode").change(function () {
        if (isAcctGood("#acctCode1", 4) && isAcctGood("#acctCode2", 2) && isAcctGood("#acctCode3", 4) &&
                isAcctGood("#acctCode4", 3) && isAcctGood("#acctCode5", 4) && isAcctGood("#acctCode6", 4)) {
            accountCodeValid = true;
        }
    });

    $("input").change(function () {
        if (!keyCodeValid || !accountCodeValid) {
            $("#submitCP").prop("disabled", true).css("background", "white");
        } else {
            $("#submitCP").prop("disabled", false).removeAttr("style");
        }
    });

    $("#submitCP").click(function () {
        
    });

    function isAcctValid(field, num) {
        return !isNaN($(field).val()) && ($(field).val().length == num || $(field).val() == "");
    }

    function isAcctGood(field, num) {
        return !isNaN($(field).val()) && $(field).val().length == num;
    }
});