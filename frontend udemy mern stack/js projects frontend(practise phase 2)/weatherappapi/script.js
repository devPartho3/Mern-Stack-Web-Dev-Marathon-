document.addEventListener("DOMContentLoaded", () => {
    const cityinput = document.getElementById("cityinput");
    const weatherbtn = document.getElementById("getweatherbtn");
    const weatherinfo = document.getElementById("weatherinfo");
    const temparature = document.getElementById("temparature");
    const Citynamedisplay = document.getElementById("cityname");
    const description = document.getElementById("description");
    const errormsg = document.getElementById("errormsg");
    const apiKey = "25857290489cef3fa379388cbc9a3093";

    weatherbtn.addEventListener("click", async () => {
        const city = cityinput.value.trim();
        if (!city) {
            showerror("Please enter a city name!");
            return;
        }

        try {
            const weatherdata = await Fetchweatherdata(city);
            displayweatherdata(weatherdata);
        } catch (error) {
            showerror(error.message);
        }
    });

    async function Fetchweatherdata(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City Not Found!!!");
        }

        const data = await response.json();
        return data;
    }

    function displayweatherdata(data) {
        const { name, weather, main } = data;
        Citynamedisplay.textContent = name;
        temparature.textContent = `Temperature: ${main.temp}°C`;
        description.textContent = `Weather: ${weather.description}`;

        weatherinfo.classList.remove("hidden");
        errormsg.classList.add("hidden");
    }

    function showerror(msg) {
        errormsg.textContent = msg || "Something went wrong!";
        errormsg.classList.remove("hidden");
        weatherinfo.classList.add("hidden");
    }
});

