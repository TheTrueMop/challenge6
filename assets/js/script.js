
var count = 0;
var apiKey = 'bb976231b165092658f667f776dc38ed'
var userSearch = ""
var geoAPIurl;
var lat;
var lon;
var currentDate = moment().format("MMMM, Do, YYYY");
var date1 = moment().add(1, 'days').format("MMMM Do");
var date2 = moment().add(2, 'days').format("MMMM Do");
var date3 = moment().add(3, 'days').format("MMMM Do");
var date4 = moment().add(4, 'days').format("MMMM Do");
var date5 = moment().add(5, 'days').format("MMMM Do");
if(count == 0){
    userSearch = "Austin"
    getLatLong();
    count++;
}
let itemsArray = []
itemsArray = JSON.parse(localStorage.getItem("items")) || [];

function getLatLong() {
    geoAPIurl = `https://api.openweathermap.org/geo/1.0/direct?q=${userSearch}&limit=5&appid=${apiKey}`
    fetch(geoAPIurl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            lat = data[0].lat
            lon = data[0].lon
            currentData();
        })
};


function currentData() {
    var weatherAPIUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;
    fetch(weatherAPIUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            $("#current-temp").text(data.current.temp + "°F");
            $("#current-wind").text(data.current.wind_speed + " mph");
            $("#current-humidity").text(data.current.humidity + "%");
            $("#current-uv").text(data.current.uvi + " UV Index");
            $("#current-city").text(userSearch)
            $("#currentDate").text(currentDate)
            $("#current-uv").text(data.current.uvi + " UV Index")
            $("#day1Temp").text(data.daily[0].temp.day + "°F")
            $("#day1Wind").text(data.daily[0].wind_speed + " mph")
            $("#day1Humidity").text(data.daily[0].humidity + "%")
            $("#day1Date").text(date1)
            $("#day2Temp").text(data.daily[1].temp.day + "°F")
            $("#day2Wind").text(data.daily[1].wind_speed + " mph")
            $("#day2Humidity").text(data.daily[1].humidity + "%")
            $("#day2Date").text(date2)
            $("#day3Temp").text(data.daily[2].temp.day + "°F")
            $("#day3Wind").text(data.daily[2].wind_speed + " mph")
            $("#day3Humidity").text(data.daily[3].humidity + "%")
            $("#day3Date").text(date3)
            $("#day4Temp").text(data.daily[3].temp.day + "°F")
            $("#day4Wind").text(data.daily[3].wind_speed + " mph")
            $("#day4Humidity").text(data.daily[3].humidity + "%")
            $("#day4Date").text(date4)
            $("#day5Temp").text(data.daily[4].temp.day + "°F")
            $("#day5Wind").text(data.daily[4].wind_speed + " mph")
            $("#day5Humidity").text(data.daily[4].humidity + "%")
            $("#day5Date").text(date5)
        })
};
function updateLocalStorage() {
    // adds buttons to local storage section of html that will search for the city
    for(var i = 0; i < itemsArray.length; i++){
        var button = $("<button>");
        button.text(itemsArray[i]);
        button.attr("class", "btn btn-info btn-block");
        button.attr("id", "city-button");
        $("#local-storage").append(button);
    }    
}
document.getElementById("Search-Btn").addEventListener("click", function (event) {
    event.preventDefault()
    userSearch = $("#search-input").val();
    getLatLong();
});

// Local Storage
$("#Search-Btn").on('click', function () {
    if(itemsArray.length < 8){
        itemsArray.push($("#search-input").val());
        localStorage.setItem("items", JSON.stringify(itemsArray));
    }else{
        itemsArray.shift();
        itemsArray.push($("#search-input").val());
        localStorage.setItem("items", JSON.stringify(itemsArray));
    }
});
updateLocalStorage();
$(document).on("click", "#city-button", function () {
    userSearch = $(this).text();
    getLatLong();
});