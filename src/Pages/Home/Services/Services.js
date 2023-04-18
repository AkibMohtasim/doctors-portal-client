import React from 'react';
import flouride from '../../../assets/images/fluoride.png';
import cavity from '../../../assets/images/cavity.png';
import teeth from '../../../assets/images/whitening.png';
import Service from './Service';

const Services = () => {

  const servicesData = [
    {
      id: 1,
      name: 'Flouride Treatment',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident praesentium corrupti placeat dolorum unde illum impedit explicabo eaque dignissimos odio',
      img: flouride
    },
    {
      id: 2,
      name: 'Cavity Filling',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident praesentium corrupti placeat dolorum unde illum impedit explicabo eaque dignissimos odio',
      img: cavity
    },
    {
      id: 3,
      name: 'teeth Whitening',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident praesentium corrupti placeat dolorum unde illum impedit explicabo eaque dignissimos odio',
      img: teeth
    },
  ]

  return (
    <div className='mt-16'>
      <div className='text-center'>
        <h3 className='text-xl font-bold text-primary uppercase'>Our Services</h3>
        <h2 className='text-3xl'>Services We Provide</h2>
      </div>
      <div className='grid grid-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {
          servicesData.map(service =>
            <Service
              key={service.id}
              service={service}
            >

            </Service>
          )
        }
      </div>
    </div>
  );
};

export default Services;