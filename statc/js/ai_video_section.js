$(document).ready(function () {
    var video = $("#myVideo")[0];

    $("#myVideo").click(function () {
        if (video.paused) {
            video.play();
            $(".click").hide("slow");
        } else {
            video.pause();
            $(".click").show("slow");
        }
    });
});
