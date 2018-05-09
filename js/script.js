const APIKEY = "82f2229c255b1505c496b13203e48e52";
const BASE = "https://api.openweathermap.org/data/2.5/forecast";
const CITYID = "?id=2964574";
const UNITS = "&units=metric";
const URL = `${BASE}${CITYID}${UNITS}&APPID=${APIKEY}`;

function getDay(longDate) {
  const date = new Date(longDate);
  const day = date.toString().substring(0, 3);
  return day;
}

document.addEventListener("DOMContentLoaded", async function() {
  let res;

  try {
    const response = await fetch(URL);
    res = await response.json();
  } catch (err) {
    document.getElementById(
      "today-day"
    ).textContent = `Technical error has occurred: ${err}`;
    // eslint-disable-next-line
    console.error(err);
  }

  // header
  document.querySelector("header").textContent = `Weather in
    ${res.city.name}, ${res.city.country}`;

  const forecast = res.list;

  // today's temperature
  document.getElementById("today-temp").textContent = `${Math.round(
    forecast[0].main.temp
  )}°`;

  // today's weather icon
  const todayIcon = document.getElementById("today-icon");
  todayIcon.setAttribute("class", `wi wi-${forecast[0].weather[0].icon}`);

  // today's weather description
  document.getElementById("today-description").textContent =
    forecast[0].weather[0].description;
  const detailsDiv = document.createElement("div");
  detailsDiv.setAttribute("class", "details today-details");

  // today's min and max temperature
  document.getElementById("today-minMax").textContent = `Max: ${Math.round(
    forecast[0].main.temp_max
  )}° | Min: ${Math.round(forecast[0].main.temp_min)}°`;

  // next 4 days forecast
  const data = [];

  // get dataset per day, not every 3 hours
  for (let i = 8; i < forecast.length; i += 8) {
    data.push(forecast[i]);
  }

  data.forEach((item, index) => {
    // content for elements
    const day = getDay(item.dt_txt);

    // create elements
    const aside = document.getElementById("aside");
    const section = document.createElement("section");
    const article = document.createElement("article");

    // forecast day
    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;

    // forecast temp
    const temp = document.createElement("div");
    temp.setAttribute("class", "temp");
    temp.textContent = `${Math.round(item.main.temp)}°`;

    // forecast icon
    const icon = document.createElement("div");
    icon.setAttribute("class", "icon");
    const iconInsert = document.createElement("i");
    iconInsert.setAttribute("class", `wi wi-${item.weather[0].icon}`);
    icon.append(iconInsert);

    // forecast description
    const description = document.createElement("div");
    description.setAttribute("class", "description");
    description.textContent = `${item.weather[0].description}`;

    // forecast minMax
    const minMax = document.createElement("div");
    minMax.setAttribute("class", "details forecast-details");
    minMax.textContent = `Max: ${item.main.temp_max}° | Min: ${
      item.main.temp_min
    }°`;

    article.append(dayDiv);
    article.append(temp);
    article.append(icon);
    article.append(description);
    article.append(minMax);
    section.setAttribute("class", `forecast-${index + 1}`);
    section.append(article);
    aside.append(section);
  });
});
