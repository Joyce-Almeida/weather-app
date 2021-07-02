/** @format */

let currentTime = new Date();

let currentHour = currentTime.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = currentTime.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDay = weekDays[currentTime.getDay()];
let monthDay = currentTime.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
//Feature #1
let currentMonth = months[currentTime.getMonth()];

let time = document.querySelector("#time");
time.innerHTML = `${currentHour}:${currentMinutes}</br> 
${weekDay}, ${monthDay}. ${currentMonth}`;

function displaySearchInfo(response) {
  document.querySelector("#main-city").innerHTML = response.data.name;
  document.querySelector("#main-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let iconElement = document.querySelector("#mainIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  cTemp = response.data.main.temp;
}

function searchCity(city) {
  let apiKey = "4217dea4128933367f45f06f3205c24f";

  let weatherApiSearch = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(weatherApiSearch).then(displaySearchInfo);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "4217dea4128933367f45f06f3205c24f";

  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(weatherApi).then(displaySearchInfo);
}
function displayCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);

let currentCityButton = document.querySelector("#currentCity");
currentCityButton.addEventListener("click", displayCurrentWeather);

function celsiusTemp(event) {
  event.preventDefault();
  let celsiusDegrees = document.querySelector("#main-temperature");
  celsiusDegrees.innerHTML = Math.round(cTemp);
}

let cTemp = null;

function fahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitDegrees = (cTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#main-temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitDegrees);
}

let fahrenheitLink = document.querySelector("#fahrenheit-degrees");
fahrenheitLink.addEventListener("click", fahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-degrees");
celsiusLink.addEventListener("click", celsiusTemp);

searchCity("Munich");
