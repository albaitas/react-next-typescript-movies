import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/MovieDetails.module.css';
import { GetStaticProps, GetStaticPaths } from 'next';

interface IMovieId {
  id: string;
}
interface IMovie {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    backdrop_path: string;
    overview: string;
    homepage: string;
    runtime: string;
    genres: [
      {
        name: string;
      }
    ];
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=d5c35e51c81488b19da7c1f572507a3d');
  const data = await res.json();

  const paths = data.results.map((movie: IMovieId) => {
    return {
      params: { id: movie.id.toString() }
    };
  });

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;

  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=d5c35e51c81488b19da7c1f572507a3d`);
  const data = await res.json();
  return {
    props: { movie: data }
  };
};

const MovieDetails: React.FC<IMovie> = ({ movie }) => {
  const imagePath = 'https://image.tmdb.org/t/p/original';
  return (
    <>
      <Head>
        <title>Movie details</title>
        <meta name='title' content='Movie details' />
      </Head>

      <div className={styles.product}>
        <div className={styles.product_img}>
          <Image src={imagePath + movie.backdrop_path} alt={movie.title} width={500} height={375} priority={true} />
        </div>
        <div className={styles.product_listing}>
          <div>
            <span>{movie.release_date}</span>
            <br />

            <h3 className={styles.name}>{movie.title}</h3>
            <p>{movie.overview}</p>
            <span className={styles.gel}>{movie.genres[0].name}</span>
            <br />
            <span>{movie.runtime} minutes</span>

            <p className={styles.mel}>{movie.homepage}</p>
          </div>
        </div>
      </div>
      <div className='container text-end'>
        <Link href='/movies'>
          <h3>Back</h3>
        </Link>
      </div>
    </>
  );
};

export default MovieDetails;
