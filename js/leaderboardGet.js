///////////////////////////////////////////////
//         Leaderboard Function              //
///////////////////////////////////////////////

$(document).ready(function () {
    $.ajax({
        url: "./php/GetLeaderboard.php",
        dataType: "html",
        type: "GET",
        success: function (data) {
            $("#leaderTable").append(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("leadboard could not be displayed");
        }
    });
});