const apiKey = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={33033f55ad7de380f9f9c2c6d8ce431f}';

const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const historyList = document.getElementById('history-list');
const currentWeatherInfo = document.getElementById('current-weather-info');
const forecastContainer = document.getElementById('forecast-container');

searchBtn.addEventListener('click', () => {
    const city = searchInput.value;
    if (city) {
        fetchWeatherData(city);
        addToHistory(city);
    }
});

historyList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        const city = event.target.textContent;
        fetchWeatherData(city);
    }
});

function addToHistory(city) {
    const li = document.createElement('li');
    li.textContent = city;
    historyList.appendChild(li);
}

async function fetchWeatherData(city) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const [currentWeatherRes, forecastRes] = await Promise.all([
            fetch(currentWeatherUrl),
            fetch(forecastUrl),
        ]);

        const [currentWeatherData, forecastData] = await Promise.all([
            currentWeatherRes.json(),
            forecastRes.json(),
        ]);

        displayCurrentWeather(currentWeatherData);
        displayForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data) {
    const { name, main, wind, weather } = data;
    const date = new Date().toLocaleDateString();
    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;

    currentWeatherInfo.innerHTML = `
        <h3>${name} (${date})</h3>
        <img src="${iconUrl}" alt="${weather[0].description}">
        <p>Temperature: ${main.temp}°C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
    `;
    
    }
    
    function displayForecast(data) {
        const dailyForecasts = data.list.filter((forecast) =>
            forecast.dt_txt.endsWith("12:00:00")
        );
    
        forecastContainer.innerHTML = "";
    
        dailyForecasts.forEach((forecast) => {
            const { main, weather, wind, dt_txt } = forecast;
            const date = new Date(dt_txt).toLocaleDateString();
            const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
    
            const forecastDiv = document.createElement("div");
            forecastDiv.innerHTML = `
                <h4>${date}</h4>
                <img src="${iconUrl}" alt="${weather[0].description}">
                <p>Temperature: ${main.temp}°C</p>
                <p>Humidity: ${main.humidity}%</p>
                <p>Wind Speed: ${wind.speed} m/s</p>
            `;
            forecastContainer.appendChild(forecastDiv);
        });
    }