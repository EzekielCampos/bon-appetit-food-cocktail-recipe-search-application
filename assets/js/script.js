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

  function displayFood(data) {
    const food = data.meals[0];
    const truncatedInstructions = food.strInstructions.substring(0, 200);
    const fullInstructions = food.strInstructions;
    const foodHtml = `
      <div class="card mt-3">
        <div class="card-content">
          <p class="title">${food.strMeal}</p>
          <p class="subtitle">${food.strCategory}</p>
          <img src="${food.strMealThumb}" alt="${
      food.strMeal
    }" style="width:35%">
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
    $("#dish-display").append(foodHtml);

    // Add event listener for the "Read more" link
    $(".read-more")
      .last()
      .on("click", function (event) {
        event.preventDefault();
        $(this).siblings(".more-text").toggle(); // Show the hidden text
        $(this).text(
          $(this).text() === "...Read more" ? " Show less" : "...Read more"
        ); // Toggle the link text
      });
  }

  // Initialize the dialog modal
  let modal = $("#dialog-form").dialog({
    autoOpen: false,
    height: 200,
    width: 200,
    modal: true,
    buttons: {
      "Search Dishes": function () {
        const selectedOption = $("#food-type").val();
        if (selectedOption === "random-food-button") {
          getRandomFood();
        }
        modal.dialog("close");
      },
      Cancel: function () {
        modal.dialog("close");
      },
    },
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
