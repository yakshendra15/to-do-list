// Replace the text below with your actual API key from: https://home.openweathermap.org/api_keys
const apiKey = "7b63bfde0a22f2c2aa3861a757c86f3f"; // ⚠️ Replace this with your OpenWeatherMap API key!
const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-btn");
const weatherDetails = document.querySelector(".weather-details");
const weatherInfo = document.querySelector(".weather-info");

// Function to fetch weather data
async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        
        if (!response.ok) {
            throw new Error("Weather data not found");
        }

        const data = await response.json();
        updateUI(data);
    } catch (error) {
        alert("Please enter a valid city name");
    }
}

// Function to update the UI with weather data
function updateUI(data) {
    const location = document.querySelector(".location span");
    const temp = document.querySelector(".temp span");
    const description = document.querySelector(".description span");
    const humidity = document.querySelector(".humidity span");
    const wind = document.querySelector(".wind span");

    location.textContent = `${data.name}, ${data.sys.country}`;
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind: ${Math.round(data.wind.speed)} km/h`;

    // Reset animation
    weatherDetails.style.animation = 'none';
    weatherInfo.style.animation = 'none';
    void weatherDetails.offsetWidth; // Trigger reflow
    void weatherInfo.offsetWidth;
    weatherDetails.style.animation = null;
    weatherInfo.style.animation = null;
}

// Event listeners
searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() !== "") {
        getWeather(searchBox.value);
    }
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && searchBox.value.trim() !== "") {
        getWeather(searchBox.value);
    }
});

// Get user's location weather on page load
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`
                );
                const data = await response.json();
                updateUI(data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        });
    }
}); 