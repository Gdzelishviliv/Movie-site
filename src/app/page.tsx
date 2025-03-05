"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "./config/firebase";
import MainLayout from "@/app/layouts/mainLayout/MainLayout";
import useFetch from "@/app/utils/useFetch";
import Image from "next/image";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import "./globals.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import Recomendations from "./components/recomended/Recomendations";
import Effect from "./layouts/enteranceAnimation/enteranceAnimation";
import CustomCursor from "@/app/components/customCursor/customCursor";
import HowerWrapper from "@/app/components/customCursor/howerWrapper";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
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

  const middleSlideIndex = Math.floor(data.results.length / 2);

  return (
    <main>
      <Effect />
      <CustomCursor />
      <MainLayout>
        <input
          className="search-input border-white focus:border-[#FC4747] focus:ring-0 transition-colors duration-700"
          type="search"
          name="search"
          id="search"
          placeholder="Search for movies or TV series"
        />
        <HowerWrapper>
          <h2 className="text-xl px-4 mt-6 hover:text-white pl-5 text-[#FC4747] duration-700 text-[18px] lg:text-[20px] xl:text-[22px] relative transition-all hover:translate-y-0 hover:z-50">Trending</h2>
        </HowerWrapper>
        <Swiper
          effect="slide"
          navigation={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          centeredSlides={true}
          slidesPerView="auto"
          initialSlide={middleSlideIndex}
          modules={[Navigation, EffectCoverflow, Autoplay]}
          className="mySwiper"
        >
          {data.results.map((movie) => (
            <SwiperSlide className="custom-slide" key={movie.id}>
              <span className="movie-name">{movie.title}</span>
              <Image
                className="rounded-lg"
                src={`https://image.tmdb.org/t/p/original${
                  movie ? movie.poster_path : ""
                }`}
                alt="movie-image"
                width={240}
                height={140}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <HowerWrapper>
          <h1 className="hover:text-white pl-4 text-[#FC4747] duration-700 text-[18px] lg:text-[20px] xl:text-[22px] relative transition-all hover:translate-y-0 hover:z-50">
            Recommended for you
          </h1>
        </HowerWrapper>
        <Recomendations />
      </MainLayout>
    </main>
  );
}
