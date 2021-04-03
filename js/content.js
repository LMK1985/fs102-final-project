$(() => { 

    // On click slide dropdown content for first Navbar item
    $("#whybtn").on("click", (e) => {
        e.stopPropagation();    // This line is used to stop the hide event handler when clicking inside the Navbar item 
        $("#whybtn").toggleClass("current");    // Toggle currently selected class
        $("#why").slideToggle(500);             // Tiggke sliding of dropdown menu
        $("#ia").toggleClass("bi bi-caret-up-fill");    // Toggle icon direction
        $(".pushContainer").toggleClass("push");        // Push body content down along with dropdown menu
        $(".ball-r").toggleClass("hide");
        $(".ball-g").toggleClass("hide");
        $(".ball-b").toggleClass("hide");           // Hide the 2 animated balls
    });

    //Repeat of the above scripts for second and third Navbar menu items
    $("#getbtn").on("click", (e) => {
        e.stopPropagation();
        $("#getbtn").toggleClass("current");
        $("#getting").slideToggle(500);
        $("#ib").toggleClass("bi bi-caret-up-fill");
        $(".pushContainer").toggleClass("push");
        $(".ball-r").toggleClass("hide");
        $(".ball-g").toggleClass("hide");
        $(".ball-b").toggleClass("hide");
    });
    $("#givebtn").on("click", (e) => {
        e.stopPropagation();
        $("#givebtn").toggleClass("current");
        $("#giving").slideToggle(500);
        $("#ic").toggleClass("bi bi-caret-up-fill");
        $(".pushContainer").toggleClass("push");
        $(".ball-r").toggleClass("hide");
        $(".ball-g").toggleClass("hide");
        $(".ball-b").toggleClass("hide");
    });
    
    // On click outside Navbar items, slide/hide the dropdown content as well
    $(document).on("click", () => {
        $("#why").slideUp("fast");
        $("#ia").attr("class", "bi bi-caret-down-fill");
        $("#getting").slideUp("fast");
        $("#ib").attr("class", "bi bi-caret-down-fill");
        $("#giving").slideUp("fast");
        $("#ic").attr("class", "bi bi-caret-down-fill");
        $("#whybtn").removeClass("current");
        $("#getbtn").removeClass("current");
        $("#givebtn").removeClass("current");
        $(".pushContainer").removeClass("push");
        $(".ball-r").removeClass("hide");
        $(".ball-g").removeClass("hide");
        $(".ball-b").removeClass("hide");
    });

    // On hover set cover-card-front division opacity to zero to display cover-card-back contents
    $("div.cover-card-front").hover(function() {
        $(this).css("opacity", 0);
    }, function() {
        $(this).css("opacity", 1);
    });

    // On hover animate expand-card division element width and height
    $("div.expand-card").hover(function() {
            $(this).css({
                "width": "400px",
                "height": "250px",
            });
        }, function() {
            $(this).css({
                "width": "100px",
                "height": "100px",
            });
    });

    // Script for animating back to top scroll on click
    $("#backtop").on("click", function() {
        window.scrollTo({top: 0, behavior: "smooth"});
    });

    // Scripts for Signup page 



});