import React from 'react'
import { Navigate  } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar = () => {
    const { logout, user } = useUser();

    const handleLogout = () => {
        logout();
        <Navigate  to='/login' />;
    };

  return (
    <div className='navbar'>
        <div className='username'>
          <h3>Hi {user}</h3>
        </div>
        <div className='logout'>
            <button className='logout-btn' onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar