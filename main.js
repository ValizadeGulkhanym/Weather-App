const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".weather img");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".cities li");

let cityInput = "London";
dayOfTheWeek();
cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    cityInput = e.target.innerHTML;
    fetchWeatherData();
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (search.value.length == 0) {
    alert("Please type in a city name");
  } else {
    cityInput = search.value;
    fetchWeatherData();
    search.value = "";
  }
});

function dayOfTheWeek(day, month, year) {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekdays[new Date(`${year}-${month}-${day}`).getDay()];
}

function fetchWeatherData() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=ac8012f2581aeb2fd39e324c430abd85&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      temp.innerHTML = Math.floor(data.main.temp) + "&#176";
      conditionOutput.innerHTML = data.weather[0].main;
      cloudOutput.innerHTML = data.clouds.all + "%";
      humidityOutput.innerHTML = data.main.humidity + "%";
      windOutput.innerHTML = data.wind.speed + "km/h";
      nameOutput.innerHTML = data.name;

      if (conditionOutput.innerHTML === "Rain") {
        icon.src = "./icons/night/rain_2469994.png";
      } else if (conditionOutput.innerHTML === "Clear") {
        icon.src = "./icons/day/sun_869869.png";
      } else if (conditionOutput.innerHTML === "Clouds") {
        icon.src = "./icons/day/partly-cloudy.jpg";
      } else if (conditionOutput.innerHTML === "Snow") {
        icon.src = "./icons/day/snow_day.png";
      } else if (
        conditionOutput.innerHTML === "Haze" ||
        conditionOutput.innerHTML === "Mist" ||
        conditionOutput.innerHTML === "Smoke"
      ) {
        icon.src = "./icons/night/foggy-icon-5.jpg";
      } else {
        return;
      }

      const currentDate = new Date();
      const localDate = new Date(currentDate.getTime() + data.timezone * 1000);

      const day = localDate.getDate();
      const month = localDate.getMonth() + 1;
      const year = localDate.getFullYear();
      const weekday = dayOfTheWeek(day, month, year);

      const hours = localDate.getHours();
      const minutes = localDate.getMinutes();
      const time = `${hours}:${minutes.toString().padStart(2, "0")}`;

      dateOutput.innerHTML = `${weekday} ${day}, ${month} ${year}`;
      timeOutput.innerHTML = time;
    });
}

fetchWeatherData();
