function updateTime() {
  let losAngelesElement = document.querySelector("#los-angeles");
  if (losAngelesElement) {
    let losAngelesDateElement = losAngelesElement.querySelector(".date");
    let losAngelesTimeElement = losAngelesElement.querySelector(".time");
    let losAngelesTime = moment().tz("America/Los_Angeles");

    losAngelesDateElement.innerHTML = losAngelesTime.format("MMMM Do YYYY");
    losAngelesTimeElement.innerHTML = losAngelesTime.format("h:mm:ss A");
  }

  let sydneyElement = document.querySelector("#sydney");
  if (sydneyElement) {
    let sydneyDateElement = sydneyElement.querySelector(".date");
    let sydneyTimeElement = sydneyElement.querySelector(".time");
    let sydneyTime = moment().tz("Australia/Sydney");

    sydneyDateElement.innerHTML = sydneyTime.format("MMMM Do YYYY");
    sydneyTimeElement.innerHTML = sydneyTime.format("h:mm:ss A");
  }
}

let selectedCityTimeZone = null;
let cityInterval = null;

function updateCity(event) {
  selectedCityTimeZone = event.target.value;
  let selectedCityName = event.target.options[event.target.selectedIndex].text;

  if (selectedCityTimeZone === "current") {
    selectedCityTimeZone = moment.tz.guess();
    selectedCityName = "Your Location";
  }

  renderSelectedCity(selectedCityName);
  if (cityInterval) clearInterval(cityInterval);
  cityInterval = setInterval(() => renderSelectedCity(selectedCityName), 1000);
}

function renderSelectedCity(cityName = "") {
  if (!selectedCityTimeZone) return;

  let cityTime = moment().tz(selectedCityTimeZone);
  let selectedCityElement = document.querySelector("#selected-city");
  selectedCityElement.innerHTML = `
    <div class="city">
      <h2>${cityName}</h2>
      <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
      <div class="time">${cityTime.format("h:mm:ss A")}</div>
    </div>
  `;
}

document.querySelector("#city-select").addEventListener("change", updateCity);
setInterval(updateTime, 1000);
