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