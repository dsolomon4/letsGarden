//add zip code to plant model
// enter user zip code to populate in local area


$(document).ready(function(){


    const email = localStorage.email


    $.ajax({
        url: "/plantData",
        method: "GET"
    })
    .then(function (data) {

        console.log(data)

    })

 
    loadUserData(email)

    searchPlants()

    loadSwaps()
 })
 
 function loadUserData(email){
     $.ajax({
         url: "api/users/" + email ,
         method: "GET"
     })
     .then(function (data) {

         localStorage.setItem('id', data.id)

     })
 }
 
 function searchPlants(){

      $("#search").on("click", function(){
        event.preventDefault();

        const search1 = $("#searchingPlant").val()

        var search1Arr = search1.split("")
        search1Arr[0] = search1Arr[0].toUpperCase()
        var findPlant = search1Arr.join("")

        const queryUrl = "./plantData"


        $.ajax({
            url: queryUrl ,
            method: "GET"
        })
        .then((result) => {
 
            result.filter( plants => plants.name === findPlant).map(plants =>
                 
                printCard(plants)

                )
          })
          .catch(err => console.log(err));

      })
 }

 function printCard(plants) {

    $("#print").empty()

        const plantCard = $("<div class='card'>");
        plantCard.append("<h3 id='card-title' class='card-title'>" + plants.name + "</h3>")
        plantCard.append("<p class='card-text'>" + plants.description + "</p>")
        plantCard.append("<span> <button class='add btn btn-outline-dark' id='add'> Add to you Garden </button>  <button class='swap btn btn-outline-dark' id='swap'> Request Swap </button> </span>")

        $("#print").append(plantCard)

        addPlants(plants)

        swapPlants(plants)
 }

function addPlants(plants){

    const userId = localStorage.id

    $("#add").on("click", function(){
        event.preventDefault();

        var newPlant = {
            plant_name: plants.name,
            description: plants.description,
            optimal_sun: plants.optimal_sun,
            when_to_plant: plants.when_to_plant,
            growing_from_seed: plants.growing_from_seed,
            spacing: plants.spacing,
            transplanting: plants.transplanting,
            watering: plants.watering,
            pests: plants.pests,
            harvesting: plants.harvesting,
            garden: true,
            request: false,
            swap: false,
            UserId: userId,
        }

        var currentURL = window.location.origin;

        $.post(currentURL + "/api/plants", newPlant, function (data){
            alert(plants.name + " has been added to your garden!")
            
        })
    })

}

function swapPlants(plants){
    const userId = localStorage.id

    $("#swap").on("click", function(){
        event.preventDefault();

        var newPlant = {
            plant_name: plants.name,
            description: plants.description,
            optimal_sun: plants.optimal_sun,
            when_to_plant: plants.when_to_plant,
            growing_from_seed: plants.growing_from_seed,
            spacing: plants.spacing,
            transplanting: plants.transplanting,
            watering: plants.watering,
            pests: plants.pests,
            harvesting: plants.harvesting,
            garden: false,
            request: true,
            swap: false,
            UserId: userId,
        }

        var currentURL = window.location.origin;

        $.post(currentURL + "/api/plants", newPlant, function (data){
            alert(plants.name + " has been requested!")
            
        })
    })  
}

function loadSwaps(){

    let user = localStorage.id
    $.ajax({
        url: "api/plants/",
        method: "GET",

    }).then( plants => {
        console.log(plants)

        for (var i = 0; i < plants.length; i++) {

            if (plants[i].swap === true  ) {
    
                console.log(plants[i].plant_name)

                let requestPlant = plants[i]

                const swapCard = $("<div class='avail col col-md-3'>");
                swapCard.append("<h3 id='card-title' class='card-title'>" + requestPlant.plant_name + "</h3>")
                swapCard.append("<button class='request btn btn-outline-dark' value='"+ requestPlant.id + "' id='request'> Request </button>")
        
                $("#print-available").append(swapCard)

                console.log(plants[i])
                request(plants)


    
            }
        }
    
    })
       
}

function request(plants){
    $(".request").on("click", function(){
        event.preventDefault();

        let user = localStorage.id

        let currentRequest = $(this).attr("value")

        console.log(plants, "request btn")

        for (var i = 0; i < plants.length; i++){

            let requestPlant = plants[i]
            if (requestPlant.id == currentRequest){
                console.log("hello")

                var newPlant = {
                    plant_name: requestPlant.plant_name,
                    description: requestPlant.description,
                    optimal_sun: requestPlant.optimal_sun,
                    when_to_plant:requestPlant.when_to_plant,
                    growing_from_seed: requestPlant.growing_from_seed,
                    spacing: requestPlant.spacing,
                    transplanting: requestPlant.transplanting,
                    watering: requestPlant.watering,
                    pests: requestPlant.pests,
                    harvesting: requestPlant.harvesting,
                    garden: false,
                    request: true,
                    swap: false,
                    UserId: user,
                }
        
                console.log(newPlant)
        
                var currentURL = window.location.origin;
        
                $.post(currentURL + "/api/plants", newPlant, function (data){
                    alert(requestPlant.plant_name + " has been requested!")
                    
                })

            }
        }
   
        
  
    })  

}