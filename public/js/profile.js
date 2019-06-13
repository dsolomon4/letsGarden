//add button for module with more data on plant

$(document).ready(function () {

    const email = localStorage.email

    loadUserData(email)

    

})

function loadUserData(email) {
    $.ajax({
            url: "api/users/" + email,
            method: "GET"
        })
        .then(function (data) {
            console.log(data)

            var firstNameArr = data.first_name.split("")
            firstNameArr[0] = firstNameArr[0].toUpperCase()
            var firstName = firstNameArr.join("")

            var postFirst = $("#firstName").html("Hey there, " + firstName)

            var postLocation = $("#location").html("Location: " + data.zipCode)

            var postAbout = $("#about").html(data.about)

            loadPlants(data)
        })
}

function loadPlants(data) {
    console.log(data.id)

    const userId = data.id

    $.ajax({
        method: 'GET',
        url: '/api/plants/' + userId ,
        where: {
            UserId: userId
        }
    }).then(result => {

        console.log(result, "testing")
        
        let findUser = ""
        
    for (var i = 0; i < result.length; i++){
        // if (result === undefined || result.length == 0 || result[i].UserId !== userId ) {
        //     var postNull = $("#null-plant").html("<a role='button' href='/search' id='btn' class='btn btn-success'> Add Some Plants </a>")
        // } else{
        //     $("#null-plant").empty()
        // }
        let findUser = result[i].UserId


    }

        if (result === undefined || result.length == 0 || findUser !== userId ) {
            var postNull = $("#null-plant").html("<a role='button' href='/search' id='btn' class='btn btn-success'> Add Some Plants </a>")
        } 
        // if (findUser === userId) {
            
          
            
        // }


        printGardenData(result, userId)

        printSwapData(result, userId)

        printRequestData(result, userId)

        swapPlant(data)

        removePlant(data)

        requestButtons(data)

        loadModal(result)
    })
}

function removePlant(data) {
    $(".remove-plant").on("click", function () {
        event.preventDefault();

        var id = $(this).attr('value');

        $.ajax({
            method: "DELETE",
            url: "/api/plants/" + id
        }).then(
            location.reload()

        );

    })
}

function swapPlant(data) {
    $(".swap-plant").on("click", function () {
        event.preventDefault();

        var plantId = $(this).attr('value');

        $.ajax({
            method: 'PUT',
            url: '/api/plants/' + plantId,
            data: {
                swap: true,
            },
            where: {
                id: plantId
            }
        }).then(result => {
            location.reload()

        })

    })
}

function printGardenData(result, userId) {
    
    for (var i = 0; i < result.length; i++) {

        if (result[i].garden === true && result[i].UserId === userId ) {

            const gardenCard = $("<tr>");

            gardenCard.append("<td>" + result[i].plant_name + "</h3>")
            gardenCard.append("<td> <button class='add remove-plant btn btn-success btn-sm' id='remove' value=" + result[i].id + "> Remove </button> </td>")
            gardenCard.append("<td> <button class='swap swap-plant btn btn-success btn-sm' id='swap' value=" + result[i].id + "> Swap </button> </td>")
            gardenCard.append("<td> <button data-toggle='modal' data-target='#exampleModalCenter'  class='info btn btn-success btn-sm' id='info' value=" + result[i].id + "> Info </button> </td>")


            $("#print-garden").append(gardenCard)
            $("#null-plant").hide()


        }
    }

}

function printSwapData(result, userId) {

    for (var i = 0; i < result.length; i++) {

        if (result[i].garden === true && result[i].swap === true && result[i].UserId === userId)  {

            const gardenCard = $("<tr>"); 

            gardenCard.append("<td>" + result[i].plant_name + "</h3>")
            gardenCard.append("<td> <button class=' remove-swap add btn btn-success btn-sm' value=" + result[i].id + "> Remove </button> </td>")

            $("#print-swap").append(gardenCard)
            

        }
    }

    $(".remove-swap").on("click", function () {
        event.preventDefault();

        var plantId = $(this).attr('value');

        // swap in database to false
        $.ajax({
            method: 'PUT',
            url: '/api/plants/' + plantId,
            data: {
                swap: false,
            },
            where:{
                id: plantId
            }
        }).then(result => {
            location.reload()

        })
    })

}


function printRequestData(result, userId) {


    for (var i = 0; i < result.length; i++) {

        if (result[i].request === true && result[i].UserId === userId) {

            const gardenCard = $("<tr>");

            gardenCard.append("<td>" + result[i].plant_name + "</h3>")
            gardenCard.append("<td> <button class='add remove-request btn btn-success btn-sm' value=" + result[i].id + "> Remove </button> </td>")
            gardenCard.append("<td> <button class='swap add-request btn btn-success btn-sm' value=" + result[i].id + "> Add </button> </td>")

            $("#print-request").append(gardenCard)

        }
    }

    
}

function requestButtons(data){
    $(".remove-request").on("click", function () {
        event.preventDefault();

        
        var id = $(this).attr('value');

        $.ajax({
            method: "DELETE",
            url: "/api/plants/" + id
        }).then(
            location.reload()

        );
    })

    $(".add-request").on("click", function () {
        event.preventDefault();

        const plantId = $(this).attr('value');

        console.log(plantId)

        const updateData= {
            request: false,
            garden: true

        }

        // add to garden
        $.ajax({
            method: 'PUT',
            url: '/api/plants/' + plantId,
            data: updateData,
            where:{
                id: plantId
            }
        }).then(result => {
            location.reload()
            
        })
    })
}

function loadModal(result) {
    $(".info").on("click", function () {
        event.preventDefault();

        $(".modal-body").empty()

        var currentId = $(this).attr('value');
             console.log(currentId)

             console.log(result)
            for (var i =0; i < result.length; i++){

                if ( result[i].id == currentId){




            $("#modal-title").html(result[i].plant_name)

            const infoModal = $("<div>");

            infoModal.append("<p>" + result[i].description + "</p>")
            infoModal.append("<p> When to Plant: " + result[i].when_to_plant + "</p>")
            infoModal.append("<p>" + result[i].growing_from_seed + "</p>")
            infoModal.append("<p>" + result[i].spacing + "</p>")
            infoModal.append("<p>" + result[i].transplanting + "</p>")
            infoModal.append("<p>" + result[i].watering + "</p>")
            infoModal.append("<p>" + result[i].optimal_sun + "</p>")
            infoModal.append("<p> Stay Away From:" + result[i].pests + "</p>")
            infoModal.append("<p> When to Harvest" + result[i].harvesting + "</p>")

            $(".modal-body").append(infoModal)

                    console.log("hello")
                }
            }

            
;


      

    })
}