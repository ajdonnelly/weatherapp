// search history-need to implement this? how to? 
// local storage-you can click on a city in the search history-again presented with current and future conditions for that city
var cityInputEl = document.querySelector("#city");
var cityNameEl = document.querySelector("#city-name");
var userFormEl = document.querySelector("#user-form");
var weatherContainerEl = document.querySelector("#weather-container");
var cityDateContainerEl = document.querySelector("#date-icon");
var tempContainerEl = document.querySelector("#temp");
var humidityContainerEl = document.querySelector("#humidity");
var windSpeedContainerEl = document.querySelector("#wind-speed");
var uvIndexContainerEl = document.querySelector("#uv-index");
var day1ContainerEl = document.querySelector("#day-1");
var day2ContainerEl = document.querySelector("#day-2");
var day3ContainerEl = document.querySelector("#day-3");
var day4ContainerEl = document.querySelector("#day-4");
var day5ContainerEl = document.querySelector("#day-5");
var forecastContainerEl = document.querySelector("#forecast-container");
var forecastTitleEl = document.querySelector("#five-day-title");
var currentTitleEl = document.querySelector("#current-title");
var iconEl = document.querySelector("#icon");
var city = cityInputEl.value.trim();



//use api to convert city to lat lon


var getLatLong = function(city) {
        
        var latLongUrl = "https://api.opencagedata.com/geocode/v1/json?q=" + city + "&key=e5bb290b439f487ca743a626a13e4095&pretty=1";
    // https://api.opencagedata.com/geocode/v1/json?q=Rua+Cafel%C3%A2ndia%2C+Carapicu%C3%ADba%2C+Brasil&key=e5bb290b439f487ca743a626a13e4095&pretty=1
    fetch(latLongUrl).then(function(response) {
          
        console.log(city);
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
            console.log(data)
            getWeather(data);
        });
      }  else {
        alert("Error: " + response.statusText);
        }
    });
    

}

//show search history
  function showHistory(city) {
   
    var liEl = document.createElement("li")
    liEl.classList.add("list-group-item", "list-group-item-action");
    var text = city;
    liEl.textContent = text;
    var historyEl = document.querySelector('.history');
    console.log(event.target)
    historyEl.onclick = function(){
        console.log(event.target.tagName)
      if (event.target.tagName == "LI"){     
      getLatLong(event.target.textContent)
      }
    }
    historyEl.appendChild(liEl);
  };

  //get the five day forecast
var getFiveDay = function(city) {
    var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=5cfccdfa6fd549d944fd8443ba3a7cb2&units=imperial";
    fetch(fiveDay).then(function(response) {
        console.log(city);
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
            console.log(data)
            
            getFiveDayWeather(data);

        });
      }  else {
        alert("Error: " + response.statusText);
        }
    });

}
//need to take lat long results from first api and plug these in the getWeather function using the One Call API 
 var getWeather = function(data, city) {
    

    var latLongArr = data.results[0];
    console.log(latLongArr);
    var lat = latLongArr.geometry.lat;
    var long = latLongArr.geometry.lng;
    console.log(lat);
    console.log(long);
    
    var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=5cfccdfa6fd549d944fd8443ba3a7cb2&units=imperial";
  
    fetch(oneCallUrl).then(function(response) {
        
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
           displayWeather(data, city);

        });
      }  else {
        alert("Error: " + response.statusText);
        }
    });

}

var displayWeather = function(weather, city) {

    iconEl.textContent = " ";
    cityDateContainerEl.textContent = " ";
    tempContainerEl.textContent = " ";
    uvIndexContainerEl.textContent = " ";
    // uvInfo.textContent = " ";
    windSpeedContainerEl.textContent = " ";
    humidityContainerEl.textContent = " ";

        // var currentTitle =  document.createElement("div");  
        // currentTitle.innerHTML = "Today's Weather: ";
        // currentTitle.classList = "current-title";
        // currentTitleEl.appendChild(currentTitle);
        
    var weatherArr = weather;
    console.log(weatherArr)
    console.log(location.search)
  
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear(); 
        today = mm + '/' + dd + '/' + yyyy; 
        var formattedTime = today
    
        //  var queryString = document.location.search;
        // console.log (queryString);
        // console.log (weatherArr);
        // // console.log (forecastArr.city.name);
        // // console.log (document.location.search);
        // var cityOutput = queryString.split("=")[1];
        // console.log(cityOutput);
        // var cityOutputUpper = cityOutput.toUpperCase("");
        // console.log (city);
        // var cityOutputUpper = city.value;
        // var cityOutputUpper = document.getElementById("city").value;
        // var cityOutputUpper = "Chicago"
        // var cityOutputUpper = weatherArr.components.city;
        // var cityOutputUpper = "test";
        // document.getElementById("myInput").value = cityOutputUpper;
        // var cityOutputUpper = document.querySelector("#city").value;

        var currentWeatherIcon =  document.createElement("img");
        currentWeatherIcon.id = "remove";
        currentWeatherIcon.setAttribute("src", "http://openweathermap.org/img/w/" + weatherArr.current.weather[0].icon + ".png");
        currentWeatherIcon.classList = "img";
        iconEl.appendChild(currentWeatherIcon);
        

        var weatherInfo = "<p>" + " (" + formattedTime + ") ";
        var weatherList = document.createElement("div");
        weatherList.classList = "card" + weatherArr.length;
        weatherList.innerHTML = weatherInfo;
        cityDateContainerEl.appendChild(weatherList);
        
        var tempInfo = "Current Temperature: " + weatherArr.current.temp + "&degF";
        var tempList =  document.createElement("div");
        tempList.classList = "card" + weatherArr.length;
        tempList.innerHTML = tempInfo;
        tempContainerEl.appendChild(tempList);

       
        //need to figure out how to color this index
        // var uvList =  document.createElement("div");
        var uvInfo = document.createElement("p");
        uvInfo.textContent = "UV Index: ";
        var uvColor = document.createElement("span");
        uvColor.classList.add("uv", "btn-sm");
        uvColor.innerHTML = weatherArr.current.uvi;
        // var uvColor = weatherArr.current.uvi;
        console.log(weatherArr.current.uvi);
        if (weatherArr.current.uvi < 3) {
            uvColor.classList.add("favorable");
          }
          else if (weatherArr.current.uvi < 7) {
            uvColor.classList.add("moderate");
          }
          else {
            uvColor.classList.add("severe");
          }
      
        // uvList.classList = "card" + weatherArr.length;
        // uvList.innerHTML = uvInfo;
        uvIndexContainerEl.appendChild(uvInfo);
        uvInfo.appendChild(uvColor);
        
        
        var windInfo = "Wind-Speed: " +  weatherArr.current.wind_speed + "MPH";
        var windList =  document.createElement("div");
        windList.classList = "card" + weatherArr.length;
        windList.innerHTML = windInfo;
        windSpeedContainerEl.appendChild(windList);

        
        var humInfo = "Humidity: " +  weatherArr.current.humidity + "%";
        var humList =  document.createElement("div");
        humList.classList = "card" + weatherArr.length;
        humList.innerHTML = humInfo;
        humidityContainerEl.appendChild(humList);
    // }
    weatherContainerEl.classList.add("weather");
     
         
}

var getFiveDayWeather = function(fiveDay, city) {
    var forecastArr = fiveDay; 
    //clear prior input
    forecastTitleEl.textContent = " ";
    cityNameEl.textContent = " ";
    day1ContainerEl.textContent = " ";
    day2ContainerEl.textContent = " ";
    day3ContainerEl.textContent = " ";
    day4ContainerEl.textContent = " ";
    day5ContainerEl.textContent = " ";

    // show Five Day Forecast Title
        
        var fiveDayTitle =  document.createElement("div");
        // day1List.classList = "forecast" + forecastArr.length;
        fiveDayTitle.innerHTML = "Five Day Forecast: ";
        forecastTitleEl.appendChild(fiveDayTitle);

       
    
         //put in date for current weather using this api
        var currentCity = forecastArr.city.name;
        var currCity =  document.createElement("div");
        currCity.classList.add("show-title");
        currCity.innerHTML = currentCity;
        cityNameEl.appendChild(currCity);
    

    var day1DateInfo = forecastArr.list[6].dt_txt;
        var justDateDay1 = day1DateInfo.split(" ")[0];
        var onlyDateDay1 = justDateDay1;
        var day1List =  document.createElement("div");
        // currDate.classList.add("show-title");
        day1List.innerHTML = onlyDateDay1;
        day1ContainerEl.appendChild(day1List);
         

        var day1Icon =  document.createElement("img");
        day1Icon.setAttribute("src", "http://openweathermap.org/img/w/" + forecastArr.list[6].weather[0].icon + ".png");
        day1Icon.classList = "forecast-card" + forecastArr.length;
        day1ContainerEl.appendChild(day1Icon);

        var forecastTempInfo = "Temp: " + forecastArr.list[6].main.temp + "&degF";
        var forecastTempList =  document.createElement("div");
        forecastTempList.classList = "forecast-card" + forecastArr.length;
        forecastTempList.innerHTML = forecastTempInfo;
        day1ContainerEl.appendChild(forecastTempList);

        var forecastHumInfo = "Humidity: " + forecastArr.list[6].main.humidity + "%";
        var forecastHumList =  document.createElement("div");
        forecastHumList.classList = "forecast-card" + forecastArr.length;
        forecastHumList.innerHTML = forecastHumInfo;
        day1ContainerEl.appendChild(forecastHumList);

        day1ContainerEl.classList.add("forecast-card");

        // day 2
        // day 2 date
        var day2DateInfo = forecastArr.list[14].dt_txt;
        var justDateDay2 = day2DateInfo.split(" ")[0];
        var onlyDateDay2 = justDateDay2;
        var day2List =  document.createElement("div");
        // day1List.classList = "forecast-card" + forecastArr.length;
        day2List.innerHTML = onlyDateDay2;
        day2ContainerEl.appendChild(day2List);
         
        // day 2 icon
        var day2Icon =  document.createElement("img");
        day2Icon.setAttribute("src", "http://openweathermap.org/img/w/" + forecastArr.list[14].weather[0].icon + ".png");
        day2Icon.classList = "forecast-card" + forecastArr.length;
        day2ContainerEl.appendChild(day2Icon);

        // day 2 temp
        var forecastTempInfoDay2 = "Temp: " + forecastArr.list[14].main.temp + "&degF";
        var forecastTempListDay2 =  document.createElement("div");
        forecastTempListDay2.classList = "forecast-card" + forecastArr.length;
        forecastTempListDay2.innerHTML = forecastTempInfoDay2;
        day2ContainerEl.appendChild(forecastTempListDay2);

        // day 2 hum
        var forecastHumInfoDay2 = "Humidity: " + forecastArr.list[14].main.humidity + "%";
        var forecastHumListDay2 =  document.createElement("div");
        forecastHumListDay2.classList = "forecast-card" + forecastArr.length;
        forecastHumListDay2.innerHTML = forecastHumInfoDay2;
        day2ContainerEl.appendChild(forecastHumListDay2);

        //add class to day-2
        day2ContainerEl.classList.add("forecast-card");

        // day 3
        // day 3 date
        var day3DateInfo = forecastArr.list[22].dt_txt;
        var justDateDay3 = day3DateInfo.split(" ")[0];
        var onlyDateDay3 = justDateDay3;
        var day3List =  document.createElement("div");
        // day1List.classList = "forecast-card" + forecastArr.length;
        day3List.innerHTML = onlyDateDay3;
        day3ContainerEl.appendChild(day3List);
         
        // day 3 icon
        var day3Icon =  document.createElement("img");
        day3Icon.setAttribute("src", "http://openweathermap.org/img/w/" + forecastArr.list[22].weather[0].icon + ".png");
        day3Icon.classList = "forecast-card" + forecastArr.length;
        day3ContainerEl.appendChild(day3Icon);

        // day 3 temp
        var forecastTempInfoDay3 = "Temp: " + forecastArr.list[22].main.temp + "&degF";
        var forecastTempListDay3 =  document.createElement("div");
        forecastTempListDay3.classList = "forecast-card" + forecastArr.length;
        forecastTempListDay3.innerHTML = forecastTempInfoDay3;
        day3ContainerEl.appendChild(forecastTempListDay3);

        // day 3 hum
        var forecastHumInfoDay3 = "Humidity: " + forecastArr.list[22].main.humidity + "%";
        var forecastHumListDay3 =  document.createElement("div");
        forecastHumListDay3.classList = "forecast-card" + forecastArr.length;
        forecastHumListDay3.innerHTML = forecastHumInfoDay3;
        day3ContainerEl.appendChild(forecastHumListDay3);

        //add class to day-3
        day3ContainerEl.classList.add("forecast-card");

        // day 4
        // day 4 date
        var day4DateInfo = forecastArr.list[30].dt_txt;
        var justDateDay4 = day4DateInfo.split(" ")[0];
        var onlyDateDay4 = justDateDay4;
        var day4List =  document.createElement("div");
        // day1List.classList = "forecast-card" + forecastArr.length;
        day4List.innerHTML = onlyDateDay4;
        day4ContainerEl.appendChild(day4List);
         
        // day 4 icon
        var day4Icon =  document.createElement("img");
        day4Icon.setAttribute("src", "http://openweathermap.org/img/w/" + forecastArr.list[30].weather[0].icon + ".png");
        day4Icon.classList = "forecast-card" + forecastArr.length;
        day4ContainerEl.appendChild(day4Icon);

        // day 4 temp
        var forecastTempInfoDay4 = "Temp: " + forecastArr.list[30].main.temp + "&degF";
        var forecastTempListDay4 =  document.createElement("div");
        forecastTempListDay4.classList = "forecast-card" + forecastArr.length;
        forecastTempListDay4.innerHTML = forecastTempInfoDay4;
        day4ContainerEl.appendChild(forecastTempListDay4);

        // day 4 hum
        var forecastHumInfoDay4 = "Humidity: " + forecastArr.list[30].main.humidity + "%";
        var forecastHumListDay4 =  document.createElement("div");
        forecastHumListDay4.classList = "forecast-card" + forecastArr.length;
        forecastHumListDay4.innerHTML = forecastHumInfoDay4;
        day4ContainerEl.appendChild(forecastHumListDay4);

        //add class to day-4
        day4ContainerEl.classList.add("forecast-card");

        // day 5
        // day 5 date
        var day5DateInfo = forecastArr.list[38].dt_txt;
        var justDateDay5 = day5DateInfo.split(" ")[0];
        var onlyDateDay5 = justDateDay5;
        var day5List =  document.createElement("div");
        // day1List.classList = "forecast-card" + forecastArr.length;
        day5List.innerHTML = onlyDateDay5;
        day5ContainerEl.appendChild(day5List);
         
        // day 5 icon
        var day5Icon =  document.createElement("img");
        day5Icon.setAttribute("src", "http://openweathermap.org/img/w/" + forecastArr.list[38].weather[0].icon + ".png");
        day5Icon.classList = "forecast-card" + forecastArr.length;
        day5ContainerEl.appendChild(day5Icon);

        // day 5 temp
        var forecastTempInfoDay5 = "Temp: " + forecastArr.list[38].main.temp + "&degF";
        var forecastTempListDay5 =  document.createElement("div");
        forecastTempListDay5.classList = "forecast-card" + forecastArr.length;
        forecastTempListDay5.innerHTML = forecastTempInfoDay5;
        day5ContainerEl.appendChild(forecastTempListDay5);

        // day 5 hum
        var forecastHumInfoDay5 = "Humidity: " + forecastArr.list[38].main.humidity + "%";
        var forecastHumListDay5 =  document.createElement("div");
        forecastHumListDay5.classList = "forecast-card" + forecastArr.length;
        forecastHumListDay5.innerHTML = forecastHumInfoDay5;
        day5ContainerEl.appendChild(forecastHumListDay5);

        //add class to day-5
        day5ContainerEl.classList.add("forecast-card");
}
var formSubmitHandler = function(event) {
    
    // updateWeatherCont = document.querySelector("#weather-container");
    // updateForecastCont = document.querySelector("#forecast-container");
    // updateWeatherCont.textContent = " ";
    // updateForecastCont.textContent = " ";

    // todayEl = document.querySelector(".img");
    // todayEl.textContent = " ";
   
    

    event.preventDefault();

    
    // get value from input element
  var city = cityInputEl.value.trim();

  if (city) {
    //   weatherContainerEl.display = " ";
    //   forecastContainerEl.textContent = " ";  
   
  
  getLatLong(city);
  getFiveDay(city);
  showHistory(city);
  cityInputEl.value = "";

//   fiveDayTitle.textContent = " ";
  
    // cityDateContainerEl.value = "";
    // tempContainerEl.value = "";
    // humidityContainerEl.value = "";
    // windSpeedContainerEl.value = "";
    // uvIndexContainerEl.value = "";
    // day1ContainerEl.value = "";
    // day2ContainerEl.value = "";
    // day3ContainerEl.value = "";
    // day4ContainerEl.value = "";
    // day5ContainerEl.value = "";
    // forecastContainerEl.value = "";
    // iconEl.value = "";
  } else {
  alert("Please enter a city");
  }
  };

userFormEl.addEventListener("submit", formSubmitHandler);