const axios = require('axios');

async function getWeatherData(city){
    const API_KEY = "c275b6f60d861bfe60c97e02905fef1d";
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`;
    try{
        const weatherData = await axios(weatherURL);
        return {
            weather : weatherData.data,
            error : null
        }
    }
    catch(err){
        console.log("Error fetching weather data:", err);
        throw err;

    }
}

module.exports = {
    getWeatherData
}