var avengers = ["Iron Man", "Captain America", "Thor", "Hulk", "Black Widow", "Hawkeye"];
var clickcount = 0;
var firstclicks = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28];
var secondclicks = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29];
var thirdclicks = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30];
// ====================================================================================================
var renderheroes = function () {
    $("#avengers").empty();
    for (i = 0; i < avengers.length; i++) {
        console.log(avengers[i].substring(0,3));
        var btn = $("<button>");
        btn.attr("id", avengers[i].substring(0,3));
        btn.addClass("hero");
        btn.attr("data-value", avengers[i]);
        btn.text(avengers[i]);
        $("#avengers").append(btn);


    };
};
// ====================================================================================================
$("#add-hero").on("click", function (event) {
    event.preventDefault();
    var hero = $("#hero-input").val().trim();
    avengers.push(hero);
    renderheroes();
});
// ====================================================================================================
var showgifs = function () {

    var hero = $(this).attr("data-value");
    console.log(hero);

    //console.log(firstclicks.indexOf(clickcount));
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=KhD7IOBykiL0wEfWQ1PYR5R5P1vzBnp2&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //++++++++++++++++++++++++++
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var herodiv = $("<div>");
            var heroimg = $("<img>");
            heroimg.attr("src", results[i].images.fixed_height_small.url);
            heroimg.addClass("continue");
            heroimg.attr("data-still", results[i].images.fixed_height_small_still.url);
            heroimg.attr("data-animate", results[i].images.fixed_height_small.url);
            heroimg.attr("data-state", "still");
            var p = $("<p>").text("Rating: " + results[i].rating);


            herodiv.append(heroimg, p);
            $("#gifs1").prepend(herodiv);
        }
        //++++++++++++++++++++++++++

    })

};
// ====================================================================================================

// ====================================================================================================
$(document).on("click", ".continue", function () {
    console.log("CLICKED");
    var state = $(this).attr("data-state");
    console.log(state);

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})
// ====================================================================================================
$(document).on("click", ".hero", showgifs);
// ====================================================================================================
renderheroes();


