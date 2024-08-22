// https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}

const btn = document.querySelector(".fetchButton");
const cityInput = document.querySelector(".cityInput");
const tempDisplay = document.querySelector(".temp");
const humidityDisplay = document.querySelector(".humidity");
const descDisplay = document.querySelector(".desc");
const displaySection = document.querySelector(".displaySection");
const container = document.querySelector(".container");
const errorMsg = document.querySelector(".errorMsg");
const refreshButton = document.querySelector(".refreshButton");

async function getData(city) {
    const apiKey = "1384c2856489b8b35b3535a24b10b88f";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

function showData(data) {
    // console.log(Object.values(data));

    const kelvin = Object.values(data)[3]["temp"];
    let temp = kelvin - 273.15;
    temp = temp.toFixed(1);
    const humidity = Object.values(data)[3]["humidity"];
    const desc = Object.values(data)[1][0]["description"];

    tempDisplay.innerHTML = `${temp}C`;
    humidityDisplay.innerHTML = `Humidity ${humidity}`;
    descDisplay.innerHTML = desc;

    displaySection.style.display = "flex";
    errorMsg.style.display = "none";
}

btn.addEventListener("click", async () => {
    const city = cityInput.value;
    const data = await getData(city);
    showData(data);
});

refreshButton.addEventListener("click", () => {
    displaySection.style.display = "none";
    errorMsg.style.display = "flex";
    cityInput.value = "";
});