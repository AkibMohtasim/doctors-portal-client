import React from 'react';
import quote from '../../../assets/icons/quote.svg';
import people1 from '../../../assets/images/people1.png';
import people2 from '../../../assets/images/people2.png';
import people3 from '../../../assets/images/people3.png';
import Review from './Review';

const Testimonial = () => {
  const reviews = [
    {
      _id: 1,
      name: 'Winson Herry',
      img: people1,
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, nobis quis. Delectus minima rem dolorum? Quia autem adipisci, quod, nihil rem ullam culpa nemo, consectetur ex repudiandae dolores recusandae! Inventore.',
      location: 'California'
    },
    {
      _id: 2,
      name: 'Winson Herry',
      img: people2,
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, nobis quis. Delectus minima rem dolorum? Quia autem adipisci, quod, nihil rem ullam culpa nemo, consectetur ex repudiandae dolores recusandae! Inventore.',
      location: 'California'
    },
    {
      _id: 3,
      name: 'Winson Herry',
      img: people3,
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, nobis quis. Delectus minima rem dolorum? Quia autem adipisci, quod, nihil rem ullam culpa nemo, consectetur ex repudiandae dolores recusandae! Inventore.',
      location: 'California'
    }
  ]


  return (
    <section className='my-16'>
      <div className='flex justify-between'>
        <div>
          <h4 className='text-xl text-primary font-bold'>Testimonial</h4>
          <h2 className='text-4xl'>What Our Patients Say</h2>
        </div>
        <figure>
          <img className='w-24 lg:w-48' src={quote} alt="" />
        </figure>
      </div>

      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {
          reviews.map(review =>
            <Review
              key={review._id}
              review={review}
            >

            </Review>)
        }
      </div>
    </section>
  );
};

export default Testimonial;