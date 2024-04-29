import useFetch from "@/app/utils/useFetch";
import Image from "next/image";
import React from "react";
import "./recomendations.css";

const Recomendations = () => {
  const { data, loading, error } = useFetch(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1"
  );
  if (loading) {
    return <span>...loading</span>;
  }
  if (error) {
    return <span>Error fetching movies</span>;
  }
  if (!data || !data.results) {
    return <div>No data available.</div>;
  }
  return (
    <div className="recomendations">
      {data.results.map((movie: any) => (
        <div
          key={movie.id}
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt=""
            width={164}
            height={110}
            style={{ width: "auto", height: "auto" }}
          ></Image>
          <span className="movie-title">{movie.title}</span>
        </div>
      ))}
    </div>
  );
};

export default Recomendations;
