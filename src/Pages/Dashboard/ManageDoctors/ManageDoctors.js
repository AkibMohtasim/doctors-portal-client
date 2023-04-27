import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import { toast } from 'react-hot-toast';

const ManageDoctors = () => {

  const [deletingDoctor, setDeletingDoctor] = useState(null);

  const closeModal = () => {
    setDeletingDoctor(null);
  }



  const { data: doctors, isLoading, refetch } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      try {
        const res = await fetch('http://localhost:5000/api/doctors', {
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        });
        const data = await res.json();
        return data;
      }
      catch (err) {
        console.error(err.message);
      }
    }
  })

  const deleteDoctorHandler = doctor => {
    fetch(`http://localhost:5000/api/doctors/${doctor._id}`, {
      method: 'delete',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Doctor ${doctor.name} Deleted Successfully`)
        }
        console.log(data)
      })
  }

  if (isLoading) {
    return <Loading />
  }


  return (
    <div>
      <h2 className='text-3xl'>Manage Doctors: {doctors?.length}</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">

          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Speciality</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {
              doctors?.map((doctor, i) =>
                <tr key={doctor._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-24 rounded-full">
                        <img src={doctor.image} alt='' />
                      </div>
                    </div>
                  </td>
                  <td>{doctor.name}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.speciality}</td>
                  <td>
                    <label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                  </td>
                </tr>)
            }
          </tbody>
        </table>
      </div>
      {
        deletingDoctor && <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingDoctor.name}, it can not be undone`}
          successAction={deleteDoctorHandler}
          successBtnName={`Delete`}
          modalData={deletingDoctor}
          closeModal={closeModal}
        />
      }
    </div>
  );
};

export default ManageDoctors;