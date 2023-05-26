const apiKey = '6ac038d1101ca31f2dd49e0336bf26a6'; //creating variable for my api key
let city = 'Charlotte';


function getWeather(city) { //creating parameter for searching weather for city
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`) //fetching url with parameters
      .then(response => response.json()) //response from API
      .then(data => { // gets const data and logs
        const cityName = data.name;
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
  
        console.log('City:', cityName);
        console.log('Temperature:', temperature);
        console.log('Humidity:', humidity);
        console.log('Wind Speed:', windSpeed);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  
  getWeather(''); //calls function

  window.addEventListener('DOMContentLoaded', () => { //function for only todays info 
    const dateElement = document.getElementById('date');
    const weatherIconElement = document.getElementById('weather-icon');
    const temperatureElement = document.getElementById('temperature');
    const windSpeedElement = document.getElementById('wind-speed');
    const humidityElement = document.getElementById('humidity');
  
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`) //fetching data from api with json
      .then(response => response.json())
      .then(data => {
        const date = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = date.toLocaleDateString('en-US', options); //how to display data unto page
        weatherIconElement.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
        windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
      })
      .catch(error => {
        console.log('Error', error);
      });
  });
  

const weatherDiv = document.getElementById('weather');
const cityInput = document.getElementById('cityInput');

function createWeatherCard(city, date, icon, temp, humidity, windSpeed) { //function to create weather cards
  const card = document.createElement('div');
  card.className = 'weather-card';

  const cityDiv = document.createElement('div'); 
  cityDiv.className = 'city';
  cityDiv.textContent = city;
  card.appendChild(cityDiv);

  const dateObj = new Date(date);
  const month = dateObj.toLocaleString('en-US', { month: 'short' });
  const day = dateObj.getDate();
  const dateDiv = document.createElement('div');
  dateDiv.className = 'date';
  dateDiv.textContent = `${month} ${day}`;
  card.appendChild(dateDiv);

  const iconImg = document.createElement('img');
  iconImg.src = `http://openweathermap.org/img/w/${icon}.png`;
  card.appendChild(iconImg);

  const tempFahrenheit = (temp * 9/5) + 32; //make it farhenheit
  const tempDiv = document.createElement('div');
  tempDiv.className = 'temp';
  tempDiv.textContent = `Temperature: ${tempFahrenheit.toFixed(1)}°F`; // display text as farhenieit
  card.appendChild(tempDiv);

  const humidityDiv = document.createElement('div');
  humidityDiv.className = 'humidity';
  humidityDiv.textContent = `Humidity: ${humidity}%`;
  card.appendChild(humidityDiv);

  const windSpeedDiv = document.createElement('div');
  windSpeedDiv.className = 'wind-speed';
  windSpeedDiv.textContent = `Wind Speed: ${windSpeed} m/s`;
  card.appendChild(windSpeedDiv);

  return card;
}

async function getWeatherForecast() { //function to get 5 day weather forecast
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();

    const forecast = data.list;
    const dailyForecast = {};
    
    for(var i = 7; i < forecast.length; i+=8) { //to keep function from showing same day over and limit from showing more than 5
      const day = forecast[i]
      const date = day.dt_txt.split(' ')[0]; //split string of date into array

      if (!dailyForecast[date]) { //the there's no object
        dailyForecast[date] = { //create new property
          date: date,
          icon: day.weather[0].icon,
          temp: day.main.temp,
          humidity: day.main.humidity,
          windSpeed: day.wind.speed
        };
      }
    }
    

    weatherDiv.innerHTML = ''; //empty string for weather div
    console.log(dailyForecast)
    Object.values(dailyForecast).forEach(day => { //gets array of values for each day
      const weatherCard = createWeatherCard(city, day.date, day.icon, day.temp, day.humidity, day.windSpeed);
      weatherDiv.appendChild(weatherCard);
    });
  } catch (error) {
    console.log('Error:', error);
  }
}

function searchWeather() { //function to search the weather
    const searchCity = cityInput.value; //by inputting city
    if (searchCity) {
      city = searchCity;
      cityInput.value = ''; //once input will initiate forecast function
      getWeatherForecast();
      displayPreviousSearches();
    }
  }

getWeatherForecast();
previousSearches();