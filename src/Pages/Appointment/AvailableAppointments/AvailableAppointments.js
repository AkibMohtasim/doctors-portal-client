import { format } from 'date-fns';
import React, { useState } from 'react';
import AppointmentOption from './AppointmentOption';
import BookingModal from '../BookingModal/BookingModal';
import { useQuery } from '@tanstack/react-query';

const AvailableAppointments = ({ selectedDate }) => {

  // const [appointmentOptions, setAppointmentOptions] = useState([]);
  const [treatment, setTreatment] = useState(null);


  const { data: appointmentOptions = [] } = useQuery({
    queryKey: ['appointmentOptions'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/api/appointmentOptions');
      const data = await res.json();
      return data
    }
  })

  return (
    <section className='my-16'>
      <p className='text-center font-bold text-secondary'>Available Appointments on {format(selectedDate, 'PP')}</p>
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
        {
          appointmentOptions.map(option =>
            <AppointmentOption
              key={option._id}
              option={option}
              setTreatment={setTreatment}
            >
            </AppointmentOption>
          )
        }
      </div>
      {
        treatment &&
        <BookingModal
          treatment={treatment}
          setTreatment={setTreatment}
          selectedDate={selectedDate}
        ></BookingModal>
      }
    </section>
  );
};

export default AvailableAppointments;