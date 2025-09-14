document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature"); // Fixed spelling
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "7eadd490d415b6b6395404c8b8417760";

    getWeatherBtn.addEventListener("click", async () => {
        const city = cityInput.value.trim();
        if(!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            console.error("Error:", error); // For debugging
            showError();
        }
    });

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        
        const response = await fetch(url);
        
        if(!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        return data;
    }

    function displayWeatherData(data) {
        console.log(data);
        const {name, main, weather} = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature: ${main.temp}°C`; // Fixed variable name
        descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    }

    function showError() {
        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
});