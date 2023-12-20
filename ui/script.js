let apiKey = "8b78ddff94f24e8087b182603232609";
let callLibrary = [];
let maxlist = [];
let maxDate = [];
let searched = [];
let searchHistory = []
let dayValue = []
let cityLink;
let today;
let future;
let todayClass;
let todayValue;
let futureClass;
let futureValue;
let today_message;
let todaySummary;
let searchInput;
let dayCall;
futureResults = [1, 2, 3];
let celsiusButton = document.querySelector("button.c");
let searchList = document.querySelector(".history-button")
let hiddenConverter = document.querySelector(".hidden-converter");
let hiddenMaincontent = document.querySelector(".hidden-maincontent");
let initialHead = document.querySelector(".initial-header");
let initialBody = document.querySelector(".initial-body");
let searchlist = document.querySelector('.searchlist');

// the search button and the fahrenheit button have an onClick added to them because both return the F degree results 

function onChange() {
    let cityFromUser = document.getElementById("search-input").value;

    // remove excess spaces after words (manchester ) => (manchester)

    cityFromUser.trim();


    // if there are spaces, replace the space with a '-'

    if (cityFromUser.includes(" ")) {
        cityFromUser = cityFromUser.replace(/ /g, "-");
    }
    cityLink = `http://api.weatherapi.com/v1/forecast.json?key=8b78ddff94f24e8087b182603232609&q=${cityFromUser}&days=${4}&aqi=no&alerts=no`;
    // push new searches to the front of the searched array 

    searched.unshift(cityFromUser);
    let link = document.createElement("a");
    let txt = document.createTextNode(
        ` ${document.getElementById("search-input").value}`
    );
    link.appendChild(txt);
    link.title = document.getElementById("search-input").value;
    link.href = cityLink;
    link.setAttribute("class", "fa-solid fa-clock-rotate-left");




    console.log(link, cityFromUser, cityLink)
    // every time an input is submitted, create a new variable and store it in the searchHistory array 



    // have the string join the values with a space instead of a comma

    searchlist.append(link);

    cityLink = `http://api.weatherapi.com/v1/forecast.json?key=8b78ddff94f24e8087b182603232609&q=${cityFromUser}&days=${4}&aqi=no&alerts=no`;


    // remove and add the desired class/id's to specific html properties for smooth css editing 

    function addRemove() {
        hiddenConverter.classList.remove("hidden-converter");
        hiddenMaincontent.classList.remove("hidden-maincontent");
        initialHead.classList.remove("initial-header");
        initialHead.classList.add("header");
        initialBody.classList.remove("initial-body");
        initialBody.classList.add("body");
        searchList.classList.add("history-active")
    }
    addRemove();


    cityLink = `http://api.weatherapi.com/v1/forecast.json?key=8b78ddff94f24e8087b182603232609&q=${cityFromUser}&days=${4}&aqi=no&alerts=no`;



    console.log(cityLink);



    fetch(cityLink)

        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Failed to load weather data`);
            }
        })

        .then((data) => {

            // take the date 0000-00-00 and return that dates day of the week as long as the day falls within the length of the array (between 0-6)

            function getDayOfWeek(date) {
                let daysOfWeek = [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                ];
                let dayOfWeek = new Date(date).getDay();

                if (
                    isNaN(dayOfWeek) ||
                    dayOfWeek < 0 ||
                    dayOfWeek >= daysOfWeek.length
                ) {
                    return null;
                }

                return daysOfWeek[dayOfWeek];
            }

            getDayOfWeek();

            //api object call shortened into a simpler variable 


            dayCall = data.forecast.forecastday;



            //todays weather values stores in an object 

            today = {
                date: (document.querySelector(
                    `#todays-results .date`
                ).innerHTML = `<i class="fa-solid fa-calendar-day"></i> Today`),

                located: (document.querySelector(
                    `#todays-results .located`
                ).innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.location.name}, ${data.location.region}`),

                currentTemp: (document.querySelector(
                    `#todays-results .currentTemp`
                ).innerHTML = `<i class="fa-regular fa-clock"></i> Currently: ${data.current.temp_f}°F`),

                maxtemp: (document.querySelector(
                    `#todays-results .maxtemp`
                ).innerHTML = `<i class="fa-solid fa-sun"></i>  Today's High: ${dayCall[0].day.maxtemp_f}°F`),

                mintemp: (document.querySelector(
                    `#todays-results .mintemp`
                ).innerHTML = `<i class="fa-regular fa-sun"></i> Todays Low: ${dayCall[0].day.mintemp_f}°F`),

                feelslike: (document.querySelector(
                    `#todays-results .feelslike`
                ).innerHTML = `<i class="fa-solid fa-temperature-half"></i>  Feels Like: ${data.current.feelslike_f}°F`),

                chanceOfRain: (document.querySelector(
                    `#todays-results .chance-of-rain`
                ).innerHTML = `<i class="fa-solid fa-umbrella"></i> Chance of Rain: ${dayCall[0].day.daily_chance_of_rain}%`),
            };


            //future weather results storied in an array that is looped through matching the html property based on its id and returning the requested information for the next three days

            for (let i = 1; i < 4; i++) {
                dates = ["zero", "one", "two", "three"];
                (document.querySelector(`#${dates[i]} .date`).innerHTML =
                    `<i class="fa-solid fa-calendar-day"></i> ${getDayOfWeek(dayCall[i].date)}`),
                    (document.querySelector(
                        `#${dates[i]} .avetemp`
                    ).innerHTML = `<i class="fa-solid fa-gauge"></i> Average  Temp: ${dayCall[i].day.avgtemp_f}°F`),
                    (document.querySelector(
                        `#${dates[i]} .maxtemp`
                    ).innerHTML = `<i class="fa-solid fa-sun"></i>  Today's High: ${dayCall[i].day.maxtemp_f}°F`),
                    (document.querySelector(
                        `#${dates[i]} .mintemp`
                    ).innerHTML = `<i class="fa-regular fa-sun"></i> Todays Low: ${dayCall[i].day.mintemp_f}°F`),
                    (document.querySelector(
                        `#${dates[i]} .chance_of_rain`
                    ).innerHTML = `<i class="fa-solid fa-umbrella"></i> Chance of Rain: ${dayCall[i].day.daily_chance_of_rain}%`);
            }



            //storing the highest temp of each day into an array and the corresponding date into another array


            for (let i = 0; i < 4; i++) {
                maxlist[i] = dayCall[i].day.maxtemp_f;
                maxDate[i] = getDayOfWeek(dayCall[i].date);
            }


            //use the reduce method to return the highest value in the array 


            max = maxlist.reduce((a, b) => Math.max(a, b), -Infinity);

            //set the value of the highestTemp display message with custom responses based on the results 

            for (let i = 0; i < maxlist.length; i++) {

                //if the highest temp falls on the same day, return this message otherwise return future notice message

                if (maxlist[i] === dayCall[0].day.maxtemp_f) {
                    highestTemp = `<i class="fa-solid fa-temperature-high"></i> Today is  the hottest day of the week with a high of ${maxlist[i]}°F!`;
                    document.querySelector(`#highestTemp .highestTemp`).innerHTML =
                        highestTemp;
                }

                else if (maxlist[i] === max) {
                    highestTemp = `<i class="fa-solid fa-temperature-high"></i> The highest temperature this week is ${maxlist[i]}°F on ${maxDate[i]}!`;
                    document.querySelector(`#highestTemp .highestTemp`).innerHTML =
                        highestTemp;
                }
            }


            // a set of if statements to determine the daily temp summary message by comparing the temperature value of each day

            if (data.current.temp_f > 75) {
                todaySummary = document.querySelector(
                    `#today_message .todaySummary`
                ).innerHTML = `<i class="fa-solid fa-umbrella-beach"></i> Its Hot Today!`;
            } else if (data.current.temp_f > 45 || data.current.temp_f < 75) {
                todaySummary = document.querySelector(
                    `#today_message .todaySummary`
                ).innerHTML = ` <i class="fa-solid fa-wind"></i>  Its Moderate Today!`;
            } else if (data.current.temp_f < 45) {
                todaySummary = document.querySelector(
                    `#today_message .todaySummary`
                ).innerHTML = `<i class="fa-regular fa-snowflake"></i> Its Cold Today!`;
            }


            // additional weather details that can be used for extra interaction / details

            for (let i = 0; i < 4; i++) {
                callLibrary =
                {
                    date: dayCall[i].date,
                    name: data.location.name,
                    region: data.location.region,
                    country: data.location.country,
                    condition_text: `Condition: ${dayCall[i].day.condition.text}`,
                    sunrise: `Sunrise: ${dayCall[i].astro.sunrise.text}`,
                    sunset: `Sunset: ${dayCall[i].astro.sunset.text}`,
                    moonphase: `Moonphase: ${dayCall[i].astro.moon_phase}`,

                }
            }



        })
        .catch(error => {
            // Handle errors, including API failure
            alert('Failed to load weather data. Please try again later.');
            console.error('Error:', error);
        });


}




//this replaces only the values that contain a temperature of F in the original functions output 

celsiusButton.addEventListener("click", function celsius() {

    fetch(cityLink)
        .then((response) => response.json())
        .then((data) => {

            let dayCall = data.forecast.forecastday;

            today = {

                currentTemp: (document.querySelector(
                    `#todays-results .currentTemp`
                ).innerHTML = `<i class="fa-solid fa-location-dot"></i>  Currently: ${data.current.temp_c}°C`),

                feelslike: (document.querySelector(
                    `#todays-results .maxtemp`
                ).innerHTML = `<i class="fa-solid fa-temperature-half"></i>  Today's High: ${dayCall[0].day.maxtemp_c}°C`),

                maxtemp: (document.querySelector(
                    `#todays-results .mintemp`
                ).innerHTML = `<i class="fa-regular fa-sun"></i> Todays Low: ${dayCall[0].day.mintemp_c}°C`),

                mintemp: (document.querySelector(
                    `#todays-results .feelslike`
                ).innerHTML = `<i class="fa-solid fa-sun"></i>  Feels Like: ${data.current.feelslike_c}°C`),


            };

            for (let i = 1; i < 4; i++) {
                (document.querySelector(
                    `#${dates[i]} .avetemp`
                ).innerHTML = `<i class="fa-solid fa-gauge"></i> Average  Temp: ${dayCall[i].day.avgtemp_c}°C`),
                    (document.querySelector(
                        `#${dates[i]} .maxtemp`
                    ).innerHTML = `<i class="fa-solid fa-sun"></i> Today's High: ${dayCall[i].day.maxtemp_c}°C`),
                    (document.querySelector(
                        `#${dates[i]} .mintemp`
                    ).innerHTML = `<i class="fa-regular fa-sun"></i> Todays Low: ${dayCall[i].day.mintemp_c}°C`)

            }

            for (let i = 0; i < 4; i++) {
                maxlist[i] = dayCall[i].day.maxtemp_c;

            }

            max = maxlist.reduce((a, b) => Math.max(a, b), -Infinity);

            for (let i = 0; i < maxlist.length; i++) {
                if (maxlist[i] === dayCall[0].day.maxtemp_c) {
                    highestTemp = `<i class="fa-solid fa-temperature-high"></i> Today is  the hottest day of the week with a high of ${maxlist[i]}°C!`;
                    document.querySelector(`#highestTemp .highestTemp`).innerHTML =
                        highestTemp;
                }

                else if (maxlist[i] === max) {
                    highestTemp = `<i class="fa-solid fa-temperature-high"></i> The highest temperature this week is ${maxlist[i]}°C on ${maxDate[i]}!`;
                    document.querySelector(`#highestTemp .highestTemp`).innerHTML =
                        highestTemp;
                }
            }




            if (data.current.temp_c > 23) {
                todaySummary = document.querySelector(
                    `#today_message .todaySummary`
                ).innerHTML = `<i class="fa-solid fa-umbrella-beach"></i>  Its Hot Today!`;
            } else if (data.current.temp_c > 8 || data.current.temp_c < 23) {
                todaySummary = document.querySelector(
                    `#today_message .todaySummary`
                ).innerHTML = `<i class="fa-solid fa-wind"></i>  Its Moderate Today!`;
            } else if (data.current.temp_c < 7) {
                todaySummary = document.querySelector(
                    `#today_message .todaySummary`
                ).innerHTML = `<i class="fa-regular fa-snowflake"></i>  Its Cold Today!`;
            }
        })
})

console.log(searched);




