import React from 'react';
import Image from 'next/image';

interface IMoviesList {
  title: string;
  poster_path: string;
}

const MoviesList: React.FC<IMoviesList> = ({ title, poster_path }) => {
  const imagePath = 'https://image.tmdb.org/t/p/original';
  return (
    <div className='container'>
      <div className='card'>
        <Image src={imagePath + poster_path} alt={title} width={220} height={330} priority={true} />
        <div className='card_b'>
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
};
export default MoviesList;
