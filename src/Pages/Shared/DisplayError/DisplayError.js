import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const DisplayError = () => {

  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const error = useRouteError();

  const logOutHandler = () => {
    logOut()
      .then(() => {
        navigate('/login')
      })
      .catch(err => console.error(err.message));
  }

  return (
    <div>
      <h2 className='text-red-500'>Something went wrong!</h2>
      <p className="text-red-400">{error.statusText || error.message}</p>
      <h4 className='text-3xl'>Please <button onClick={logOutHandler}>Sign Out</button> and log back in</h4>

    </div>
  );
};

export default DisplayError;