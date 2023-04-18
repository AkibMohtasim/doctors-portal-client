import React from 'react';
import clock from '../../../assets/icons/clock.svg';
import marker from '../../../assets/icons/marker.svg';
import phone from '../../../assets/icons/phone.svg';
import InfoCard from './InfoCard';

const InfoCards = () => {
  const cardData = [
    {
      id: 1,
      name: 'Opening Hours',
      description: '9 am - 5 pm',
      icon: clock,
      bgClass: 'bg-gradient-to-r from-primary to-secondary'
    },
    {
      id: 2,
      name: 'Our Locations',
      description: '9 am - 5 pm',
      icon: marker,
      bgClass: 'bg-secondary'
    },
    {
      id: 3,
      name: 'Opening Hours',
      description: '9 am - 5 pm',
      icon: phone,
      bgClass: 'bg-gradient-to-r from-primary to-secondary'
    }
  ]
  return (
    <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8'>
      {
        cardData.map(card =>
          <InfoCard
            key={card.key}
            card={card}
          >

          </InfoCard>)
      }
    </div>
  );
};

export default InfoCards;