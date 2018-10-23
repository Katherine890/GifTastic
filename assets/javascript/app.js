$(document).ready(function() {

    var topics = [
        "Batman", "Robin", "Superman", "The Flash", "Green Arrow", "Black Canary", "Aquaman", 
        "Spider-Man", "Black Panther", "Wolverine", "DareDevil", "Wonder Woman", 
        "Black Widow", "DeadPool", "Captain America", "Iron Man", "Catwoman", 
        "Wolverine", "Storm", "Jean Grey"
    ];

    function renderButtons() {

        $("#superhero-buttons").empty();

        for (var i = 0; i < topics.length; i++) {

            var a = $("<button>");
           
            a.addClass("hero");
            
            a.attr("data-character", topics[i]);
            
            a.text(topics[i]);
           
            $("#superhero-buttons").append(a);
          }
        } 

        renderButtons(topics, "#superhero-buttons");

        
        $("button").on("click", function(){
            $("#gifs-display").empty();
            $("button").removeClass("active");
            $(this).addClass("active");
           var character = $(this).attr("data-character");

            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
            character + "&api_key=jOJwC3HUpgDGziYvS8lj6sjI6emNkzOj&limit=10";
            console.log(queryURL);

            
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {

                var results = response.data;

                console.log(response.data);
            
            
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var ratingDisplay = $("<p>").text("Rating: " + rating);

                    var animate = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;
                

                    var heroImage = $("<img>");
                    heroImage.attr("src", still);
                    heroImage.attr("data-still", still);
                    heroImage.attr("data-animate", animate);
                    heroImage.attr("data-state", "still");
                    heroImage.addClass("hero-image");

                    gifDiv.append(ratingDisplay);
                    gifDiv.append(heroImage);
                    $("#gifs-display").prepend(gifDiv);


                }
                
    
            });

        });



        $("#add-hero").on("click", function(event) {
            
            event.preventDefault();
        
               
            var newHero = $("#hero-input").eq(0).val();
    
            if (newHero.length > 2) {
              topics.push(newHero);
            }
             
            renderButtons(topics, "hero-button", "#superhero-buttons");

            $("button").on("click", function(){
                $("#gifs-display").empty();
                $("button").removeClass("active");
                $(this).addClass("active");
               var character = $(this).attr("data-character");
    
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
                character + "&api_key=jOJwC3HUpgDGziYvS8lj6sjI6emNkzOj&limit=10";
                console.log(queryURL);
        

                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response) {

                    var results = response.data;

                    console.log(response.data);
                
                
                    for (var i = 0; i < results.length; i++) {
                        var gifDiv = $("<div>");
                        var rating = results[i].rating;
                        var ratingDisplay = $("<p>").text("Rating: " + rating);

                        var animate = results[i].images.fixed_height.url;
                        var still = results[i].images.fixed_height_still.url;
                    

                        var heroImage = $("<img>");
                        heroImage.attr("src", still);
                        heroImage.attr("data-still", still);
                        heroImage.attr("data-animate", animate);
                        heroImage.attr("data-state", "still");
                        heroImage.addClass("hero-image");

                        gifDiv.append(ratingDisplay);
                        gifDiv.append(heroImage);
                        $("#gifs-display").prepend(gifDiv);


                    }
                    
    
                });
            
            });


        });
            $(document).on("click", ".hero-image", function() {
                
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");

                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });





               // (newHero).on("click", function(event) {

                 //   event.preventDefault();

                  //  queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
                  //  character + "&api_key=jOJwC3HUpgDGziYvS8lj6sjI6emNkzOj&limit=10";
                  //  console.log(queryURL);
            
                    
                  //  $.ajax({
                  //      url: queryURL,
                   //     method: "GET"
                  //  }).then(function(response) {
            
                   //     results = response.data;
            
                   //     console.log(response.data);
                  //  })  

                    
              //  })

});