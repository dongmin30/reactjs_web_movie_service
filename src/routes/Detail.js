import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetail from "../component/MovieDetail";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movieDetail, setMovieDetail] = useState();
  const { id } = useParams();
  const getMovie = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    const json = await response.json();
    setMovieDetail(json.data.movie);
    setLoading(false)
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <MovieDetail movieData={movieDetail} />
        </div>
      )}
    </div>
  )
}

export default Detail;
