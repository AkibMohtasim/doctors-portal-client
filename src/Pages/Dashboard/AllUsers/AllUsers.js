import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';

const AllUsers = () => {

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://doctors-portal-server-eosin-xi.vercel.app/api/users');
      const data = await res.json();
      return data;
    }
  });

  const makeAdminHandler = id => {
    fetch(`https://doctors-portal-server-eosin-xi.vercel.app/api/users/admin/${id}`, {
      method: 'put',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        if (data.role === 'Admin') {
          toast.success('Admin made successful');
          refetch();
        }
      })
  }

  return (
    <div>
      <h2 className='text-3xl'>All Users</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>

            {
              users.map((user, i) => <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user?.role !== 'Admin' && <button onClick={() => makeAdminHandler(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td>
                <td><button className='btn btn-xs btn-danger'>Delete</button></td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;