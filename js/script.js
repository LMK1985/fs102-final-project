$(() => {

    $("#whybtn").on("click", () => {
        $("#why").toggle("300");
    });
    $("#getbtn").on("click", () => {
        $("#getting").toggleClass("show");
    });
    $("#givebtn").on("click", () => {
        $("#giving").toggleClass("show");
    });
    $("#signbtn").on("click", () => {
        $("#signUp").toggleClass("show");
    });
    $("#aboutbtn").on("click", () => {
        $("#aboutUs").toggleClass("show");
    });
    

});