$(() => {   // jQuery document ready function
  
    // Command lines that start on document load
    animateTitle();

    // Common variables declared
    var trigger1 = document.getElementById('trigger1');     // Variable declared for easy DOM selection for animation trigger points
    var trigger2 = document.getElementById('trigger2'); 
    var trigger3 = document.getElementById('trigger3'); 
    var trigger1top = trigger1.offsetTop;                   // Trigger's top pixel distance away from window top
    var trigger2top = trigger2.offsetTop;  
    var trigger3top = trigger3.offsetTop;  
    var imgX = document.getElementById('choice').offsetLeft;
    var imgY = document.getElementById('choice').offsetTop;

    // On click play button under title, call function to replay title animation
    $("#playtitle").click(() => {
        animateTitle();
        $("#playtitle").css({   // Upon clicking play button, hide it and disallow click
            "opacity": "0",
            "pointer-events": "none"
        });
    });

    // On click play button above image, call function to animate balls
    $("#playobjects").click(() => {
        $(".ball-r").stop(true).removeAttr("style");   // Stop all current animation, remove previous animation values
        $(".ball-g").stop(true).removeAttr("style");
        $(".ball-b").stop(true).removeAttr("style");
        $(".ball-r").css("opacity", 1);   // Show the ball divs 
        $(".ball-g").css("opacity", 1);
        $(".ball-b").css("opacity", 1);
        animateObj(".ball-r");     // Function to animate balls
        animateObj(".ball-g");
        animateObj(".ball-b");
        $("#playobjects").hide();   // Hide play button and show stop button
        $("#stopobjects").show();
    });

     // On click use QuotStation! button stop all animate and put balls into search glass
     $("#stopobjects").click(() => {
        $(".ball-r").stop(true);
        $(".ball-g").stop(true);
        $(".ball-b").stop(true);
        $(".ball-r").animate({top: imgY + imgY/2.5, left: imgX + imgX/5}, 2000);
        $(".ball-g").animate({top: imgY + imgY/1.8, left: imgX + imgX/5.5},2000);
        $(".ball-b").animate({top: imgY + imgY/1.8, left: imgX + imgX/4.4}, 2000);
        $("#stopobjects").hide();   // Hide stop button and show play button
        $("#playobjects").show();
    });

    // Function to get random position for animated balls
    function randomPos() {
        var y = $("#rp").height() - 200;     // Get y postion within rightpanel height
        var x = $("#rp").width() - 100;      // Get x postion within rightpanel width
        var yaxis = Math.floor(Math.random() * x);
        var xaxis = Math.floor(Math.random() * y);
        return [yaxis,xaxis];    
    }

    // Function that creates the animation for the 3 balls
    function animateObj(obj) {
        var coordinates = randomPos();
        
        $(obj).animate({top: coordinates[0], right: coordinates[1]}, 6000,
            function() {
                animateObj(obj);    // Call the function again after animation is completed
        }); 
    }

    // Function to animate main title with rotation and color change
    function animateTitle() {
        var letters = $("#mainTitle").text().split(""); // Break string into individual letters and push into a new array
        var titleinner = "";    // Declaring variable to hold new main title of individual letters

        // For loop to re-add all letters as individual spans into main title
        for(i = 0; i < letters.length; i++) {   
            titleinner += "<span>" + letters[i] + "</span>";
        }

        $("#mainTitle").text("");   // Clear exisiting main title string
        $("#mainTitle").html(titleinner);   // Push all the letter spans into main title html
        let char = 0;   // Counter
        let char2 = 0;
        let timer = setInterval(onTick, 60);    // 40ms interval do a repeat function called onTick for rotation
        let timer2 = setInterval(onTick2, 300); // 300ms interval for onTick2 color change

        // Function to add fade class or any other class effects to all span in main title. Main function to tweak span effects/animations. 
        function onTick() {
            var span = $(`#mainTitle span:eq(${char})`);    // Selector for specific span index in main title. For looping through each span using counter.
            span.addClass("effects");      
            char++;    
            if(char === letters.length) {   // Stop condition when all spans have added the class selected
                complete();     // Call function to clear repeating interval
                return;    // Stop onTick function
            }
        }
        // Same as above, for adding delayed color change class
        function onTick2() {
            var span2 = $(`#mainTitle span:eq(${char2})`);    
            span2.addClass("colorchange");      
            char2++;    
            if(char2 === letters.length) {   
                complete2();     
                return;    
            }
        }
        // Simple functions to clear interval set above
        function complete() {   
            clearInterval(timer);
            timer = null;
        }
        function complete2() {
            clearInterval(timer2);
            timer2 = null;
            $("#playtitle").css({   // reshow the play button and enable click
                "opacity": "1",
                "pointer-events": "auto"
            });
        }
    }  

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

    // Responsive Navigation Bar control
    // Function to control Burger Navbar animation when screen is small or medium
    $(".burger").on("click", function() {
        $(".navItems").toggleClass("navActive");    // Show the hidden Navbar that is now moved to the left upon small and medium screens
        $(this).toggleClass("morph");   // Animate the burger lines into cross
    });

    // On click call the loginValidator function
    $("#loginbtn").on("click", function() {
        loginValidator();
    });

    // Function to conduct Login check from modal inputs using AJAX to match username and password
    function loginValidator() {
        var email = $("#email").val();  // Grab email input from modal
        var password = $("#password").val();    // Grab password input from modal
        var status ="";     // Variable to check match status of login details
        var username ="";   // Variable to display logged in user name
        
        $.ajax({
            url: "files/userlist.json",
            dataType: 'json',  
            success: function(data) {
                var userlist = data;             // variable to store list of users
                var user = [];
    
                // For each array index in userlist, get the values of email, password, first and last name                   
                $.each(userlist, function(key, value) {

                    // If statement to verify email and login data and save to localdata if login success
                    if (value.email === email && value.password === password) {
                        status = "pass";    // Set variable to pass on successful match
                        username = value.firstname + " " + value.lastname;  // Get username values
                        user = Object.entries(value);
                        // Nested if else for localdata storage
                        if (typeof(Storage) !== "undefined") {
                            user.forEach( function([key, value]) {
                                localStorage.setItem(key, value);
                            });
                        } else {
                            $("#feedback").html(`Dear ${username}, login was successful but sorry your browser does not support web storage and thus your login session cannot be established.`)    // Message to inform data cannot be stored
                        }
                    }
                    // If else statement to display login status message and redirect to account page.
                    if (status === "pass" && typeof(Storage) !== "undefined") {
                        $("#loginbtn").hide();
                        $("#feedback").html(`Welcome back <strong>${username}</strong>!<br/> You will be redirected to the account page in <span id="count">5</span> seconds.<br/>Click <a href="account.html">here</a> if the redirect does not work.`);
                        setTimeout(() => { $("#count").text(4); }, 1000);    // Count timer changes in HTML span
                        setTimeout(() => { $("#count").text(3); }, 2000);
                        setTimeout(() => { $("#count").text(2); }, 3000);
                        setTimeout(() => { $("#count").text(1); }, 4000);
                        setTimeout(() => { $("#count").text(0); }, 5000);
                        setTimeout(() => { window.location.href="account.html"; }, 5500);   // Redirect after countdown ended
                    } else {
                        $("#feedback").html("There was an error in the login credentials.<br/>Please check your email and/or password again.");     // Login failed message
                    }
                });
            },
            error(xhr, status, error) {     // Function for error message and error handling
                console.log(error);
            }
        });
    }

     // Function to activate image animation changes on scrolling to trigger points
     $(window).scroll(() => {
        var currentScroll = $(window).scrollTop();

        // If statements to activate animations based on current windows scroll height
        if (currentScroll >= trigger2top - 300) {
            $("#post").addClass("animate");
        } else {
            $("#post").removeClass("animate");
        }
        if (currentScroll >= trigger2top - 250) {
            $("#quotes").addClass("animate");
        } else {
            $("#quotes").removeClass("animate");
        }
        if (currentScroll >= trigger3top - 200) {
            $("#quotes").removeClass("animate");
            $("#confirm").addClass("animate");
        } else {
            $("#confirm").removeClass("animate");
        }
    
    });

    // Script for animating back to top scroll on click
    $("#backtop").on("click", function() {
        window.scrollTo({top: 0, behavior: "smooth"});
    });

}); // End of script