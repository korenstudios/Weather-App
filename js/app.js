const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const currentDay = new Date().getDay();

function checkThirdDay() {
  if (currentDay === 5) {
    return days[0];
  } else if (currentDay === 6) {
    return days[1];
  } else {
    return days[currentDay + 2];
  }
}

$(".search-btn").on("click", () => {
  const textField = $(".city-field").val().trim();

  if (textField.length > 0) {
    $.ajax({
      url: "https://api.weatherapi.com/v1/forecast.json?",
      type: "GET",
      dataType: "json",
      data: {
        key: "248a3e1ccb954883957215103212511",
        q: textField,
        days: 3,
      },
      success: function (response) {
        const content = `
            <div class="wheather-box">

            <div class="day1">
              <div>
              <p class="location">${response.location.name}, ${
          response.location.country
        }</p>
        </div>

        <div class="current-wheather">

            <div class="icon-text">
          <img src=${response.current.condition.icon} alt="" />
          <span>${response.current.condition.text}</span>
        </div>

        <div class="temp">
        <span>${response.current.temp_c} &deg;C</span>
        <small class="feels">Feels like: ${
          response.current.feelslike_c
        } &deg;C</small>
        </div>

        <div class="condition">
          <span>Wind: ${response.current.wind_kph} kmph</span>
          <span>Precip: ${response.current.precip_mm} mm</span>
          <span>Pressure: ${response.current.pressure_mb} mb</span>
        </div>


      </div>
      </div>

      <hr>
      <div class="forecast">
      <div class="day3">
      <span>${checkThirdDay()}</span>
      <img src=${response.forecast.forecastday[2].day.condition.icon} alt="">
      <span>MAX: ${response.forecast.forecastday[2].day.maxtemp_c} &deg;C</span>
      <span>MIN: ${response.forecast.forecastday[2].day.mintemp_c} &deg;C</span>
      </div>
      <div class="day2">
        <span>${currentDay === 6 ? days[0] : days[currentDay + 1]}</span>
        <img src=${response.forecast.forecastday[1].day.condition.icon} alt="">
        <span>MAX: ${
          response.forecast.forecastday[1].day.maxtemp_c
        } &deg;C</span>
        <span>MIN: ${
          response.forecast.forecastday[1].day.mintemp_c
        } &deg;C</span>
      </div>
        </div>
            `;
        $(".wheather").html(content);

        $(function bgSetByDayOrNight() {
          if (response.current.is_day === 1) {
            $(".wheather-box").css("background-color", "skyblue");
          }
          if (response.current.is_day === 0) {
            $(".wheather-box").css("background-color", "navy");
          }
        });

        const API_INFO = `
        Powered by
        <a href="https://www.weatherapi.com/" title="Free Weather API"
          >WeatherAPI.com</a
        >
        <a href="https://www.weatherapi.com/" title="Free Weather API"
          ><img
            src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
            alt="Weather data by WeatherAPI.com"
        /></a>
        `;

        $("aside").html(API_INFO);
      },
    });
  }
});
