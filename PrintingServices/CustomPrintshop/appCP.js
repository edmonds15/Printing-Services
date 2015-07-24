$(function () {
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
            $("#submitCP").prop("disabled", true).css("background", "white");
        } else {
            $(this).removeAttr("style");
            $("#submitCP").prop("disabled", false).removeAttr("style");
        }
    });

    $(".acctCode").change(function () {

    });

    $("#submitCP").click(function () {
        
    });
});