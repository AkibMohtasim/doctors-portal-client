import { format } from 'date-fns';
import React, { useState } from 'react';
import AppointmentOption from './AppointmentOption';
import BookingModal from '../BookingModal/BookingModal';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';

const AvailableAppointments = ({ selectedDate }) => {

  // const [appointmentOptions, setAppointmentOptions] = useState([]);
  const [treatment, setTreatment] = useState(null);

  const date = format(selectedDate, 'PP');

  const { data: appointmentOptions = [], refetch, isLoading } = useQuery({
    queryKey: ['appointmentOptions', date],
    queryFn: async () => {
      const res = await fetch(`https://doctors-portal-server-eosin-xi.vercel.app/api/appointmentOptions?date=${date}`);
      const data = await res.json();
      return data;
    }
  })

  if (isLoading) {
    return <Loading />
  }

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
          refetch={refetch}
          setTreatment={setTreatment}
          selectedDate={selectedDate}
        ></BookingModal>
      }
    </section>
  );
};

export default AvailableAppointments;