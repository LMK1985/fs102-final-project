$(() => { // jQuery document ready function

    // Scripts for content.hmtl
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
                "height": "260px",
            });
        }, function() {
            $(this).css({
                "width": "260px",
                "height": "100px",
            });
    });

    // Scripts for account.html 
    // Declaring all variables required for the page
    var bizname = localStorage.getItem("bizname");
    var bizuen = localStorage.getItem("bizuen");
    var bizprofile = localStorage.getItem("bizprofile");
    var bizaddress = localStorage.getItem("bizaddress");
    var country = localStorage.getItem("country");
    var contact = localStorage.getItem("contact");
    var designation = localStorage.getItem("designation");
    var email = localStorage.getItem("email");
    var firstname = localStorage.getItem("firstname");
    var lastname = localStorage.getItem("lastname");
    var notifications = localStorage.getItem("notifications");
    var plan = localStorage.getItem("plan");
    var postal = localStorage.getItem("postal");
    var product = localStorage.getItem("product");
    var state = localStorage.getItem("state");
    var userid = localStorage.getItem("userid");

    // Display all currently stored localdata in various locations on the user account interface
    $(".greeting").html(`Welcome back!<br/>${firstname} ${lastname}`);
    $("#notifications").html(`<span class="notifications">${notifications}</span>New Notifications`);
    $("#loginBar").html(`You are currently logged in as: <strong>${firstname} ${lastname} @ ${bizname}</strong>`);
    $("#email").val(email);
    $("#firstname").val(firstname);
    $("#lastname").val(lastname);
    $("#contact").val(contact);
    $("#designation").val(designation);
    $("#bizname").val(bizname);
    $("#bizuen").val(bizuen);
    $("#bizaddress").val(bizaddress);
    $("#bizprofile").val(bizprofile);
    $("#postal").val(postal);
    $("#product").val(product);
    // Additional handling for special input types
    $("#country").append(`<option>${country}</option>`);    // Append option entered into user's JSON profile to the list of selections
    $("#country").val(country);                             // Set option selected to what the user has in JSON file 
    $("#state").append(`<option>${state}</option>`);        // Same here
    $("#state").val(state);
    $("#plan").append(`<option>${plan}</option>`);          // And here                     
    $("#plan").val(plan);

    // Call functions to extract notifications for current userid and for products list rendering
    getNotifications();
    getProducts();
    
    // On click functions to allow editing of business profile and saving of changes to localdata
    $("#editbtn").on("click", function() {
        $("#profileForm :input").prop("disabled", false);   //Set disabled properties of all inputs to false
        $("#plan").prop("disabled", true);     // Disallow changing of plans
    });
    $("#confirmbtn").on("click", function() {
        localStorage.setItem("bizname", $("#bizname").val());   // Setting all localstorage data with user edited data
        localStorage.setItem("bizuen", $("#bizuen").val());
        localStorage.setItem("bizprofile", $("#bizprofile").val());
        localStorage.setItem("bizaddress", $("#bizaddress").val());
        localStorage.setItem("country", $("#country").val());
        localStorage.setItem("contact", $("#contact").val());
        localStorage.setItem("designation", $("#designation").val());
        localStorage.setItem("email", $("#email").val());
        localStorage.setItem("firstname", $("#firstname").val());
        localStorage.setItem("lastname", $("#lastname").val());
        localStorage.setItem("postal", $("#postal").val());
        localStorage.setItem("product", $("#product").val());
        localStorage.setItem("state", $("#state").val());
        $("#profileForm :input").prop("disabled", true);    // Disable form after confirm button is clicked
        $("#editbtn").prop("disabled", false);     // Re-enable edit button after whole form is disabled
    });

    // Notification area to change background colour if notification is not zero
    if (notifications > 0) {
        $("#notifications").css("background-color", "gold");
    } else {
        $("#notifications").css("background-color", "white");
    }

    // For controlling notification changes including "new" and "read" status and updating 
    $(document).on("click", ".new", function() {     // Document selector used as the divisions were created with DOM commands and not from original HTML
        $(this).removeClass("new");     // Remove class new
        $(this).find("i").remove();     // Remove icon new
        $(this).find(".noticeStatus").text("read");     // Change notification to read
        notifications--;    // Update variable
        localStorage.setItem("notifications", notifications);   // Update local data
        $("#notifications").html(`<span class="notifications">${notifications}</span>New Notifications`);   // Update dashboard top notification count
    });

    // For searching of products and rendering the relevant products on input change
    $("#productSearch").on("input", function() {
        var userinput = $(this).val();      // Value entered by user
        var matchstatus = "";               // Variable that tracks if there was any matches
        $("#productContainer").empty();     // Remove previous search results from container to prepare for new append function

        productlist.forEach(function(value) {       // For each array item, search for userinput, test and return boolean
            var regex = new RegExp(userinput, 'gi');
            var match = regex.test(value);

            // If statement to filter according to user input and render products that match either in main cat, sub cat or keywords
            if (match === true) {
                matchstatus = "yes"
                text = `<div class="product"><p>Product Category: <span class="productMaincat">${value[1]}</span></p><p>Product Sub-Category: <span class="productSubcat">${value[2]}</span></p>
                <p>Product Keywords: <span class="productKeywords">${value[3]}</span></p></div>`;
                $("#productContainer").append(text);      
                console.log("match");        
            }
        });
    });

    //Function to access notification JSON file and render all notification messages that matches user ID
    function getNotifications() {
        $.ajax({
            url: "files/notification.json",
            dataType: 'json',
            success: function(data) {
                var notice ="";
                var noticelist = [];    //Array to store list of notifications from JSON file

                $.each(data, function(key, value) {     // Execute for each set of data
                    // If statement to filter notification list according to current logged in userid. Only notifications for current user is retrieved.
                    if (value.userkey === parseInt(userid)) {
                        // Nested if else to render notifications according to "new" or "read" status
                        if (value.noticestatus === "new") {
                            notice = `<div class="notice new"><span class="noticeSubject">${value.noticesubject}</span><span class="noticeStatus">${value.noticestatus}</span>
                            <i class="bi bi-pin-angle-fill"></i><br/><span class="noticeContent">${value.noticecontent}</span><span class="noticeTime">${value.noticetime}</span><br/>
                            <span class="noticeDate">${value.noticedate}</span></div>`;
                            noticelist.push(notice);
                        } else {
                            notice = `<div class="notice read"><span class="noticeSubject">${value.noticesubject}</span><span class="noticeStatus">${value.noticestatus}</span><br/>
                            <span class="noticeContent">${value.noticecontent}</span><span class="noticeTime">${value.noticetime}</span><br/>
                            <span class="noticeDate">${value.noticedate}</span></div>`;
                            noticelist.push(notice);
                        }
                    }
                });
                // For loop to render all notification messages on division noticeContainer
                for (i = 0; i < noticelist.length; i++) {
                    $(".noticeContainer").append(noticelist[i]);
                } 
            },
            error(xhr, status, error) {     // Function for error message and error handling
                console.log(error);
            }
        })
    }

    //Function to access productlist JSON file and render all products for search and display
    var productlist = [];    //Array to store list of products from JSON file
    function getProducts() {
        $.ajax({
            url: "files/productlist.json",
            dataType: 'json',
            success: function(data) {
                var product ="";

                $.each(data, function(key, value) {     // Execute for each set of data
                    product = Object.values(value);
                    productlist.push(product);
                }); 
            },
            error(xhr, status, error) {     // Function for error message and error handling
                console.log(error);
            }
        })
    }
   
    // Logout button feature.
    $("#logout").on("click", function() {
        localStorage.clear();
        $("#loggedOff").html(`You will lose access to the account page in <span id="count">5</span> seconds.<br/>Please log in again to view the account page details.`);
        setTimeout(() => { $("#count").text(4); }, 1000);    // Count timer changes in HTML span
        setTimeout(() => { $("#count").text(3); }, 2000);
        setTimeout(() => { $("#count").text(2); }, 3000);
        setTimeout(() => { $("#count").text(1); }, 4000);
        setTimeout(() => { $("#count").text(0); }, 5000);
        setTimeout(() => { location.reload(); }, 5500);   // Redirect after countdown ended
    });

    // Control access to account page. If no user has logged in successfully, do not allow direct access to page contents
    var sessionStatus = window.localStorage.length;
    if (sessionStatus === 0) {
        $("#pleaseLogin").css("display", "block");
        $("#accountpage").css("display", "none");
        $("#productWrapper").css("display", "none");
        $("#usernav").css("display", "none");
    }

    // Scripts for common components across website
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

    // Script for animating back to top scroll on click
    $("#backtop").on("click", function() {
        window.scrollTo({top: 0, behavior: "smooth"});
    });
});