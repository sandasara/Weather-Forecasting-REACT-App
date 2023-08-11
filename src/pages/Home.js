import React from 'react';
import { Navigate  } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';
import WeatherDetails from '../components/WeatherDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    const { user } = useUser();

    if (!user) {
        return <Navigate  to='/login' />;
    }

    return (
        <div className='home'>
            <div>
                <Navbar />
            </div>
            <div>
                <WeatherDetails />
            </div>
        </div>
    );
}

export default Home;
