
// This variable is where all the result cards will be appended to when they are dynamically created
const cocktailsResultsBox = $("#cocktails-content");
const cocktailInput = $("#drink-level")

// This array will hold the favorite drinks names that the user have saved
const favoriteCocktails = JSON.parse(localStorage.getItem('drinks')) || [];




function retrieveCocktailsInfo(event){

  const drinksResultsArray = [];

  // prevent page from refreshing
event.preventDefault();
console.log(cocktailInput.val());

// This url will be the results of the users option to search alcoholic and non-alcholic drinks
const urlAlcoholFilter = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${cocktailInput.val()}`;

console.log(urlAlcoholFilter);

fetch(urlAlcoholFilter)
  .then(function(response){
    console.log(response.status);
    response.json().then(function(data){
      console.log(data);
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

