
// This variable is where all the result cards will be appended to when they are dynamically created
const cocktailsResultsBox = $("#cocktails-content");
const cocktailInput = $("#drink-level")

// This array will hold the favorite drinks names that the user have saved
const favoriteCocktails = JSON.parse(localStorage.getItem('drinks')) || [];





function retrieveCocktailsInfo(event){

  // prevent page from refreshing
event.preventDefault();
console.log(cocktailInput.val());

// This url will be the results of the users option to search alcoholic and non-alcholic drinks
const urlAlcoholFilter = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${cocktailInput.val()}`;


fetch(urlAlcoholFilter)
  .then(function(response){
    console.log(response.status);
    response.json().then(function(data){
      // Object returned an array of the drinks from the category selected
      console.log(data.drinks.length);
    

      // This variable gives access to the drinks array that is inside the object that was returned
      let drinksObjectArray = data.drinks;


      // This loop will get the id value of the drink and call another api to get information that will be used to on the page
      for(index = 0; index < drinksObjectArray.length; index++){

          // This will url will be used to fetch the information with it's id number
          let searchCocktailById= `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinksObjectArray[index].idDrink}`;
          console.log(searchCocktailById);

          fetch(searchCocktailById)
          .then(function(response){
            console.log(response.status)
            response.json().then(function(data){
              console.log(data);
              console.log(data.drinks[0].strIngredient1);

            })
          })
      }
     
    })
  })

  
modal.dialog("close");
}



 // Creates a modal to find a cocktail button is clicked
 let modal = $( "#dialog-form" ).dialog({
    autoOpen: false,
    height: 200,
    width: 300,
    modal: true,
    buttons: {
      // When the find drink button is clicked it will render the results of degree of difficulty the user chose
      "Search Cocktails":retrieveCocktailsInfo,
      Cancel: function() {
          
        modal.dialog( "close" );
      }
    },
    close: function() {
      modal.dialog( "close" );
    }
  });



  $("#drink-btn").on("click", function(){
    modal.dialog("open");
  });

