const filterByIngredient =
  "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

const searchByIngredient =
  "https://www.themealdb.com/api/json/v1/1/filter.php?i=avocado";

const test = "https://www.themealdb.com/api/json/v1/1/categories.php";

fetch(filterByIngredient).then(function (response) {
  console.log(response.status);
  response.json().then(function (data) {
    console.log(data);
  });
});

fetch(searchByIngredient).then(function (response) {
  console.log(response.status);
  response.json().then(function (data) {
    console.log(data);
  });
});

fetch(test).then(function (response) {
  console.log(response.status);
  response.json().then(function (data) {
    console.log(data);
  });
});

const cocktailCategory =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink";

fetch(cocktailCategory).then(function (response) {
  console.log(response.status);
  response.json().then(function (data) {
    console.log(data);
  });
});

const cocktailId =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15300";
fetch(cocktailId).then(function (response) {
  console.log(response.status);
  response.json().then(function (data) {
    console.log(data);
  });
});

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
    // Function to extract ingredients
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
          <a href="#" class="card-footer-item">Add to Favorites</a>
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
        // close the modal dialogue
        modal.dialog("close");
      },
      // Button to cancel and close the dialogue
      Cancel: function () {
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

// const listC = "https://the-cocktail-db3.p.rapidapi.com";

// fetch(listC,{
//     method:"GET",
//     headers:{
//         'x-rapidapi-host': 'the-cocktail-db3.p.rapidapi.com',
//         'x-rapidapi-key': '25a20f3a22msh0df047874d6bf0dp16cf1ejsn7d34746f0d3e'
//     }
// }
// ).then(function(response){

//     console.log(response.status);
//     response.json().then(function(data){

//         console.log(data);

//     })
// })
