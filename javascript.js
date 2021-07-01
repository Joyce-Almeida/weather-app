/** @format */

let currentTime = new Date();

let currentHour = currentTime.getHours();
let currentMinutes = currentTime.getMinutes();

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

//Feature #2
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

searchCity("Munich");

//Feature #3
function celsiusTemp(event) {
  event.preventDefault();
  let celsiusDegrees = document.querySelector("#main-temperature");
  celsiusDegrees.innerHTML = `16`;
}
let cTemp = document.querySelector("#celsius-degrees");
cTemp.addEventListener("click", celsiusTemp);

function fahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitDegrees = document.querySelector("#main-temperature");
  fahrenheitDegrees.innerHTML = `60`;
}
let fTemp = document.querySelector("#fahrenheit-degrees");
fTemp.addEventListener("click", fahrenheitTemp);
