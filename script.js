const apiKey = "19e81965639569d68925755de80a1b80";  // <-- replace with your OpenWeatherMap API key

const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const geoBtn = document.getElementById("geoBtn");
const weatherResult = document.getElementById("weatherResult");
const cityNameEl = document.getElementById("cityName");
const tempEl = document.getElementById("temp");
const descEl = document.getElementById("desc");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const iconEl = document.getElementById("weatherIcon");

getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) return alert("Please enter a city name");
  fetchWeather(`q=${city}`);
});

geoBtn.addEventListener("click", () => {
  if (!navigator.geolocation) return alert("Geolocation not supported");
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const {latitude, longitude} = pos.coords;
      fetchWeather(`lat=${latitude}&lon=${longitude}`);
    },
    () => alert("Unable to fetch your location")
  );
});

async function fetchWeather(query) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    updateUI(data);
  } catch (err) {
    alert(err.message);
  }
}

function updateUI(data) {
  cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  tempEl.textContent = data.main.temp.toFixed(1);
  descEl.textContent = data.weather[0].description;
  humidityEl.textContent = data.main.humidity;
  windEl.textContent = data.wind.speed;
  iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  iconEl.alt = data.weather[0].description;
  weatherResult.classList.remove("hidden");
}
