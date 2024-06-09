

const filterByIngredient = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

const searchByIngredient = "https://www.themealdb.com/api/json/v1/1/filter.php?i=avocado";

const test = "https://www.themealdb.com/api/json/v1/1/categories.php";

fetch(filterByIngredient).then(function(response){


    console.log(response.status);
    response.json().then(function(data){

        console.log(data);

    })
})

fetch(searchByIngredient).then(function(response){


    console.log(response.status);
    response.json().then(function(data){

        console.log(data);

    })
})

fetch(test).then(function(response){


    console.log(response.status);
    response.json().then(function(data){

        console.log(data);

    })
})



const cocktailCategory = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink";

fetch(cocktailCategory).then(function(response){


    console.log(response.status);
    response.json().then(function(data){

        console.log(data);

    })
})

const cocktailId = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15300";
fetch(cocktailId).then(function(response){


    console.log(response.status);
    response.json().then(function(data){

        console.log(data);

    })
})



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



 // Creates a modal for when the add task button is clicked
 let modal = $( "#dialog-form" ).dialog({
    autoOpen: false,
    height: 200,
    width: 200,
    modal: true,
    buttons: {
      // When the add task button is clicked it will add the new task to the page
      "Search Cocktails":function(){
        console.log($("#drink-level").val());
        $("#drink-level").val($("#start").val());

        modal.dialog("close");
      },
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

