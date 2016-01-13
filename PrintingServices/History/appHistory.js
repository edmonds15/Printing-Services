$(function () {
    var fullHistory = [];
    var startingEntry = 0;

    $("#historyError").hide();

    // Fix the width to be inside the tab
    $("#history").css("width", "" + $("#ui-id-14").width() + "px");
    $(window).resize(function () {
        $("#history").css("width", "" + $("#ui-id-14").width() + "px");
    });

    // Pull the history from the database
    $.ajax({
        url: "History/getHistory.aspx",
        success: function (data) {
            // If successful, save and write it
            if (data.charAt(0) == "[" && data.charAt(data.length - 1) == "]") {
                data = JSON.parse(data);
                fullHistory = data;
                writeHistory();
            } else {
                $("#historyBody").hide();
                $("#historyError").show().append(document.createTextNode("getHistory - " + data));
                console.log(data);
            }
        },
        error: function (xhr) {
            $("#historyBody").hide();
            $("#historyError").show().append(document.createTextNode("getHistory - " + xhr.status + " " + xhr.statusText));
        }
    });

    // Write the history entries, 10 at a time
    function writeHistory() {
        if (fullHistory.length == 0) {
            var entry = $("<div class=\"row\">No Entries Found</div>");
            $("#historyEntries").append(entry);
        }
        var earlierEntries = false;
        // Check the number of entries after the starting point, limit 10
        var printEntries = fullHistory.length - startingEntry;
        if (printEntries > 10) {
            printEntries = 10;
            earlierEntries = true;
        }
        // Write each history entry, starting with the start and writing to the limit
        for (var i = startingEntry; i < startingEntry + printEntries; i++) {
            var entryInfo = fullHistory[i];
            if (entryInfo.completed == undefined) {
                entryInfo.completed = "Not completed yet";
            }
            var html = "<div class=\"row\"><div class=\"col-xs-2\">" + entryInfo.id + "</div>";
            html += "<div class=\"col-xs-2\">" + entryInfo.received + "</div>";
            html += "<div class=\"col-xs-3\">" + entryInfo.description + "</div>";
            html += "<div class=\"col-xs-2\">" + entryInfo.status + "</div>";
            html += "<div class=\"col-xs-3\">" + entryInfo.completed + "</div></div>";
            var entry = $(html);
            $("#historyEntries").append(entry);
        }
        // If the starting entry was not 0, let them access later entries
        if (startingEntry > 0) {
            var laterButton = $("<button id=\"historyLater\">Later Entries</button>");
            $("#historyEntries").append(laterButton);
        }
        // If there were more than 10 entries after the start, let them access earlier entries
        if (earlierEntries) {
            var earlyButton = $("<button id=\"historyEarly\">Earlier Entries</button>");
            $("#historyEntries").append(earlyButton);
        }
        $("button").button();
    }

    // If later entries button clicked, write more recent history entries
    $("#historyEntries").on("click", "#historyLater", function () {
        $("#historyEntries").empty();
        startingEntry -= 10;
        writeHistory();
        // For whatever reason, this has to be done manually
        var mainHeight = $(".container:first").height() + 150;
        $("#main").css("height", mainHeight + "px");
    });

    // If earlier entries button clicked, write less recent history entries
    $("#historyEntries").on("click", "#historyEarly", function () {
        $("#historyEntries").empty();
        startingEntry += 10;
        writeHistory();
        // For whatever reason, this has to be done manually
        var mainHeight = $(".container:first").height() + 150;
        $("#main").css("height", mainHeight + "px");
    });
});