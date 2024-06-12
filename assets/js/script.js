// This variable is where all the result cards will be appended to when they are dynamically created
const cocktailsResultsBox = $("#cocktails-content");
const cocktailInput = $("#drink-level");
// This array will hold the favorite drinks names that the user have saved
const favoriteCocktails = JSON.parse(localStorage.getItem("drinks")) || [];


function createCocktailCard(data){

  console.log(`Hello ${data.drinks[0].strIngredient1}`);
  let cocktailsObject = data.drinks[0];

  const ingredients = [];
    for (let i = 1; ; i++) {
      let numberIngredients = `strIngredient${i}`;
      console.log(cocktailsObject.numberIngredients);
      if(!cocktailsObject[numberIngredients]){
        break;
      }
      ingredients.push(cocktailsObject[numberIngredients]);
      
    }


  
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
             ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
        </ol>
      </div>
    </div>
          <p class="instructions">
        Directions: ${cocktailsObject.strInstructions}
          </p>
        </div>
        <footer class="card-footer">
          <button class="card-footer-item">Add to Favorites</button> 
        </footer>
      </div>`
    ;


    // const cocktailCard = $("<div>").attr("class", "card mt-3");

    // const cardContent = $("<div>").attr("class", "card-content");

    // const cardColumns = $("<div>").attr("class", "columns");

    // const holderForImage  = $("<div>").attr("class", "column is-one-third");
    // const imageCocktail = $("<img>").attr("src", `${cocktailsObject.strDrinkThumb}`).attr("style", "width:150%");
    // holderForImage.append(imageCocktail);

    // const holderForDrinkInfo = $("<div>").attr("class", "column");
    // const title = $("<p>").attr("class", "title").text(cocktailsObject.strDrink);
    // const drinkCategory = $("<p>").attr("class", "subtitle").text(cocktailsObject.strAlcoholic);
    //   const listofIngredients = $("<ul>").attr("class", "ingredients-list");

    //     for (let index = 1;;index++){
    //       let numberIngredients = `strIngredient${index}`;
    //       if (!numberIngredients)
    //         break;
    //       const itemDrink = $("<li>").text(cocktailsObject.numberIngredients);
    //       listofIngredients.append(itemDrink);
    //     }
      

    //     holderForDrinkInfo.append(title, drinkCategory,listofIngredients);

    //     const instructionsForCocktail = $("<p>").attr("class", "cocktail-instructions").text(cocktailsObject.strInstructions);
    //       cardContent.append(holderForImage,holderForDrinkInfo,instructionsForCocktail);

    //     const cardFooter = ("<footer>").attr("class","card-footer");
    //       const buttonInFooter = ("<button>").attr("class", "card-footer-item").text(Favorite);
    //         cardFooter.append(buttonInFooter);

    //         cocktailCard.append(cardContent, cardFooter);







cocktailsResultsBox.append(cocktailHtml);

}

function retrieveCocktailsInfo(event) {
  // prevent page from refreshing
  event.preventDefault();
  console.log(cocktailInput.val());

  // This url will be the results of the users option to search alcoholic and non-alcholic drinks
  const urlAlcoholFilter = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${cocktailInput.val()}`;
  fetch(urlAlcoholFilter).then(function (response) {
    console.log(response.status);
    return response.json()
      .then(function (data) {
        // Object returned an array of the drinks from the category selected
        console.log(data.drinks.length);
        // This variable gives access to the drinks array that is inside the object that was returned
        let drinksObjectArray = data.drinks;
        // This loop will get the id value of the drink and call another api to get information that will be used to on the page
        for (let index = 0; index < drinksObjectArray.length; index++) {
          // This will url will be used to fetch the information with it's id number
          let searchCocktailById = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinksObjectArray[index].idDrink}`;
          console.log(searchCocktailById);
          fetch(searchCocktailById).then(function (response) {
            console.log(response.status);
            return response.json()
              .then(function (data) {
                console.log(data);
                console.log(data.drinks[0].strIngredient1);
                let test =1;
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
  modal2.dialog("close");
}
// Creates a modal to find a cocktail button is clicked
let modal2 = $("#cocktail-form").dialog({
  autoOpen: false,
  height: 200,
  width: 300,
  modal: true,
  buttons: {
    // When the find drink button is clicked it will render the results of degree of difficulty the user chose
    "Search Cocktails": retrieveCocktailsInfo,
    Cancel: function () {
      modal2.dialog("close");
    },
  },
  close: function () {
    modal2.dialog("close");
  },
});
$("#drink-btn").on("click", function () {
  modal2.dialog("open");
});

const foodCategories = "https://www.themealdb.com/api/json/v1/1/categories.php";
fetch(foodCategories).then(function (response) {
  console.log(response.status);
  response.json().then(function (data) {
    console.log(data);
  });
});

const favoriteFoods = JSON.parse(localStorage.getItem("foods")) || [];
function retrieveFoodsInfo(event) {}

//This is the function to Get a Random Food.

$(document).ready(function () {
  // Function to get a random food
  function getRandomFood() {
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
        ingredients.push(food[`strIngredient${i}`]);
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
          <button class="card-footer-item">Add to Favorites</button> 
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
    height: 200,
    width: 200,
    modal: true, // Dialogue is modal (prevents interaction with rest of page)
    buttons: {
      // Button to search for dishes
      "Search Dishes": function () {
        // Get the selected option from the dropdown
        const selectedOption = $("#food-type").val();
        // If the selected option is "A Random Dish", call the getRandomFood function
        if (selectedOption === "random-food-button") {
          getRandomFood();
        }
        if (selectedOption === "vegetarian-food-button") {
          getVegetarianFood();
        }
        if (selectedOption === "side-food-button") {
          getSideFood();
        }
        // close the modal dialogue
        modal.dialog("close");
      },
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
});

fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  .then((res) => res.json())
  .then((data) => console.log(data));


