/*jshint esversion: 8*/


/*
Define Global variables
*/

const apiKey = 'fa46eaac6579fe391472edd920920579';
const cityName = document.querySelector('#city-input');
const form = document.querySelector('form');
const weatherData = document.querySelector('#weather-data'); //For the whole visible weather section
let weatherIcon = weatherData.querySelector('.icon');
let temperatureElement = weatherData.querySelector('.temperature');
let descriptionElement = weatherData.querySelector('.description'); // For weather status as a word
let detailsElement = weatherData.querySelector('.details'); //Contains feels Like, humidity, and wind speed

/*
DEFINE GLOBAL FUNCTIONS
*/

// Define fetch function
async function getWeather(city){
    try {
        let respose = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if(!respose.ok){
            throw new Error('Network error');
        }
        let data = await respose.json();
        let weather = extractData(data);
        updateDocument(weather);

    } catch (error) {}
}

//Define extractData function to extract weather details
function extractData(respose){
    let temperature = respose.main.temp;
    let description = respose.weather[0].description; //Stores weather status
    let icon = respose.weather[0].icon;
    let details = {
        'feelsLike': `${respose.main.feels_like}`,
         'humidity' : `${respose.main.humidity}`,
         'windSpeed' : `${respose.wind.speed}`
    };
    let weatherArray = [temperature, description, icon, details]; //Collectin them in an array to return them all
    return weatherArray;
}

//Define updateDocument function which update our HTML content
function updateDocument(weather){
    weatherIcon.innerHTML = `<img src = "http://openweathermap.org/img/wn/${weather[2]}.png" alt="${weather[1]}">`;
    temperatureElement.textContent = `${weather[0]} °C`;
    descriptionElement.textContent = `${weather[1]}`;
    detailsElement.innerHTML = `
    <div>Feels like: ${weather[3].feelsLike} °C</div>
    <div>Humidity: ${weather[3].humidity}%</div>
    <div>Wind Speed: ${weather[3].windSpeed} m/s</div>`;
}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    getWeather(cityName.value);
});
