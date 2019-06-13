$(document).ready(function(){
    $("#signup").on("click", function(){
        event.preventDefault();

        var newUser = {
            first_name: $("#firstName").val().toLowerCase(),
            last_name: $("#lastName").val().toLowerCase(),
            email: $("#email").val(),
            password: $("#password").val(),
            zipCode: $("#zipCode").val(),
            about: $("#headline").val().toLowerCase(),
        }

        console.log(newUser)
        console.log("new user info")
        const email= $('#email').val()

        var currentURL = window.location.origin;

        $.post(currentURL + "/api/users", newUser, function (data){
            localStorage.setItem('email', email)
            console.log(localStorage.email)
            location.href = "/profile.html"
            
        })



    })
})