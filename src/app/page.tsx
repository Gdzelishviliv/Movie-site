"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "./config/firebase";
import MainLayout from "@/app/layouts/mainLayout/MainLayout";
import useFetch from "@/app/utils/useFetch";
import Image from "next/image";
import { Navigation, Scrollbar, A11y } from "swiper/modules";
import "./globals.css"
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import Recomendations from "./components/recomended/Recomendations";
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    console.log(auth.currentUser);
    if (!auth.currentUser) {
      router.push("/pages/login");
    }
  }, [router]);

  const { data, loading, error } = useFetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
  );

  if (loading) {
    return <span>...loading</span>;
  }

  if (error) {
    return <div>Error fetching movies</div>;
  }
  if (!data || !data.results) {
    return <div>No data available.</div>;
  }

  {
    return (
      <main>
        <MainLayout>
          <input className="search-input" type="search" name="search" id="search" placeholder="Search for movies or TV series" />
          <h2 className="text-white text-xl px-4">Trending</h2>
          <Swiper
            modules={[Navigation, Scrollbar, A11y]}
            spaceBetween={8}
            slidesPerView={5.8}
            navigation
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            breakpoints={{
              375: {
                slidesPerView:1.5,
                spaceBetween: 15,
              },
              600: {
                slidesPerView: 3.5,
                spaceBetween: 15,
              },
              1280: {
                slidesPerView: 5.8,
                spaceBetween: 8,
              },
            }}
          >
            <div className="flex">
              {data.results.map((movie: any) => (
                <SwiperSlide className="custom-slide" key={movie.id}>
                  <span className="movie-name" key={movie.id}>
                    {movie.title}
                  </span>
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
          <h1 className="text-white text-xl px-4 my-6">Recommended for you</h1>
          <Recomendations/>
        </MainLayout>
      </main>
    );
  }
}
