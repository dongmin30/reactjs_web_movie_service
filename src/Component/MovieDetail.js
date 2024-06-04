import PropTypes from "prop-types";

function MovieDetail({ movieData }) {
  return (
    <div>
      <img src={movieData.medium_cover_image} alt={movieData.title} />
      <h1>{movieData.title}</h1>
      <h3>language : {movieData.language}</h3>
      <p>{movieData.description_full}</p>
      <ul>
        {movieData.genres.map((g, index) => (
          <li key={index}>{g}</li>
        ))}
      </ul>
    </div>
  );
}

MovieDetail.prototype = {
  movieData: PropTypes.object.isRequired,
}

export default MovieDetail;