// console.log("working!!!!");

const APIKEY = "82f2229c255b1505c496b13203e48e52";
const BASE = "https://api.openweathermap.org/data/2.5/forecast";
const CITYID = "?id=2964574";
const UNITS = "&units=metric";
const URL = `${BASE}${CITYID}${UNITS}&APPID=${APIKEY}`;

function getDay(longDate) {
  let date = new Date(longDate);
  let day = date.toString().substring(0, 3);
  return day;
}

fetch(URL).then(response => {
  response.json().then(res => {
    //header
    document.getElementsByTagName("header")[0].innerHTML = `Weather in
    ${res.city.name}, ${res.city.country}`;
    //day
    let forecast = res.list;

    //temp
    document.getElementById("today-temp").innerHTML = `${Math.round(
      forecast[0].main.temp
    )}&#176;`;

    let icon = `<i class="wi wi-${forecast[0].weather[0].icon}"></i>`;
    document.getElementById("today-icon").innerHTML = icon;
    document.getElementById("today-description").innerHTML =
      forecast[0].weather[0].description;
    document.getElementById(
      "today-minMax"
    ).innerHTML = `<div class="details today-details">Max: ${Math.round(
      forecast[0].main.temp_max
    )}&#176; | Min: ${Math.round(forecast[0].main.temp_min)}&#176;</div>`;

    // next days forecast

    let data = [];
    for (let i = 8; i < forecast.length; i += 8) {
      data.push(forecast[i]);
    }
    data.map((item, index) => {
      //content for elements
      let day = getDay(item.dt_txt);

      //create elements
      let aside = document.getElementById("aside");
      let section = document.createElement("section");
      let article = document.createElement("article");
      let dayDiv = `<div class="today-day">${day}</div>`;
      let temp = `<div class="temp" id="temp">${Math.round(
        item.main.temp
      )}&#176;</div>`;
      let icon = `<div class="icon"><i class="wi wi-${
        item.weather[0].icon
      }"></i></div>`;
      let description = `<div class="description">${
        item.weather[0].description
      }</div>`;
      let minMax = `<div class="details forecast-details">Max: ${
        item.main.temp_max
      }&#176; | Min: ${item.main.temp_min}&#176;</div>`;

      article.innerHTML = dayDiv + temp + icon + description + minMax;
      section.setAttribute("class", `forecast-${index + 1}`);
      section.append(article);
      aside.append(section);
    });
  });
});
