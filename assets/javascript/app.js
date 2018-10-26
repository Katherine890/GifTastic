$(document).ready(function() {

    var topics = [
        "Batman", "Robin", "Superman", "The Flash", "Green Arrow", "Black Canary", "Aquaman",            // Array of strings
        "Spider-Man", "Black Panther", "Wolverine", "DareDevil", "Wonder Woman", 
        "Black Widow", "DeadPool", "Captain America", "Iron Man", "Catwoman", 
        "Wolverine", "Storm", "Jean Grey"
    ];

    function renderButtons() {                                             // Converts all the strings from the "topics" array to buttons

        $("#superhero-buttons").empty();

        for (var i = 0; i < topics.length; i++) {

            var a = $("<button>");
           
            a.addClass("hero");
            
            a.attr("data-character", topics[i]);
            
            a.text(topics[i]);
           
            $("#superhero-buttons").append(a);
          }
        } 

        renderButtons(topics, "#superhero-buttons");                      // Renders the buttons so they appear on the page

        
        $("button").on("click", function(){                               // Clicking the buttons will trigger the gif images and ratings
            $("#gifs-display").empty();
            $("button").removeClass("active");
            $(this).addClass("active");
           var character = $(this).attr("data-character");

            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +            // This url searches Giphy for the superhero we select. Displays 10 through "limit=10"
            character + "&api_key=jOJwC3HUpgDGziYvS8lj6sjI6emNkzOj&limit=10";
            console.log(queryURL);

            
            $.ajax({                                  // This calls to jQuery with AJAX
                url: queryURL,
                method: "GET"
            }).then(function(response) {              

                var results = response.data;          // Storage for the results we receive

                console.log(response.data);
            
            
                for (var i = 0; i < results.length; i++) {            // This loops until it gets through all 10 gifs w/ ratings.
                    var gifDiv = $("<div>");                          // This is what we see on the page (gifs and ratings).
                    var rating = results[i].rating;
                    var ratingDisplay = $("<p>").text("Rating: " + rating);

                    var animate = results[i].images.fixed_height.url;               // This creates a variable for gifs when they are animated
                    var still = results[i].images.fixed_height_still.url;           // This creates a variable for gifs when they are still
                

                    var heroImage = $("<img>");                       // This creates a variable for the image and applies attributes for still and animated.
                    heroImage.attr("src", still);                    
                    heroImage.attr("data-still", still);
                    heroImage.attr("data-animate", animate);
                    heroImage.attr("data-state", "still");
                    heroImage.addClass("hero-image");

                    gifDiv.append(ratingDisplay);                     // We append the ratings to the gifDiv
                    gifDiv.append(heroImage);                         // We append the gif image to the gifDiv
                    $("#gifs-display").prepend(gifDiv);               // Finally, we call the gifDiv to the id of the gifs-display


                }
                
    
            });

        });



        $("#add-hero").on("click", function(event) {                   // Clicking the add hero button will trigger an event.
            
            event.preventDefault();
        
               
            var newHero = $("#hero-input").eq(0).val();               // We create a variable for the new buttons, eq(0) meaning it will show up after all the initial buttons.
    
            if (newHero.length > 2) {                                 // This pushes the new button onto the page.
              topics.push(newHero);
            }
             
            renderButtons(topics, "hero-button", "#superhero-buttons");

            $("button").on("click", function(){                       // Clicking the buttons will trigger the gif images and ratings
                $("#gifs-display").empty();
                $("button").removeClass("active");
                $(this).addClass("active");
               var character = $(this).attr("data-character");
    
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +             // This url searches Giphy for the superhero we select. Displays 10 through "limit=10"
                character + "&api_key=jOJwC3HUpgDGziYvS8lj6sjI6emNkzOj&limit=10"; 
                console.log(queryURL);
        

                $.ajax({                            // This calls to jQuery with AJAX
                    url: queryURL,
                    method: "GET"
                }).then(function(response) {

                    var results = response.data;      // Storage for the results we receive

                    console.log(response.data);
                
                
                    for (var i = 0; i < results.length; i++) {                          // This loops until it gets through all 10 gifs w/ ratings.
                        var gifDiv = $("<div>");                                        // This is what we see on the page (gifs and ratings).
                        var rating = results[i].rating;
                        var ratingDisplay = $("<p>").text("Rating: " + rating);

                        var animate = results[i].images.fixed_height.url;               // This creates a variable for gifs when they are animated
                        var still = results[i].images.fixed_height_still.url;           // This creates a variable for gifs when they are still
                    

                        var heroImage = $("<img>");                      // This creates a variable for the image itself and applies attributes for still and animated.
                        heroImage.attr("src", still);
                        heroImage.attr("data-still", still);
                        heroImage.attr("data-animate", animate);
                        heroImage.attr("data-state", "still");
                        heroImage.addClass("hero-image");

                        gifDiv.append(ratingDisplay);                    // We append the ratings to the gifDiv
                        gifDiv.append(heroImage);                        // We append the gif image to the gifDiv
                        $("#gifs-display").prepend(gifDiv);              // Finally, we call the gifDiv to the id of the gifs-display


                    }
                    
    
                });
            
            });


        });
            $(document).on("click", ".hero-image", function() {             // On click of the gif image
                
                var state = $(this).attr("data-state");                     // Variable for the status of the gif (still/animated).

                if (state === "still") {                                    // If the gif is still, it will animate on click.
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");

                } else {                                                    // If the gif is not still, it will be still on click.
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });


});