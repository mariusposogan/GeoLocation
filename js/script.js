window.onload = onHtmlLoaded;

function onHtmlLoaded() {
    navigator.geolocation.getCurrentPosition(success, error);
}


function success(response) {
    console.log(response);
    const lat = response.coords.latitude;
    const lng = response.coords.longitude;
    console.log(lat);
    console.log(lng);
    getCityCoords(lat, lng);
}      


function error() {
    console.log("Oops! Something went wrong!");
}


function getCityCoords(lat, lng) {
    const url ="https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyByRHOiozkj_soGx4UcLX_7zZy3mi4dkMw";
    
    fetch(url,{
        method:"GET",
        }).then(function(response){
                return response.json();
            }).then(getCityName).then(getWeather);
}

//get city name based on the coordinates returned from getCityCoords
//get the required form in order to make the request in getWeather
function getCityName(response){
    console.log(response);
    const city=response.results[1].address_components[1].long_name;
    cityName=city.replace(' ', "_").replace("-","_");
    console.log(cityName);
    return cityName;
}



function getWeather() {
    const url = "https://api.wunderground.com/api/cfbfc5f603141e07/conditions/q/RO/" + cityName + ".json";
    fetch(url,{
          method:"GET",
    }).then(function(response){
            return response.json();
            }).then(function(response){
                console.log(response);
                const temperatureElement= document.getElementById("temperature");
                const tempC = response.current_observation.temp_c;
                temperatureElement.innerText="The temperature in " + cityName.replace("_", ' ').replace("_","-") + " is: " + tempC + " degrees C"
            })
}