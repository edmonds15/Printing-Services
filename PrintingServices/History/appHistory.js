$(function () {
    var fullHistory = [];
    var startingEntry = 0;

    $("#history").css("width", "" + $("#ui-id-10").width() + "px");
    $(window).resize(function () {
        $("#history").css("width", "" + $("#ui-id-10").width() + "px");
    });

    $.get("History/getHistory.aspx", function (data) {
        if (data.charAt(0) == "[" && data.charAt(data.length - 1) == "]") {
            data = JSON.parse(data);
            fullHistory = data;
            writeHistory();
        } else {
            console.log(data);
        }
    });

    function writeHistory() {
        if (fullHistory.length == 0) {
            var entry = $("<div class=\"row\">No Entries Found</div>");
            $("#historyEntries").append(entry);
        }
        var earlierEntries = false;
        var printEntries = fullHistory.length - startingEntry;
        if (printEntries > 10) {
            printEntries = 10;
            earlierEntries = true;
        }
        for (var i = startingEntry; i < startingEntry + printEntries; i++) {
            var entryInfo = fullHistory[i];
            console.log(entryInfo);
            var html = "<div class=\"row\"><div class=\"col-xs-3\">" + entryInfo.received + "</div>";
            html += "<div class=\"col-xs-3\">" + entryInfo.description + "</div>";
            html += "<div class=\"col-xs-3\">" + entryInfo.status + "</div>";
            html += "<div class=\"col-xs-3\">" + entryInfo.completed + "</div></div>";
            var entry = $(html);
            $("#historyEntries").append(entry);
        }
        if (startingEntry > 0) {
            var laterButton = $("<button id=\"historyLater\">Later Entries</button>");
            $("#historyEntries").append(laterButton);
        }
        if (earlierEntries) {
            var earlyButton = $("<button id=\"historyEarly\">Earlier Entries</button>");
            $("#historyEntries").append(earlyButton);
        }
        $("button").button();
    }

    $("#historyEntries").on("click", "#historyLater", function () {
        $("#historyEntries").empty();
        startingEntry -= 10;
        writeHistory();
    });

    $("#historyEntries").on("click", "#historyEarly", function () {
        $("#historyEntries").empty();
        startingEntry += 10;
        writeHistory();
    });
});