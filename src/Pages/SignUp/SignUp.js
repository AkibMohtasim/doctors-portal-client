import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';




const SignUp = () => {

  const { register, formState: { errors }, handleSubmit } = useForm();
  const { updateUser, createUser } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState('');
  const navigate = useNavigate();



  const signUpHandler = data => {

    setSignUpError('');

    const { email, password } = data;

    createUser(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        toast('User Created Successfully');
        const userInfo = {
          displayName: data.name
        }
        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email);
          })
          .catch(err => console.error(err.message));
      })
      .catch(err => {
        console.error(err.message);
        setSignUpError(err.message);

      });
  }

  const saveUser = (name, email) => {
    const user = { name, email };

    fetch('http://localhost:5000/api/users', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        getUserToken(email);
      })
  }

  const getUserToken = email => {
    fetch(`http://localhost:5000/api/jwt?email=${email}`)
      .then(res => res.json())
      .then(data => {
        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
          navigate('/');
        }
      })
  }


  return (
    <div className='h-[800px] flex justify-center items-center'>
      <div className='w-96 p-7'>
        <h2 className='text-xl text-center'>Sign Up</h2>

        <form onSubmit={handleSubmit(signUpHandler)}>

          <div className="form-control w-full max-w-xs">
            <label className="label"> <span className="label-text">Name</span> </label>
            <input type='text'
              {...register("name", { required: "Name is required." })}
              className="input input-bordered w-full max-w-xs" />
            {errors.name && <p className='text-red-600 mt-2'>{errors.name?.message}</p>}
          </div>
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
                minLength: { value: 6, message: 'Password must be at least 6 characters long.' },
                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must be strong' }
              })}
              className="input input-bordered w-full max-w-xs" />

            {errors.password && <p className='text-red-600 mt-2'>{errors.password?.message}</p>}

            <label className="label"> <span className="label-text">Forgot Password?</span> </label>
          </div>

          <input className='btn btn-accent w-full' value='Sign Up' type="submit" />
          {signUpError && <p className='text-red-600'>{signUpError}</p>}
        </form>

        <p className='mt-2'>Already have an account? <Link className='text-secondary' to='/login'>Please log in</Link></p>
        <div className="divider">OR</div>
        <button className='btn btn-outline w-full'>Continue With Google</button>
      </div>
    </div>
  );
};

export default SignUp;