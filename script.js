const geoCodingURL = "https://api.openweathermap.org/geo/1.0/direct?limit=1&appid=13abeb5fbf5e7cf5b0407c2eb8b31f08&q=";
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=13abeb5fbf5e7cf5b0407c2eb8b31f08&";
const apiKey = "13abeb5fbf5e7cf5b0407c2eb8b31f08";

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let now = new Date();

let dayName = days[now.getDay()];
let date = now.getDate();
let monthName = months[now.getMonth()];
let year = now.getFullYear();

let search = document.querySelector("#search-box");
let btn = document.querySelector("#search-btn");
let city = document.querySelector("#city");
let currDetails = document.querySelector("#today");

// accessing all the elements
let pillInfo = document.querySelector("#pill-info");
let infoContainer = document.querySelector("#info-area");
let infoContainerStart = document.querySelector("#info-area-start");
let infoContainerError = document.querySelector("#info-area-error");
let degree = document.querySelector("#degree span");
let feels_like = document.querySelector("#feels-like span");
let hum = document.querySelector("#hum");
let win = document.querySelector("#win");
let pres = document.querySelector("#pres");
let weatherIconSrc = "https://openweathermap.org/payload/api/media/file/";
let weatherIcon = document.querySelector("#img-div img");
let popBtns = document.querySelectorAll(".pop-city");

function setValues() {
    degree.innerText = infoArr[0];
    feels_like.innerText = infoArr[1];
    hum.innerText = infoArr[2];
    win.innerText = infoArr[3];
    pres.innerText = infoArr[4];
    weatherIcon.setAttribute("src", weatherIconSrc + infoArr[5] + ".png");
    pillInfo.innerText = weatherDescr;
    infoContainerError.style.display = "none";
    infoContainerStart.style.display = "none";
    infoContainer.style.display = "flex";
}

btn.addEventListener("click", async () => {
    currDetails.innerHTML = `${dayName}, ${date} ${monthName} ${year}`;

    const rawSearchVal = search.value.trim();
    const searchVal = encodeURIComponent(rawSearchVal);

    search.value = "";
    infoArr = [];

    if (rawSearchVal.length < 3) {
        infoContainerStart.style.display = "none";
        infoContainer.style.display = "none";
        infoContainerError.style.display = "flex";
        return;
    }

    await getCord(geoCodingURL + searchVal);

    if (infoArr[0] == undefined) {
        infoContainerStart.style.display = "none";
        infoContainer.style.display = "none";
        infoContainerError.style.display = "flex";
        return;
    }

    city.innerHTML = rawSearchVal.charAt(0).toUpperCase() + rawSearchVal.slice(1).toLowerCase();;
    setValues();
});

for (const btn of popBtns) {
    btn.addEventListener("click", async () => {
        let searchVal = btn.innerText;
        console.log(searchVal);
        await getCord(geoCodingURL+searchVal);
        currDetails.innerHTML = `${dayName}, ${date} ${monthName} ${year}`;
        city.innerHTML = searchVal;
        setValues();
        infoArr = [];
    });
}

async function getCord(url) {
    try {
        let res = await axios.get(url);

        if (!res.data || res.data.length === 0) return;

        let lat = res.data[0].lat;
        let lon = res.data[0].lon;
        let latLon = "lat=" + lat + "&lon=" + lon;

        await getWeatherInfo(weatherURL + latLon);
    } catch (e) {
        console.log(e);
    }
}

let infoArr = [];
async function getWeatherInfo(url) {
    try {
        let res = await axios.get(url);
        infoArr.push(Math.round(res.data.main.temp));
        infoArr.push(Math.round(res.data.main.feels_like));
        infoArr.push(res.data.main.humidity);
        infoArr.push(Math.round(res.data.wind.speed*3.6));
        infoArr.push(res.data.main.pressure);
        infoArr.push(res.data.weather[0].icon);
        infoArr.push(res.data.weather[0].description);
    } catch (e) {
        console.log(e);
    }
}
