
/************************************************/
/*****************Nav bar function***************/
/************************************************/

function openNav() {
    document.getElementById("mySidenav").style.width = "350px";
    document.getElementById("cover").style.display = "block";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("cover").style.display = "none";
}

///////////////////////////////////////////////
//         Retrieve User Info                //
///////////////////////////////////////////////

$.ajax({
    url: "./php/userInfo.php",
    dataType: "json",
    type: "GET",
    success: function (data) {
        if (data.msg != null) {
            $("#userInfo").after(data.msg);
            $("#loginNav").css("display", "block");
            $("#userInfo").css("display", "inline-block");
            $("#logoutButton").css("display", "inline-block");
        }
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.log("user info could not be retrieved");
    }
});

///////////////////////////////////////////////
//         Logout Button                     //
///////////////////////////////////////////////

$("#logoutButton").click(function () {
    $.ajax({
        url: "./php/logout.php",
        dataType: "json",
        type: "GET",
        success: function (data) {
            $("#loginNav").html(data.msg);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("could not logout");
        }
    });
});