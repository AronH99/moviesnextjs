import React from "react";
import axios from "axios";
import Link from "next/link";

const movieDetail = ({
  movieDetail: { original_title, backdrop_path, overview, genres, id },
}) => {
  return (
    <>
      <article key={id} className="customarticle">
        <a>
          <img
            src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
            alt={original_title}
          />
          <h1>{original_title}</h1>
          <p>{overview}</p>
          <p>{genres.map((genre) => genre.name).join("/")}</p>
        </a>
        <Link href={`/movies`}>
          <button>Go Back</button>
        </Link>
      </article>
    </>
  );
};

export default movieDetail;

export async function getStaticPaths() {
  const ApiUrl =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=4ab6d68d0efde78e9ac01b6d79371221";
  const {
    data: { results: trendingMovieData },
  } = await axios(ApiUrl);
  return {
    paths: trendingMovieData.map(({ id: movieId }) => ({
      params: { movieId: movieId.toString() },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps(ctx) {
  const {
    params: { movieId },
  } = ctx;
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=4ab6d68d0efde78e9ac01b6d79371221`;
  const { data: movieDetail } = await axios(apiUrl);
  return {
    props: { movieDetail },
    revalidate: 60 * 60,
  };
}
