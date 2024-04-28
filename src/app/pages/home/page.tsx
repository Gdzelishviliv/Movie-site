"use client";
import MainLayout from "@/app/layouts/mainLayout/MainLayout";
import useFetchData from "@/app/utils/useFetch";
import { Spinner } from "@nextui-org/spinner";
import Image from "next/image";
import { Navigation, Scrollbar, A11y } from "swiper/modules";
import "./home.css"
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

export default function page() {
  const { data, loading, error } = useFetchData(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error fetching movies</div>;
  }
  if (!data || !data.results) {
    return <div>No data available.</div>;
  }
  return (
    <MainLayout>
      <h2 className="text-white text-xl">Trending</h2>
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={8}
        slidesPerView={5.8}
        navigation
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <div className="flex">
          {data.results.map((movie:any) => (
            <SwiperSlide className="custom-slide" key={movie.id}>
              <span className="movie-name" key={movie.id}>{movie.title}</span>
              <Image
              className="rounded-lg"
                src={`https://image.tmdb.org/t/p/original${
                  movie ? movie.poster_path : ""
                }`}
                alt="movie-image"
                width={240}
                height={140}
              ></Image>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </MainLayout>
  );
}