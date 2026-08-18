document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");
  const airQuality = document.getElementById("air-quality");
  const errorMessage = document.getElementById("error-message");

  const apiKey = "25857290489cef3fa379388cbc9a3093";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const weatherData = await fetchWeatherData(city);
      const airData = await fetchAirQuality(weatherData.coord.lat, weatherData.coord.lon);
      displayWeatherData(weatherData, airData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (!res.ok) throw new Error("Weather error");
    return await res.json();
  }

  async function fetchAirQuality(lat, lon) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    if (!res.ok) throw new Error("Air quality error");
    return await res.json();
  }

  function displayWeatherData(data, air) {
    const { name, main, weather, wind: windData } = data;
    const aqi = air.list[0].main.aqi;

    cityName.textContent = name;
    temperature.textContent = `Temperature: ${main.temp} °C`;
    description.textContent = `Weather: ${weather[0].description}`;
    humidity.textContent = `Humidity: ${main.humidity}%`;
    wind.textContent = `Wind Speed: ${windData.speed} m/s`;
    airQuality.textContent = `Air Quality Index: ${aqi}`;

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");

    logWeatherToBackend(name, main.temp, weather[0].description, main.humidity, windData.speed, aqi);
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }

  function logWeatherToBackend(city, temp, desc, humidity, wind, aqi) {
    fetch("log_weather.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        city, temperature: temp, description: desc, humidity, wind, aqi
      })
    });
  }
});
