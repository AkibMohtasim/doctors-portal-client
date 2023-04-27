import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {

  const { register, formState: { errors }, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');
  const [loginUserEmail, setLoginUserEmail] = useState('');
  const [token] = useToken(loginUserEmail);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state?.from.pathname || '/';

  if (token) {
    navigate(from, { replace: true });
  }

  const loginHandler = data => {
    console.log(data)
    setLoginError('');


    const { email, password } = data;

    signIn(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setLoginUserEmail(data.email)
        // navigate(from, { replace: true });
      })
      .catch(err => {
        console.error(err.message);
        setLoginError(err.message)
      });
  }

  return (
    <div className='h-[800px] flex justify-center items-center'>
      <div className='w-96 p-7'>
        <h2 className='text-xl text-center'>Login</h2>

        <form onSubmit={handleSubmit(loginHandler)}>

          <div className="form-control w-full max-w-xs">
            <label className="label"> <span className="label-text">Email</span> </label>
            <input type='text'
              {...register("email", { required: "Email Address is required." })}
              className="input input-bordered w-full max-w-xs" />
            {errors.email && <p className='text-red-600 mt-2'>{errors.email?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label"> <span className="label-text">Password</span> </label>
            <input type='password'
              {...register("password", {
                required: 'Password is required.',
                minLength: { value: 6, message: 'Password must be at least 6 characters long.' }
              })}
              className="input input-bordered w-full max-w-xs" />

            {errors.password && <p className='text-red-600 mt-2'>{errors.password?.message}</p>}

            <label className="label"> <span className="label-text">Forgot Password?</span> </label>
          </div>

          <input className='btn btn-accent w-full' value='login' type="submit" />
          <div className='mt-2'>
            {loginError && <p>{loginError}</p>}
          </div>
        </form>

        <p className='mt-2'>New to doctor's portal? <Link className='text-secondary' to='/signup'>Create a new account</Link></p>
        <div className="divider">OR</div>
        <button className='btn btn-outline w-full'>Continue With Google</button>
      </div>
    </div>
  );
};

export default Login;