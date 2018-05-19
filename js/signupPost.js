$(document).ready(function () {

    $("#signupListForm").submit(function (e) {
        e.preventDefault();
        var formData = ConvertFormToJSON("#signupListForm");

        $.ajax({
            url: "./php/signup-post.php",
            type: "POST",
            dataType: "JSON",
            data: formData,
            success: function (data) {
                var listData = data.msg;
                $("#p1").css("display", "block");
                if (listData === "Success") {
                    $("#p1").removeClass("alert alert-warning w-75 mx-auto text-center");
                    $("#p1").addClass("alert alert-success w-75 mx-auto text-center");
                } else {
                    $("#p1").removeClass("alert alert-success w-75 mx-auto text-center");
                    $("#p1").addClass("alert alert-warning w-75 mx-auto text-center");
                }
                $("#p1").text(listData);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("could not sign up");
            }
        });

    });

    // Converts form to JSON
    function ConvertFormToJSON(form) {
        var array = $(form).serializeArray();
        var json = {};
        jQuery.each(array, function () {
            json[this.name] = this.value || '';
        });
        return json;
    }

});