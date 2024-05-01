const  { getWeatherData }  = require('../models/weather.model');

async function httpGetWeatherData(req,res){    
    try{
        const city = req.query.city ? req.query.city : 'dehradun' ;
        
        const weatherApiData = await getWeatherData(city);

        const weather = {
        city:weatherApiData.weather.name,
        temp:weatherApiData.weather.main.temp,       
        feels_like:weatherApiData.weather.main.feels_like,
        temp_min:weatherApiData.weather.main.temp_min,
        temp_max:weatherApiData.weather.main.temp_max,
        description:weatherApiData.weather.weather[0].description,
        icon:weatherApiData.weather.weather[0].icon,
        sunrise:timeformat(weatherApiData.weather.sys.sunrise),
        sunset:timeformat(weatherApiData.weather.sys.sunset),
        pressure:weatherApiData.weather.main.pressure,
        humidity:weatherApiData.weather.main.humidity,
        wind:weatherApiData.weather.wind.speed,
        windDirection : getWindDirection(weatherApiData.weather.wind.deg),
    }
    const error = '';
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const currentTime = new Date().toLocaleTimeString('en-US', {
        timeZone: 'IST', // Change the timeZone according to your preference
        hour12: true // Set to false for 24-hour format
    });

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayIndex = new Date().getDay();
    const currentDayName = days[currentDayIndex];
    res.render('weather', { weather, currentDate,currentTime,currentDayName,error });
    //res.status(200).json(weatherApiData);

    }catch(error){
        res.render('weather', { weather: null, error: 'Something went wrong. Please try again later.' });

    }
    
    
}

function timeformat(unixtime){
    const unixTimestamp = unixtime;
        const milliseconds = unixTimestamp * 1000;
        const date = new Date(milliseconds);
       return date.toLocaleTimeString('en-US', { timeZone: 'IST' });
}

function getWindDirection(degrees){
        // Define wind directions in 8 compass points
        const directions = ['North', 'North East', 'East', 'South East', 'South', 'South West', 'West', 'North West'];

        // Calculate the index based on the wind direction
        const index = Math.round(degrees / 45) % 8;

        // Return the wind direction text
        return directions[index];
        
}

module.exports = {
    httpGetWeatherData
}