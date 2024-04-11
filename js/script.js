// Add student ID and name
const studentInfo = document.getElementById('student-info');
studentInfo.textContent = 'Student ID: 200594021, Name: Kiên Trần';

// OpenWeather API key (replace with your own)
const apiKey = 'f97647f421add3d90fadbfd209555763';

// Function to fetch weather data
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

// Function to display weather data
function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherInfo.innerHTML = `
        <h2>Weather in ${data.name}, ${data.sys.country}</h2>
        <img src="${iconUrl}" alt="Weather Icon">
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Feels Like: ${data.main.feels_like}°C</p>
        <p>Description: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

// Function to display error message
function displayError(message) {
    const errorMsg = document.getElementById('error-msg');
    errorMsg.textContent = message;
}

// Function to fetch city suggestions
async function getCitySuggestions(query) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching city suggestions:', error);
        return [];
    }
}

// Function to display city suggestions
function displayCitySuggestions(suggestions) {
    const datalist = document.getElementById('city-suggestions');
    datalist.innerHTML = '';

    suggestions.forEach(suggestion => {
        const option = document.createElement('option');
        option.value = `${suggestion.name}, ${suggestion.country}`;
        datalist.appendChild(option);
    });
}

// Event listener for city input
const cityInput = document.getElementById('city-input');
cityInput.addEventListener('input', async () => {
    const query = cityInput.value;
    if (query.length >= 3) {
        const suggestions = await getCitySuggestions(query);
        displayCitySuggestions(suggestions);
    } else {
        displayCitySuggestions([]);
    }
});

// Event listener for form submission
const weatherForm = document.getElementById('weather-form');
weatherForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const city = cityInput.value;

    try {
        const weatherData = await getWeather(city);
        displayWeather(weatherData);
        displayError('');
    } catch (error) {
        displayError('Error: ' + error.message);
        alert('City not found. Please enter a valid city name.');
    }
});

// Tutorial followed: https://openweathermap.org/current