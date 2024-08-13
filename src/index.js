function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windspeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
    
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windspeedElement.innerHTML = `${response.data.wind.speed}mph`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src= "${response.data.condition.icon_url}" class = "weather-app-icon" />`;

    getForecast(response.data.city);
}
function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];
    
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return    `${day}     ${hours}:${minutes}`;
}
function searchCity(city) {
    let apiKey = "e223321d8eaf8o88a71dtc460e16b347";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast );
  }

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
function getForecast(city) {
    let apiKey = "e223321d8eaf8o88a71dtc460e16b347";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
    axios(apiUrl).then(displayForecast); 
}
function displayForecast(response) {
    console.log(response.data);

    let forecastHTML = "";

    response.data.daily.forEach(function (day) {
        forecastHTML = 
            forecastHTML +
            `
                <div class="forecast">
                    <div class="forecast-day">
                        <div class="forecast-date">${day}</div>
                        <div class="forecast-icon"> ⛅️ </div>
                        <div class="forecast-temp-day">H - <strong> </strong><small>℉</small></div>
                        <div class="forecast-temp-night">L - <strong> </strong><small>℉</small></div>
                    </div>
                </div>
            `;
    });

let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHTML;
}

let searchFormElement= document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Denver");