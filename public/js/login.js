$(document).ready(function(){

    logIn()

    
})

function logIn () {
    $("#logIn").on("click", function(){
    event.preventDefault();
    console.log("hello")
    const email = $("#email").val()
    const password = $("#password").val()

    console.log(email)
    console.log(password)

    

    $.ajax({
        url: "api/users/" + email ,
        method: "GET"
    })
    .then(function (data) {
        console.log(data)
        if (email === data.email && password === data.password){

            localStorage.setItem('email', email);
            // localStorage.email
            console.log(localStorage.email)
            location.href = "/profile"
            // var postfirst = $("#firstName").html(data.first_name)
        } 
        else if (data.email === null){
            alert("Email does not exist")
        }
        else {
            alert("The password submitted in incorrect")
        } 
    })
    })
}

// module.exports = function(email) {

// }

