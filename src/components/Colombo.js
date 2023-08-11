import React, { useState, useEffect } from 'react';
import { fetchColomboWeatherData } from '../api/ColomboWeatherAPI';
import '../css/Colombo.css'

const Colombo = () => {
    const [colomboData, setcolomboData] = useState(null); // State to store weather data

    // Function to fetch weather data
    const fetchColomboWeather = async () => {
        try {
            const colomboWeatherData = await fetchColomboWeatherData();
            setcolomboData(colomboWeatherData); // Store the fetched data in state
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    // Fetch weather data when the component mounts
    useEffect(() => {
        fetchColomboWeather();
    }, []);

  return (
    <div className="colombo-container">
        {colomboData ? (
            <div>
                <div className="location">
                    <h3>{colomboData.name}</h3>
                </div>
                <div className="colombo-content">
                    <h1>{colomboData.main.temp.toFixed()}°F</h1>
                    <h2>{colomboData.weather[0].description.charAt(0).toUpperCase() + colomboData.weather[0].description.slice(1)}</h2>
                    <p>Humidity: {colomboData.main.humidity}%</p>
                    <p>Wind: {colomboData.wind.speed}m/s</p>
                </div>
            </div>
        ) : (
            <p>Error loading weather of Colombo. Try searching</p>
        )}
    </div>
  )
}

export default Colombo;