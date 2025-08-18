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

  let montrealElement = document.querySelector("#montreal");
  if (montrealElement) {
    let montrealDateElement = montrealElement.querySelector(".date");
    let montrealTimeElement = montrealElement.querySelector(".time");
    let montrealTime = moment().tz("America/Montreal");

    montrealDateElement.innerHTML = montrealTime.format("MMMM Do YYYY");
    montrealTimeElement.innerHTML = montrealTime.format("h:mm:ss A");
  }
}

let selectedCityTimeZone = null;
let cityInterval = null;

function updateCity(event) {
  selectedCityTimeZone = event.target.value;

  if (!selectedCityTimeZone) return;

  let selectedCityName;

  if (selectedCityTimeZone === "current") {
    selectedCityTimeZone = moment.tz.guess();

    selectedCityName =
      selectedCityTimeZone === "America/Regina"
        ? "Yorkton"
        : selectedCityTimeZone.replace("_", " ").split("/")[1];
  } else {
    selectedCityName = event.target.options[event.target.selectedIndex].text;
  }
  document.querySelector("#static-cities").style.display = "none";

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
      <div class="city-info">
        <h2>${cityName}</h2>
        <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
      </div>
      <div class="time">${cityTime.format("h:mm:ss A")}</div>
    </div>
  `;
}

document.querySelector("#city-select").addEventListener("change", updateCity);
setInterval(updateTime, 1000);

document
  .querySelector("#home-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("#static-cities").style.display = "block";
    document.querySelector("#selected-city").innerHTML = "";
    document.querySelector("#city-select").value = "";

    if (cityInterval) {
      clearInterval(cityInterval);
      cityInterval = null;
    }
  });
