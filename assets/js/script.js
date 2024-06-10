
// This variable is where all the result cards will be appended to when they are dynamically created
const cocktailsResultsBox = $("#cocktails-content");
const cocktailInput = $("#drink-level")

// This array will hold the favorite drinks names that the user have saved
const favoriteCocktails = JSON.parse(localStorage.getItem('drinks')) || [];





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


function retrieveCocktailsInfo(event){

event.preventDefault();
console.log(cocktailInput.val());
$("#drink-level").val($("#start").val());


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

