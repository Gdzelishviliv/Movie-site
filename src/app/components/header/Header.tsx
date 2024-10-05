"use client";
import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './header.css';

const Header = () => {
  const pathname = usePathname();

  return (
    <div className='header-container sticky-header flex justify-between'>
      <Link href="/" passHref>
        <Image src="/assets/Movie.svg" alt='site logo' width={25} height={20} style={{ width: "auto", height: "auto" }}/>
      </Link>
      <div>
        <ul className='flex gap-10'>
          <Link href="/" passHref>
            <button className={`home-btn ${pathname === '/' ? 'focused' : ''}`}></button>
          </Link>
          <Link href="/pages/movies" passHref>
            <button className={`movie-btn ${pathname === '/pages/movies' ? 'focused' : ''}`}></button>
          </Link>
          <Link href="/pages/tv-series" passHref>
            <button className={`series-btn ${pathname === '/pages/tv-series' ? 'focused' : ''}`}></button>
          </Link>
          <Link href="/pages/bookmarks" passHref>
            <button className={`bookmark-btn ${pathname === '/pages/bookmarks' ? 'focused' : ''}`}></button>
          </Link>
        </ul>
      </div>
      <Image src="/assets/profile.svg" alt='' width={24} height={24}/>
    </div>
  );
};

export default memo(Header);
