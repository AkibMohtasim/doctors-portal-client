import { format } from 'date-fns';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {

  const { user } = useContext(AuthContext);
  const { name, slots, price } = treatment;  //treatment is appointment options
  const date = format(selectedDate, 'PP');

  const bookingHandler = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const slot = form.slot.value;
    const phone = form.phone.value;


    const booking = {
      appointmentDate: date,
      treatment: treatment.name,
      patient: name,
      slot,
      email,
      phone,
      price
    }


    // To Do: Send data to the server
    // Once data is saved, then close the modal
    // Display succes toast

    fetch('http://localhost:5000/api/bookings', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(booking)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setTreatment(null);
        if (data.patient) {
          toast.success('Booking Confirmed');
          refetch();
        }
        else {
          toast.error(data.message);
        }
      })
  }


  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">{name}</h3>
          <form onSubmit={bookingHandler} className='grid grid-cols-1 gap-3 mt-10'>
            <input type="text" value={date} className="input input-bordered w-full" disabled />
            <select name='slot' className="select select-bordered w-full">
              {
                slots.map((slot, i) => <option key={i} value={slot}>{slot}</option>)
              }
            </select>
            <input type="text" name="name" placeholder="Your Name" defaultValue={user?.displayName} className="input input-bordered w-full" />
            <input type="email" name="email" placeholder="Email Address" defaultValue={user?.email} disabled className="input input-bordered w-full" />
            <input type="text" name="phone" placeholder="Phone Number" className="input input-bordered w-full" />
            <br />
            <input type="submit" className='btn btn-accent w-full' value="submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;