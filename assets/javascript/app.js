$(document).ready(function() {

    var topics = [
        "Batman", "Robin", "Superman", "The Flash", "Green Arrow", "Black Canary", "Aquaman", 
        "Spider-Man", "Speedy", "Black Panther", "Wolverine", "DareDevil", "Wonder Woman", 
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

        $("#add-hero").on("click", function(event) {
            
            event.preventDefault();
    
           
            var hero = $("#hero-input").val();
            
            topics.push(hero);
    
         
            renderButtons();
        });
    
            renderButtons();


    $("button").on("click", function(){
        //$("#gifs-display").empty();
       // $("button").removeClass("active");
       // $(this).addClass("active");
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
                var heroImage = $("<img>");
                heroImage.attr("src", results[i].images.fixed_height.url);
                gifDiv.append(ratingDisplay);
                gifDiv.append(heroImage);
                $("#gifs-display").prepend(gifDiv);


            }
        });

    });



});