///////////////////////////////////////////////
//         Counter Function                  //
///////////////////////////////////////////////

$(".clickCounter").click(function () {
    $.ajax({
        url: "counter.php",
        dataType: "json",
        type: "GET",
        success: function (data) {
            // incremented count
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("counter did not increment");
        }
    });
});