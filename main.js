const name = document.querySelector(".name .city");
const tempField = document.querySelector(".temperature .tempField");
const cloudinessField = document.querySelector(".clouds .cloudField");
const sunriseField = document.querySelector(".sunrise .sunriseField");
const sunsetField = document.querySelector(".sunset .sunsetField");
const dayField = document.querySelector(".day .dayField");
const btn = document.querySelector(".controls .btn");
const input = document.querySelector(".controls .input");
const container = document.querySelector('main');

function showWeather() {

    const inputValue = input.value.toLowerCase();

    if (inputValue === 'almaty') {
        container.style.backgroundImage = "url('images/almaty.png')";
    } else if (inputValue === 'astana') {
        container.style.backgroundImage = "url('images/astana.png')";
    } else if (inputValue === 'karaganda') {
        container.style.backgroundImage = "url('images/karaganda.png')";
    }

    const apiKey = 'eb58fe88ac97495db60125201231308';
    const city = input.value;
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const cityName = data.location.name;
            const temperatureCelsius = data.current.temp_c;
            const cloudiness = data.current.cloud;
            const sunriseTime = data.forecast.forecastday[0].astro.sunrise;
            const sunsetTime = data.forecast.forecastday[0].astro.sunset;
            const date = new Date(data.forecast.forecastday[0].date);
            const dayOfWeek = date.toLocaleDateString('en-US', {weekday: 'long'});

            console.log(`Город: ${cityName}`);
            console.log(`Текущая температура: ${temperatureCelsius}°C`);

            name.textContent = `${cityName}`;
            tempField.textContent = `${temperatureCelsius}°C`;
            cloudinessField.textContent = `${cloudiness}%`;
            sunriseField.textContent = `${sunriseTime}`;
            sunsetField.textContent = `${sunsetTime}`;
            dayField.textContent = `${dayOfWeek}`;

        })
        .catch(error => {
            console.error('Ошибка при запросе данных о погоде:', error);
            alert("not found");
        });
}

btn.addEventListener("click", showWeather);