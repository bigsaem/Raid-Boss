$(document).ready(function () {

    $("#loginListForm").submit(function (e) {
        e.preventDefault();
        var formData = ConvertFormToJSON("#loginListForm");

        $.ajax({
            url: "./php/login-post.php",
            type: "POST",
            dataType: "JSON",
            data: formData,
            success: function (data) {
                $("#p1").text(data.msg);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("could not log in");
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