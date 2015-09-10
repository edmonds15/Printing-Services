$(function () {
    var keyCodeValid = true;
    var accountCodeValid = true;

    $("#bc").css("width", "" + $("#ui-id-4").width() + "px");
    $(window).resize(function () {
        $("#bc").css("width", "" + $("#ui-id-4").width() + "px");
    });

    $("#bcError").hide();

    $(".spinner").spinner({
        min: 1
    });
    $("button").button();
    $("#removePhone").button("option", "disabled", true);
    $("#submitBC").button("option", "disabled", true);

    $("#bc").keyup(function (event) {
        if (event.which == 13) {
            $("#submitBC").click();
        }
    });

    $("#addPhone").click(function () {
        var entry = $("<span class=\"phoneEntry\">" + $(".phoneEntry:first").html() + "</span>");
        entry.appendTo($("#phoneEntries"));
        $("#removePhone").button("option", "disabled", false);
    });

    $("#removePhone").click(function () {
        if ($(".phoneEntry").length == 2) {
            $("#removePhone").button("option", "disabled", true);
        }
        $(".phoneEntry:last").remove();
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

    $("input").keyup(function () {
        validateInput();
    });

    $("#submitBC").click(function () {
        var info = $("#name").val() + ", " + $("#title").val() + ", " + $("#email").val() + ", ";
        for (var i = 0; i < $(".phoneEntry").length - 1; i++) {
            info += $(".phoneType:eq(" + i + ")").val() + ", " + $(".phoneNum:eq(" + i + ")").val() + ", ";
        }
        info += $(".phoneType:last").val() + ", " + $(".phoneNum:last").val();
        var num = $(".spinner").val();
        var finish = $("#finish").val();
        var keyCode = "";
        if ($("#keyCode").val() != undefined || $("#keyCode").val() != "") {
            keyCode = $("#keyCode").val();
        }
        var acctCode = $("#acctCode1").val() + " " + $("#acctCode2").val() + " " + $("#acctCode3").val() +
                 " " + $("#acctCode4").val() + " " + $("#acctCode5").val() + " " + $("#acctCode6").val();
        if (acctCode == "     ") {
            acctCode = "";
        }
        var submit = { info: info, "num": num, finish: finish, keyCode: keyCode, acctCode: acctCode };
        $.post("BusinessCards/recordBC.aspx", submit, function (result) {
            console.log(result);
            var results = result.split("\n");
            if (results.length != 2) {
                $("#bcBody").hide();
                $("#bcError").show().append(document.createTextNode(result));
                return;
            }
            var reqId = results[0].split(":")[1];
            if (reqId == "" || results[1].charAt(0) != "1") {
                $("#bcBody").hide();
                $("#bcError").show().append(document.createTextNode("Request processed incorrectly."));
                return;
            }
            var alertMsg = "<div class=\"alert alert-success\" role=\"alert\" id=\"alertSuccess\">";
            alertMsg += "<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>";
            alertMsg += "Request Submitted Successfully! Your Request ID is: <b>" + reqId + "</b></div>";
            var alert = $(alertMsg);
            alert.prependTo("#bc");
            $("#alertSuccess").alert();
        });
        $("#name").val("");
        $("#title").val("");
        $("#email").val("");
        var numPhone = $(".phoneEntry").length;
        while (numPhone > 1) {
            $(".phoneEntry:last").remove();
            numPhone--;
        }
        $(".phoneType").val("work");
        $(".phoneNum").val("");
        $(".spinner").val(1);
        $("#finish").val("matte");
        $("#keyCode").val("");
        $("#acctCode1").val("");
        $("#acctCode2").val("");
        $("#acctCode3").val("");
        $("#acctCode4").val("");
        $("#acctCode5").val("");
        $("#acctCode6").val("");
        $("#submitBC").button("option", "disabled", true);
    });

    function validateInput() {
        if (!keyCodeValid || !accountCodeValid || ($("#keyCode").val() == "" && isAcctAllEmpty()) ||
                $("#name").val() == "" || $("#title").val() == "" || $("#email").val() == "" ||
                $(".phoneNum:first").val() == "") {
            $("#submitBC").button("option", "disabled", true);
        } else {
            $("#submitBC").button("option", "disabled", false);
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