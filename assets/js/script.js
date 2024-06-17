// This variable is where all the result cards will be appended to when they are dynamically created
const cocktailsResultsBox = $("#cocktails-content");
// This variable holds the input value from the user in the cocktail section
const cocktailInput = $("#drink-level");
// This array will hold the favorite names that the user have saved
const favoritesSaved = JSON.parse(localStorage.getItem("favorite")) || [];
// This global varialbe will keep track of which drink from the alcoholic section array it is currently on while it is being iterated through
let alcoholicCategoryIndex = 0;
// This global variable will keep track of which drink from the non-alcoholic section array it is currently on while it is being iterated through
let nonAlcoholicIndex = 0;

// This variable will the input value for the food selection
const foodInput = $("#food-type");
const foodResultsBox = $("#content");


function createCocktailCard(data){
  
  // Varible is used to access the object within data
  let cocktailsObject = data.drinks[0];

  // This array will hold all the ingredients  from data since each result will have a different amount
  const ingredients = [];
  // Loop will go through the ingredients by each number until it reaches a null
    for (let i = 1; ; i++) {
      let numberIngredients = `strIngredient${i}`;
      // If the ingredient object is null then it reached the end
      if(!cocktailsObject[numberIngredients]){
        break;
      }
      ingredients.push(cocktailsObject[numberIngredients]);
      
    }
    
    // This string will hold the card that will be displayed for the user for each cocktail
  const cocktailHtml = 
  `<div class="card mt-3">
    <div class="card-content">
    <div class="columns">
      <div class="column is-one-third">
        <img src="${cocktailsObject.strDrinkThumb}" style="width:150%">
      </div>
      <div class="column">
        <p class="title">${cocktailsObject.strDrink}</p>
        <p class="subtitle">${cocktailsObject.strAlcoholic}</p>
        <p class = "mr-2"style="color:red">Ingredients:</h3>
        <ol class="ingredients-list">
        // Displays the ingredients as list
             ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
        </ol>
      </div>
    </div>
          <p class="instructions">
        Directions: ${cocktailsObject.strInstructions}
          </p>
        </div>
        <footer class="card-footer has-background-warning">
          <button id="fav-btn" data-name="${cocktailsObject.strDrink} 🍸" class="card-footer-item">Add to Favorites</button> 
        </footer>
      </div>`
    ;

    // Display the card to the results box
cocktailsResultsBox.append(cocktailHtml);
}



function randomCocktailSelection(event){
// Prevents page from refreshing
  event.preventDefault();
// This url will randomly choose a drink
  const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  // Empty the results box from previous search
  cocktailsResultsBox.empty();
  // Add a title for the box before results get displayed
  let resultsTitle = $("<h2>").attr("class", "has-text-centered is-size-3 has-text-primary").attr("style", "border-bottom: #000 2px solid").text("Cocktail Results");
  cocktailsResultsBox.append(resultsTitle);

// Use the fetch method to call the api
  fetch(apiUrl).then(function(response){
    return response.json().then(function(data){
      // Create a card and display the data to user
      createCocktailCard(data);
    }) .catch(function (error) {
      console.log(error);
    });
  })
  // Closes Modal
cocktailModal.dialog("close");
}

function retrieveCocktailsInfo(event) {
  // prevent page from refreshing
  event.preventDefault();
  // Checks for empty input
  if(!cocktailInput.val()){
    cocktailsResultsBox.empty();
    // Display an error message in the content box 
    let errorTitle = $("<h2>").attr("class", "has-text-centered is-size-3 has-text-warning").attr("style", "border-bottom: #000 2px solid").text("Invalid Selection. Try Again");
cocktailsResultsBox.append(errorTitle);
cocktailModal.dialog("close");
return;
  }
  // This variable will be used in the loop section to keep track of what category the user chose when the api is called
let category = cocktailInput.val();
  // This url will be the results of the users option to search alcoholic and non-alcholic drinks
  const urlAlcoholFilter = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${cocktailInput.val()}`;
  fetch(urlAlcoholFilter).then(function (response) {
    return response.json()
      .then(function (data) {
        // Object returned an array of the drinks from the category selected
        console.log(data.drinks.length);
        // This variable gives access to the drinks array that is inside the object that was returned
        let drinksObjectArray = data.drinks;
        // This will empty the box for a new search each time
        cocktailsResultsBox.empty();
        // Add a title for the results box
        let resultsTitle = $("<h2>").attr("class", "has-text-centered is-size-3 has-text-primary").attr("style", "border-bottom: #000 2px solid").text("Cocktail Results");
        cocktailsResultsBox.append(resultsTitle);
        // This loop will get the id value of the drink and calls another api to get information that will be used to on the page
        for (let index = 0; index < 9; index++) {   //Had to limit the amount of results to be displayed because of cors restriction from api
          // This variable will hold the url that will call the api to get the information with the drinks id number
          let searchCocktailById;
          // This conditional allows additional drinks to be rendered from this category nine at a time and continue through the array of drinks
          if(category === "alcoholic"){
            // If the index reaches the maximum length it is reset to start from the beginning of the array to continue displaying
            if(alcoholicCategoryIndex === drinksObjectArray.length){
              alcoholicCategoryIndex = 0;
            }
            searchCocktailById = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinksObjectArray[alcoholicCategoryIndex].idDrink}`;
            // Increse the index each iteration to go to next item in the list
            alcoholicCategoryIndex++

          }
          //If the non-alcoholic category is selected then it will go through the array and output the drinks nine at a time
          else if(category=== "non_alcoholic"){
            if(nonAlcoholicIndex === drinksObjectArray.length){
              nonAlcoholicIndex = 0;
            }
            searchCocktailById = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinksObjectArray[nonAlcoholicIndex].idDrink}`;
          nonAlcoholicIndex++

          }
          else{
            searchCocktailById = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinksObjectArray[index].idDrink}`;
          }
          // With the information for each drink we call another api to get its ingredients and direction to be displayed
          fetch(searchCocktailById).then(function (response) {
            console.log(response.status);
            return response.json()
              .then(function (data) {
                createCocktailCard(data);
              })
              .catch(function (error) {
                console.log(error);
              });
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  cocktailModal.dialog("close");
}
// Creates a modal to find a cocktail button is clicked
let cocktailModal = $("#cocktail-form").dialog({
  autoOpen: false,
  height: 200,
  width: 338,
  modal: true,
  buttons: {
    // When the find drink button is clicked it will render the results of degree of difficulty the user chose
    "Search Cocktails": retrieveCocktailsInfo,
    // When this button is clicked it will randomly select a cocktail and dislay it to the user
    "Surprise Me": randomCocktailSelection,
  },
  // This will close the modal if clicked
  close: function () {
    cocktailInput.val("");
    cocktailModal.dialog("close");
  },
});

// When the favorite button is clicked this function will run to collect the name of the drink
function addToFavorites(event){
  // Targets the button that was clicked and gets the name of the drink that is stored in the dataset attribute of the button
  const targetFavorite = event.target.dataset.name;
  console.log(targetFavorite);
  // Push the name of the drink into the favorite array
  favoritesSaved.push(targetFavorite);
  console.log(favoritesSaved);
  // Save the updated version into local storage
  localStorage.setItem("favorite", JSON.stringify(favoritesSaved));
}

// This function takes the favorites that are in local storage and displays them in Favorites 
function displayFavoritesInHeader(){
  // Displays the title
  const title = $("<option>").text("Favorites");
  // Empties the list so that there are no repeated values when a new item is added
  $("#favorite-list").empty();
  // If array is empty then it will display the message below
  if(!favoritesSaved.length){
    let list = $("<option>").text("No favorites saved");
    $("#favorite-list").append(title, list);
  }

  else{
    $("#favorite-list").append(title);
// Iterate through the favorite array list to be displayed
    for (favorite of favoritesSaved){
  
      let list = $("<option>").text(favorite);
      console.log(favorite);
      $("#favorite-list").append(list);
    
    }
  
  }

}


$(document).ready(function () {
  function retrieveMealInfo(event) {
    event.preventDefault();
    console.log(foodInput.val());
    const foodApiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${foodInput.val()}`;
    console.log(foodApiUrl);
    // Clear previous results
    $("#meal-container").empty();
    foodResultsBox.empty();
    let foodResultsTitle = $("<h2>")
      .attr("class", "has-text-centered is-size-3 has-text-primary")
      .attr("style", "border-bottom: #000 2px solid")
      .text("Food Results");
    foodResultsBox.append(foodResultsTitle);
    fetch(foodApiUrl)
      .then(function (response) {
        console.log(response.status);
        return response.json();
      })
      .then(function (data) {
        let mealsObjectArray = data.meals;
        if (!mealsObjectArray || mealsObjectArray.length === 0) {
          throw new Error("No meals found for the given category");
        }
        // Fetch detailed information for each meal
        return Promise.all(
          mealsObjectArray.map((meal) => {
            const searchFoodById = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`;
            console.log(searchFoodById);
            return fetch(searchFoodById).then((response) => response.json());
          })
        );
      })
      .then((mealsDetails) => {
        mealsDetails.forEach((mealData) => {
          if (!mealData.meals || mealData.meals.length === 0) {
            throw new Error("No details found for the meal");
          }
          displayFood(mealData); // Use the common display function
        });
        modal.dialog("close"); // Close the modal after displaying the results
      })
      .catch(function (error) {
        console.log(error);
        $("#meal-container").text(
          "An error occurred while fetching the meal data. Please try again."
        );
      });
    // Reset form elements in the modal
    foodInput.val(""); // Assuming foodInput is an input field
  }
  // Function to get a random food
  function getRandomFood() {
    foodResultsBox.empty();
    let resultsTitle = $("<h2>").attr("class", "has-text-centered is-size-3 has-text-primary").attr("style", "border-bottom: #000 2px solid").text("Food Results");
foodResultsBox.append(resultsTitle);
    const foodRandom = {
      async: true,
      crossDomain: true,
      url: "https://themealdb.p.rapidapi.com/random.php",
      method: "GET",
      headers: {
        "x-rapidapi-key": "5764f7bd88msh3618d8668c13cdfp13b836jsndd4bc7cddbc3",
        "x-rapidapi-host": "themealdb.p.rapidapi.com",
      },
    };
    $.ajax(foodRandom)
      .done(function (response) {
        displayFood(response);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.error("Error: " + textStatus, errorThrown);
      });
  }
  // Function to display food data
  function displayFood(data) {
    // Extract the first meal from the response data
    const food = data.meals[0];
    // Truncate the instructions to the first 200 characters
    const truncatedInstructions = food.strInstructions.substring(0, 200);
    // Store the full instructions
    const fullInstructions = food.strInstructions;
    // Simple function to extract ingredients
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (food[`strIngredient${i}`]) {
        ingredients.push(
          `${food[`strIngredient${i}`]} - ${food[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }
    // Create the HTML structure for displaying the meal
    const foodHtml = `
      <div class="card mt-3">
  <div class="card-content">
    <div class="columns">
      <div class="column is-one-third">
        <img src="${food.strMealThumb}" alt="${
      food.strMeal
    }" style="width:100%">
      </div>
      <div class="column">
        <p class="title">${food.strMeal}</p>
        <p class="subtitle">${food.strCategory}</p>
        <ul class="ingredients-list">
          ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
        </ul>
      </div>
    </div>
          <p class="instructions">
            ${truncatedInstructions}
            <span class="more-text" style="display:none;">${fullInstructions.substring(
              100
            )}</span>
            <a href="#" class="read-more">...Read more</a>
          </p>
        </div>
        <footer class="card-footer">
          <a href="${food.strYoutube}" class="card-footer-item">Watch Recipe</a>
          <button id="fav-btn" data-name="${
            food.strMeal
          } 🍽️" class="card-footer-item has-background-warning">Add to Favorites</button>
        </footer>
      </div>
    `;
    // Append the generated HTML to the #content element on the page
    $("#content").append(foodHtml);
    // Add an event listener to the "Read more" link to toggle the visibility of the full instructions
    $(".read-more")
      .last()
      .on("click", function (event) {
        // Prevent the default link behavior
        event.preventDefault();
        // Toggle the display of the hidden instructions text
        $(this).siblings(".more-text").toggle();
        // Toggle the link text between "...Read more" and " Show less"
        $(this).text(
          $(this).text() === "...Read more" ? " Show less" : "...Read more"
        );
      });
  }
  // Initialize the dialog modal
  let modal = $("#dialog-form").dialog({
    autoOpen: false, // Dialogue does not open automatically
    height: 350,
    width: 300,
    modal: true, // Dialogue is modal (prevents interaction with rest of page)
    buttons: {
      // Button to search for dishes
      "Search Dishes": retrieveMealInfo,
      // Button to cancel and close the dialogue
      "Surprise me": function () {
        getRandomFood();
        modal.dialog("close");
      },
    },
    // Function to handle the dialogue close event
    close: function () {
      modal.dialog("close");
    },
  });
  // Open the modal when the Food button is clicked
  $("#food-btn").on("click", function () {
    modal.dialog("open");
  });
  // Opens the modal for the cocktails when the drinks button is clicked
  $("#drink-btn").on("click", function () {
    cocktailModal.dialog("open");
  });

  // This event listener will wait for any button that is clicked that has an id of fav-btn and run the function
$(document).on("click", "#fav-btn",addToFavorites);
// When the favorites in header is clicked a drop down list will render the favorites that user saved
$("#favorite-list").on("click", displayFavoritesInHeader);
});

