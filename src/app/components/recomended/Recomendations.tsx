import useFetch from "@/app/utils/useFetch";
import Image from "next/image";
import React, {useState} from "react";
import "./recomendations.css";
import Link from "next/link";
import {motion} from "framer-motion";

const Recomendations = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useFetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${page}`
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
  const changePage = (newPage: number) => {
    if (newPage > 0 && newPage <= data.total_pages) {
      setPage(newPage);
    }
  }
  console.log(data);

  return (
      <div>
        <Link href='/pages/movie' passHref>
          <div className="recomendations">
            {data.results.map((movie: any) => (
                <motion.div
                    key={movie.id}
                    className="movie-div"
                    style={{ position: 'relative', width: '100%', height: '100%' }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                >
                  <Image
                      className="rounded-lg"
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt=""
                      width={164}
                      height={110}
                  />
                  <div>
          <span className="text-[#FFFFFF] opacity-75 text-[11px]">
            {new Date(movie.release_date).getFullYear()}
          </span>
                  </div>
                  <motion.span
                      className="movie-title"
                      whileHover={{
                        transition: { duration: 0.3 },
                      }}
                  >
                    {movie.title}
                  </motion.span>
                </motion.div>
            ))}
          </div>
        </Link>
        <div className={"pagination mb-[30px]"}>
          <button
              className="page-button transition-all duration-500 hover:bg-[#FC4747] active:scale-95 focus:outline-none"
              onClick={() => changePage(page - 1)}
              disabled={page === 1}
          >
            Prev
          </button>
          <span className="text-white w-[40px] text-center">{page}</span>
          <button
              className="page-button transition-all duration-500 hover:bg-[#FC4747] active:scale-95 focus:outline-none"
              onClick={() => changePage(page + 1)}
              disabled={page === data.total_pages}
          >
            Next
          </button>
        </div>
      </div>

  );
};

export default Recomendations;
