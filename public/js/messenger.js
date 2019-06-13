$(document).ready(function(){

    const email = localStorage.email
 
    loadUserData(email)

    searchPlants()

    loadSwaps()
 })