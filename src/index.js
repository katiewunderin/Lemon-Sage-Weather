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
    windspeedElement.innerHTML = `${response.data.wind.speed} mph`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="temperature-icon" />`;

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
    axios.get(apiUrl).then(refreshWeather);
  }
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    return days[date.getDay()];
}
function getForecast(city) {
    let apiKey = "e223321d8eaf8o88a71dtc460e16b347";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
    axios(apiUrl).then(displayForecast); 
}
function displayForecast(response) {
    let forecastHTML = "";
    response.data.daily.forEach(function (day, index) {
        if (index >0 && index < 6) {
            forecastHTML += `
            <div class="weather-forecast-day">
                <div class="weather-forecast-date">${formatDay(day.time)}</div>
                <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
                <div class="weather-forecast-temperature">
                    <div class="weather-forecast-temperature-day">
                        <strong>${Math.round(day.temperature.maximum)}º</strong>
                    </div>
                    <div class="weather-forecast-temperature-night">
                        ${Math.round(day.temperature.minimum)}º
                    </div>
                </div>
            </div>
                    `;
        }
    });

let forecastElement = document.querySelector("#weather-forecast");
forecastElement.innerHTML = forecastHTML;
}

let searchFormElement= document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Denver");