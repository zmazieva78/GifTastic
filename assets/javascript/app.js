

var animals = ["Birds", "Dogs", "Cats", "Fish"];

animals.forEach(function addButton(animalName, index) {
    addAnimalButton(animalName);
});

function enterAnimal() {
    // get the animal name from animal-input element
    var animalName = $("#animal-input").val().trim();

    // check if the input is empty
    if (animalName === "") {
        alert("Please enter correct animal name");
        return;
    }

    // check if this button already exists
    if (animals.includes(animalName)) {
        return;
    }

    animals.push(animalName);

    addAnimalButton(animalName);
}

$("#animal-input").keypress(function (e) {
    if (e.which === 13) {
        enterAnimal();
    }
});

$("#add-animal").click(function () {
    enterAnimal();
});

function addAnimalButton(animalName) {
    var buttonId = "id" + animalName.replace(" ", "_");
    $("#buttons").append("<button class='buttons' id='" + buttonId + "'>" + animalName + "</button>");
    $("#" + buttonId).click(function () {
        var animal = $(this).text();

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + encodeURIComponent(animal) + "&api_key=8JJZWKZ2zreqT7DtrffJJi4bqjev5owa&limit=10";
        console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        var results = response.data;

        $("#gifs-appear-here").empty();

            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var animalDiv = $("<div class='animalImage'>");
                    var p = $("<p>").text("Rating: " + rating);
                    var rating = results[i].rating;
                    var imageId = results[i].id;
                    var animalImage = $("<img id='" + imageId + "'>");
                    animalImage.attr("src", results[i].images.fixed_height.url);
                    animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-animate", results[i].images.fixed_height.url);
                    animalImage.attr("data-state", "animate");
                    animalDiv.append(p);
                    animalDiv.append(animalImage);
                    $("#gifs-appear-here").prepend(animalDiv);
                    $("#" + imageId).click(function () {
                    var state = $(this).attr("data-state");

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                        }
                    });
                }
            }
        });
    });
}