import React, { useState, useEffect } from "react";



function WeatherDetails(){

    const [dailyWeather, setDailyWeather] = useState([]);
    const [weatherToday, setWeatherToday] = useState([]);

    useEffect(() => {
        async function fetchWeatherDetails(){
            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=50.845427738710676&longitude=4.359192902178799&current=temperature_2m,rain,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunshine_duration,rain_sum,wind_speed_10m_max,wind_direction_10m_dominant');
            const data = await response.json();

            
            //console.log(data.daily)
            const transformedData = data.daily.time.map((day, index) => ({
                day: day,
                temperature_2m_max: data.daily.temperature_2m_max[index],
                temperature_2m_min: data.daily.temperature_2m_min[index],
                sunshine_duration: data.daily.sunshine_duration[index],
                rain_sum: data.daily.rain_sum[index],
                wind_speed_10m_max: data.daily.wind_speed_10m_max[index],
                wind_direction_10m_dominant: data.daily.wind_direction_10m_dominant[index]
            }));


            setDailyWeather(transformedData);
            //console.log(transformedData)
            setWeatherToday(data.current)
            //console.log(data.current);
        }

        fetchWeatherDetails()


    }, [])

    return (
        <>
            <div className="row">
                <h2>Current Weather</h2>
                
                <div className="col-md mb-4">
                <div  className="card">
                    <div className="card-body">
                        <h5 className="card-title">{weatherToday?.time?.substring(0, weatherToday?.time?.indexOf('T'))}</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Last updated: {weatherToday?.time?.split('T')?.join(' - ')} °C</li>
                        <li className="list-group-item">Temperature: {weatherToday?.temperature_2m} °C</li>
                        <li className="list-group-item">Rain: {weatherToday?.rain} mm</li>
                        <li className="list-group-item">Wind Speed: {weatherToday?.wind_speed_10m} km/h</li>
                    </ul>
                </div>
                </div>
            </div>
            <div className="row">
                <h2>Forecast</h2>
                {Array.isArray(dailyWeather) && dailyWeather.length > 0 ? (
                    dailyWeather.map((daily, index) => (
                        <div key={index} className="col-md mb-4">
                            <div  className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{daily.day}</h5>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Max Temperature: {daily.temperature_2m_max} °C</li>
                                    <li className="list-group-item">Min Temperature: {daily.temperature_2m_min} °C</li>
                                    <li className="list-group-item">Rain Sum: {daily.rain_sum} mm</li>
                                    <li className="list-group-item">Max Wind Speed: {daily.wind_speed_10m_max} km/h</li>
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No forecast available</p>
                )}
            </div>

        </>
    )
}

export default WeatherDetails