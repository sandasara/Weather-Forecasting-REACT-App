import axios from 'axios';

const API_KEY = '0fb1664bb1acc78feaa6091260d6aee0';

export const fetchColomboWeatherData = async () => {
    try {
        const response = await axios.get(         
            `https://api.openweathermap.org/data/2.5/weather?q=colombo&appid=${API_KEY}`
            );
        return (response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};