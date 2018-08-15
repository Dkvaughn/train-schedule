


/* global moment firebase */

// Initialize Firebase


/*
var config = {
    apiKey: "AIzaSyA8kKiHt_tbd3lZYTx_pSYDk14Do9PrGDk",
    authDomain: "train-schedule-48cc1.firebaseapp.com",
    databaseURL: "https://train-schedule-48cc1.firebaseio.com",
    projectId: "train-schedule-48cc1",
    storageBucket: "train-schedule-48cc1.appspot.com",
    messagingSenderId: "340913758942"
  };
  firebase.initializeApp(config);
*/
                            // Initialize Firebase

                        
                        var config = {
                            apiKey: "AIzaSyCUa3OmzBQAV9MHxQg6Pgl2s5533V5qjEI",
                            authDomain: "coder-bay-fee9d.firebaseapp.com",
                            databaseURL: "https://coder-bay-fee9d.firebaseio.com",
                            storageBucket: "coder-bay-fee9d.appspot.com"
                        };

                        firebase.initializeApp(config);
                        


// Create a variable to reference the database
var database = firebase.database();




                                        /*
                                        // Initial Values
                                        var highPrice = 0;
                                        var highBidder = "No one :-(";
                                        */

// Initial Values


                                            /*
                                            var trainName = [];
                                            var trainDestination = [];
                                            */



// --------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.

/*
database.ref().on("value", function (snapshot) {



                                        /*
                                        // If Firebase has a highPrice and highBidder stored, update our client-side variables
                                        if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {
                                            // Set the variables for highBidder/highPrice equal to the stored values.
                                            highBidder = snapshot.val().highBidder;
                                            highPrice = parseInt(snapshot.val().highPrice);
                                        }
                                            */

/*
                                    
    if (snapshot.child("trainName").exists() && snapshot.child("TrainDestination").exists()) {
                                            // Set the variables for highBidder/highPrice equal to the stored values.
                                            trainName = snapshot.val().trainName;
                                            trainDestination = parseInt(snapshot.val().trainDestination);
                                        }



    // If Firebase does not have highPrice and highBidder values stored, they remain the same as the
    // values we set when we initialized the variables.
    // In either case, we want to log the values to console and display them on the page.
    console.log(highBidder);
    console.log(highPrice);
    $("#highest-bidder").text(highBidder);
    $("#highest-price").text(highPrice);

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});





                /*
                $("#submit").on("click", function (event) {
                    event.preventDefault();
                    localStorage.clear();

                    var name = $("#name-input").val().trim();
                    var email = $("#email-input").val().trim();
                    var age = $("#age-input").val().trim();
                    var comment = $("#comment-input").val().trim();

                    console.log(name);
                    console.log(email);
                    console.log(age);
                    console.log(comment);
                    $("#name-here").text(name);
                    $("#email-here").text(email);
                    $("#age-here").text(age);
                    $("#comment-here").text(comment);
                });

                */


//use this code to biuld sending to fire base


                            /*
                        $("#submit-bid").on("click", function (event) {
                            event.preventDefault();
                            // Get the input values
                            var bidderName = $("#bidder-name").val().trim();
                            var bidderPrice = parseInt($("#bidder-price").val().trim());

                            // Log the Bidder and Price (Even if not the highest)
                            console.log(bidderName);
                            console.log(bidderPrice);

                            if (bidderPrice > highPrice) {

                                // Alert
                                alert("You are now the highest bidder.");

                                // Save the new price in Firebase. This will cause our "value" callback above to fire and update
                                // the UI.
                                database.ref().set({
                                    highBidder: bidderName,
                                    highPrice: bidderPrice
                                });

                                // Log the new High Price
                                console.log("New High Price!");
                                console.log(bidderName);
                                console.log(bidderPrice);
                            }

                            else {

                                // Alert
                                alert("Sorry that bid is too low. Try again.");
                            }
                        });


                        */







// 2. Button for adding Employees
$("#addTrain").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var empName = $("#trainName").val().trim();
    var empRole = $("#role-input").val().trim();
    var empStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
    var empRate = $("#rate-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newEmp = {
      name: empName,
      role: empRole,
      start: empStart,
      rate: empRate
    };
  
    // Uploads employee data to the database
    database.ref().push(newEmp);
  
    // Logs everything to console
    console.log(newEmp.name);
    console.log(newEmp.role);
    console.log(newEmp.start);
    console.log(newEmp.rate);
  
    // Alert
    alert("Employee successfully added");
  
    // Clears all of the text-boxes
    $("#employee-name-input").val("");
    $("#role-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  });
  


  

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var empName = childSnapshot.val().name;
    var empRole = childSnapshot.val().role;
    var empStart = childSnapshot.val().start;
    var empRate = childSnapshot.val().rate;
  
    // Employee Info
    console.log(empName);
    console.log(empRole);
    console.log(empStart);
    console.log(empRate);
  
    // Prettify the employee start
    var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment(empStart, "X"), "months");
    console.log(empMonths);
  
    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);
  

// Add each train's data into the table
$("#train-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
});
 