import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import Loading from '../../Shared/Loading/Loading';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {

  const { register, formState: { errors }, handleSubmit } = useForm();
  const imageHostingKey = process.env.REACT_APP_imgbb_key;

  const navigate = useNavigate();

  const { data: specialities = [], isLoading } = useQuery({
    queryKey: ['speciality'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/api/appointmentSpeciality');
      const data = res.json();
      return data
    }
  })

  const addDoctorHandler = data => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);

    const url = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

    fetch(url, {
      method: 'post',
      body: formData
    })
      .then(res => res.json())
      .then(imgData => {
        if (imgData.success) {
          console.log(imgData.data.url);
          const doctor = {
            name: data.name,
            email: data.email,
            speciality: data.speciality,
            image: imgData.data.url
          }

          // save doctor information to the database

          fetch('http://localhost:5000/api/doctors', {
            method: 'post',
            headers: {
              'content-type': 'application/json',
              authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(doctor)
          })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              toast.success(`${data.name} is added successfully`);
              navigate('/dashboard/managedoctors')
            })
        }
      })
  } // incomplete

  if (isLoading) {
    return <Loading />
  }


  return (
    <div className='w-96 p-7'>
      <h2>
        Add a doctor
      </h2>

      <form onSubmit={handleSubmit(addDoctorHandler)}>

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
          <label className="label"> <span className="label-text">Speciality</span> </label>
          <select
            {...register('speciality')}
            className="select select-bordered w-full max-w-xs">
            <option disabled selected>Pick a Speciality</option>

            {
              specialities.map(speciality => <option key={speciality._id} value={speciality.name}>{speciality.name}</option>)
            }
          </select>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label"> <span className="label-text">Photo</span> </label>
          <input type='file'
            {...register("image", { required: "Image is required." })}
            className="input input-bordered w-full max-w-xs" />
          {errors.image && <p className='text-red-600 mt-2'>{errors.image?.message}</p>}
        </div>

        <input className='btn btn-accent w-full mt-2' value='Add Doctor' type="submit" />
        {/* {signUpError && <p className='text-red-600'>{signUpError}</p>} */}
      </form>
    </div>
  );
};

export default AddDoctor;