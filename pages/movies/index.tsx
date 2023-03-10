import Head from 'next/head';
import MoviesList from '../../components/MoviesList';
import Link from 'next/link';

interface IMovies {
  movies: {
    results: [
      {
        id: string;
        title: string;
        poster_path: string;
        release_date: string;
      }
    ];
  };
}

export const getStaticProps = async () => {
  const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=d5c35e51c81488b19da7c1f572507a3d');
  const data = await res.json();

  if (!data) {
    return {
      notFound: true
    };
  }
  return {
    props: { movies: data }
  };
};

const Movies: React.FC<IMovies> = ({ movies }) => {
  return (
    <div>
      <Head>
        <title>Movies</title>
        <meta name='title' content='Movies list' />
      </Head>

      <div className='page_wrapper'>
        {movies &&
          movies.results.map((movie) => (
            <div key={movie.id}>
              <Link href={`/movies/${movie.id}`}>
                <MoviesList title={movie.title} poster_path={movie.poster_path} />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Movies;
