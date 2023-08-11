import React, { useState } from 'react';
import { fetchWeatherData } from '../api/SearchWeatherAPI'
import Colombo from '../components/Colombo';
import '../css/WeatherDetails.css'

const WeatherDetails = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [inputError, setInputError] = useState('');

    const fetchWeather = async () => {
        if (!validateInputs()) {
            return;
          }

        try {
            setIsLoading(true);
            const weatherData  = await fetchWeatherData(latitude, longitude);
            setData(weatherData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }

        setIsLoading(false);
    };

    const validateInputs = () => {   
        if (isNaN(latitude) || isNaN(longitude)) {
          setInputError('Latitude and longitude must be valid numbers.');
          return false;
        }

        if ((latitude<-90) || (latitude>90)) {
            setInputError('Latitude values must be within the range of -90 to 90 degrees.');
            return false;
        }

        if ((longitude<-180) || (longitude>180)) {
        setInputError('Longitude values must be within the range of -180 to 180 degrees.');
        return false;
        }

        if (!latitude || !longitude) {
            setInputError('Please enter both latitude and longitude.');
            return false;
        }
    
        setInputError('');
        return true;
      };

    const formatTimestamp = (timestamp) => {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const date = new Date(timestamp * 1000);
        const dayName = daysOfWeek[date.getDay()];
        return dayName;
    };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };


  return (
    <div className='app'>
        <div className='search'>
            <div className='search-inputs'>
            <input
                type="text"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
            />
            <input
                type="text"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
            />
            </div>
            <button className='search-button' onClick={fetchWeather}>Get Weather</button>
            {inputError && <p className="error-message">{inputError}</p>}
        </div>
        {data ? (
            <div className="weather-container">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <div className="top">
                            <h3 className='location'>{data?.city?.name ? data.city.name : null}</h3>
                            {data?.list ? (
                                <div className='top-details'>
                                    <h1 className='temp'>{data.list[0].main.temp.toFixed()}°F</h1>
                                    <h2 className='description'>{data.list[0].weather[0].description.charAt(0).toUpperCase() + data.list[0].weather[0].description.slice(1)}</h2>
                                    <p className="detail-content">Humidity: {data.list[0].main.humidity}%</p>
                                    <p className="detail-content">Wind: {data.list[0].wind.speed}m/s</p>
                                </div>
                            ) : null}
                        </div>
                        <div className='forecast-topic'>
                            Forecast
                        </div>
                        <div className='forecast'>
                            <div className="details-content">
                                {data?.list.map((day, index) => (
                                    (index + 1) % 8 === 0 && index < 30 ? (
                                        <div key={index} className="day-details">
                                            <h3>{formatTimestamp(day.dt)}</h3>
                                            <h1>{day.main.temp.toFixed()}°F</h1>
                                            <h2>{day.weather[0].description.charAt(0).toUpperCase() + day.weather[0].description.slice(1)}</h2>
                                            <p>Humidity: {day.main.humidity}%</p>
                                            <p>Wind: {day.wind.speed}m/s</p>
                                        </div>
                                    ) : null
                                ))}
                            </div>
                        </div>
                        <div className="more-forecast">
                            {showDetails && (
                                <div className="details-content">
                                    {data?.list.map((day, index) => (
                                    (index + 1) % 8 === 0 && index > 26 && index < 42 ? (
                                        <div key={index} className="day-details">
                                            <h3>{formatTimestamp(day.dt)}</h3>
                                            <h1>{day.main.temp.toFixed()}°F</h1>
                                            <h2>{day.weather[0].description.charAt(0).toUpperCase() + day.weather[0].description.slice(1)}</h2>
                                            <p>Humidity: {day.main.humidity}%</p>
                                            <p>Wind: {day.wind.speed}m/s</p>
                                        </div>
                                    ) : null
                                    ))}
                                </div>
                            )}
                        </div>
                    <div className='toggle-button-container'>
                        <button className="toggle-button" onClick={toggleDetails}>
                            {showDetails ? 'Hide' : 'Show more'}
                        </button>
                    </div>
                </div>
                )}
            </div>
        ) : (
        <div className='top'>
          <Colombo />
        </div>
      )}
    </div>
  );
}

export default WeatherDetails;