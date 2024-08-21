async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '521cbb16e00e115bf4c08e7ffdb32f7c'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        document.getElementById('location').innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
        document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
        
        getForecast(data.coord.lat, data.coord.lon, apiKey);
        } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Could not fetch weather data. Please try again.');
        }
        }
        
        async function getForecast(lat, lon, apiKey) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        
        try {
        const response = await fetch(url);
        const data = await response.json();
        
        const forecastContainer = document.getElementById('forecast');
        forecastContainer.innerHTML = '';
        
        data.list.slice(0, 5).forEach(item => {
        const forecastItem = document.createElement('div');
        forecastItem.innerText = `${new Date(item.dt * 1000).toLocaleDateString()}: ${item.main.temp}°C, ${item.weather[0].description}`;
        forecastContainer.appendChild(forecastItem);
        });
        } catch (error) {
        console.error('Error fetching forecast data:', error);
        alert('Could not fetch forecast data. Please try again.');
        }
        }
            