const city = document.querySelector(".location__text");
const temp = document.querySelector(".weather__temp");
const icon = document.querySelector(".weather__icon");
const API_KEY = "2a23ab0267ee635feeaae452929f0fe0";

const getIcon = (description) => {
  let number = "01";
  switch (description) {
    case "clear sky":
      number = "01";
      break;
    case "few clouds":
      number = "02";
      break;
    case "scattered clouds":
      number = "03";
      break;
    case "broken clouds":
      number = "04";
      break;
    case "shower rain":
      number = "09";
      break;
    case "rain":
      number = "10";
      break;
    case "thunderstorm":
      number = "11";
      break;
    case "snow":
      number = "13";
      break;
    case "mist":
      number = "50";
      break;
    default:
      number = "01";
      break;
  }
  return number;
};

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = data.name;
      icon.src = `http://openweathermap.org/img/wn/${getIcon(
        data.weather[0].description
      )}${new Date().getHours() > 18 ? "n" : "d"}@2x.png`;
      temp.innerText = `${data.main.temp}°C`;
    });
}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
