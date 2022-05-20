import React from "react";
import axios from "axios";
import Link from "next/link";

const index = ({ trendingMovieData }) => {
  return (
    <>
      <section>
        {trendingMovieData.map(({ title, poster_path, id }) => (
          <article key={id}>
            <Link href={`/movies/${id}`}>
              <a>
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={title}
                />
                <h1>{title}</h1>
              </a>
            </Link>
          </article>
        ))}
      </section>
    </>
  );
};

export default index;

export async function getStaticProps() {
  const apiKey = "4ab6d68d0efde78e9ac01b6d79371221";
  const baseUrl = "https://api.themoviedb.org/3";
  const apiEndpoint = "/trending/movie/week";
  const ApiUrl =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=4ab6d68d0efde78e9ac01b6d79371221";
  const {
    data: { results: trendingMovieData },
  } = await axios(ApiUrl);
  return {
    props: { trendingMovieData },
    revalidate: 60,
  };
}
