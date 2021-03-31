$(() => {   // jQuery document ready function
  
    // Command lines that start on document load
    animateObj(".ball-r");     // Function to animate all 3 balls
    animateObj(".ball-g");
    animateObj(".ball-b");

    // Global variables declared
    var currentScroll = window.pageYOffset;     // Current pixels scrolled in window
    var trigger1 = document.getElementById("trigger1");     // Variable declared for easy DOM selection
    var trigger1top = trigger1.offsetTop;                   // Element rb's top pixel distance away from window top
    var imgX = document.getElementById('choice').offsetLeft;
    var imgY = document.getElementById('choice').offsetTop;
    
    // If statements for scrolling animation triggers
    if (currentScroll > trigger1top) {
        // change image
    }

    // Function to get random position for animated balls
    function randomPos() {
        var y = $(".rightPanel").height() - 100;     // Get y postion within rightpanel height
        var x = $(".rightPanel").width() - 100;      // Get x postion within rightpanel width
        var yaxis = Math.floor(Math.random() * x);
        var xaxis = Math.floor(Math.random() * y);
        return [yaxis,xaxis];    
    }

    // On mouseover stop animation for balls, on mouseout restart animation
    $("#choice").mouseenter(() => {
        $(".ball-r").stop(true, true);
        $(".ball-g").stop(true, true);
        $(".ball-b").stop(true, true);
        $(".ball-r").animate({top: imgY + imgY/2.5, left: imgX + imgX/5}, 2000);
        $(".ball-g").animate({top: imgY + imgY/1.8, left: imgX + imgX/5.5},2000);
        $(".ball-b").animate({top: imgY + imgY/1.8, left: imgX + imgX/4.4}, 2000);
    });

    // Function that creates the animation for the 3 balls
    function animateObj(obj) {
        var coordinates = randomPos();
        $(obj).animate({bottom: coordinates[0], right: coordinates[1]}, 8000,
            function() {
                animateObj(obj);    // Call the function again after animation is completed
                console.log("animation looped")
            });
    }

    // On click slide dropdown content for first Navbar item
    $("#whybtn").on("click", (e) => {
        e.stopPropagation();    // This line is used to stop the hide event handler when clicking inside the Navbar item 
        $("#why").slideToggle(500);
        $("#ia").toggleClass("bi bi-caret-up-fill");    // Toggle icon direction
    });
    // On click outside of first Navbar item, slide/hide the dropdown content
    $(document).on("click", () => {
        $("#why").slideUp("fast");
    });

    //Repeat of the above scripts for second and third Navbar menu items
    $("#getbtn").on("click", (e) => {
        e.stopPropagation();
        $("#getting").slideToggle(500);
        $("#ib").toggleClass("bi bi-caret-up-fill");
    });
    $(document).on("click", () => {
        $("#getting").slideUp("fast");
    });
    $("#givebtn").on("click", (e) => {
        e.stopPropagation();
        $("#giving").slideToggle(500);
        $("#ic").toggleClass("bi bi-caret-up-fill");
    });
    $(document).on("click", () => {
        $("#giving").slideUp("fast");
    });
            

    $(document).on("scroll", function () {
        console.log(currentScroll);
        console.log(trigger1top);
        console.log(trigger1top - currentScroll);
    });



    

});