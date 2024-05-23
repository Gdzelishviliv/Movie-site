"use client"
import React, { useState, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './header.css';

const Header = () => {
  
  const [activeLink, setActiveLink] = useState('/pages/home');

  const handleLinkClick = (link:any) => {
    setActiveLink(link);
  };

  return (
    <div className='header-container sticky-header flex justify-between'>
      <Link href="/">
        <Image src="/assets/Movie.svg" alt='site logo' width={25} height={20} style={{ width: "auto", height: "auto" }}/>
      </Link>
      <div>
        <ul className='flex gap-10'>
          <Link href="/" onClick={() => handleLinkClick('/')}>
            <button className={`home-btn ${activeLink === '/' ? 'focused' : ''}`}></button>
          </Link>
          <Link href="/pages/movies" onClick={() => handleLinkClick('/pages/movies')}>
            <button className={`movie-btn ${activeLink === '/pages/movies' ? 'focused' : ''}`}></button>
          </Link>
          <Link href="/pages/tv-series" onClick={() => handleLinkClick('/pages/tv-series')}>
            <button className={`series-btn ${activeLink === '/pages/tv-series' ? 'focused' : ''}`}></button>
          </Link>
          <Link href="/pages/bookmarks" onClick={() => handleLinkClick('/pages/bookmarks')}>
            <button className={`bookmark-btn ${activeLink === '/pages/bookmarks' ? 'focused' : ''}`}></button>
          </Link>
        </ul>
      </div>
      <Image src="/assets/profile.svg" alt='' width={24} height={24}/>
    </div>
  );
};

export default memo(Header);
