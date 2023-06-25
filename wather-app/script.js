const apikey = "7297345a5868d8d7303e37c493ca528b";

const formel = document.querySelector("form");
const weatherel = document.getElementById("weather-data");
const cityinputel = document.getElementById("city-input");

formel.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityvalue = cityinputel.value;
  getweatherdata(cityvalue);
});

async function getweatherdata(cityvalue) {
  try {
    const responce = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityvalue}&appid=${apikey}&units=metric`
    );

    if (!responce.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await responce.json();

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    console.log(data);

    const details = [
      `feels like: ${Math.round(data.main.feels_likes)}`,
      `humidity: ${data.main.humidity}%`,
      `wind speed: ${data.wind.speed} m/s`,
    ];

    weatherel.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather-icon">`;
    weatherel.querySelector(".temperature").textContent = `${temperature}°C`;
    weatherel.querySelector(".description").textContent = description;
    weatherel.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherel.querySelector(".icon").innerHTML = "";
    weatherel.querySelector(".temperature").textContent = "";
    weatherel.querySelector(".description").textContent =
      "An error occurred. Please try again later.";
    weatherel.querySelector(".details").innerHTML = "";
  }
}
