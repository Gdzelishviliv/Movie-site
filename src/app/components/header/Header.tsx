import Image from 'next/image'
import React from 'react'
import "./header.css"
import Link from 'next/link'

const Header = () => {
  return (
    <div className='header-container flex justify-between'>
        <Link href="/pages/home"><Image src="/assets/Movie.svg" alt='site logo' width={25} height={20}/></Link>
        <div>
            <ul className='flex gap-5'>
                <Link href="/pages/home">home</Link>
                <Link href="/pages/movies">movies</Link>
                <Link href="/pages/tv-series">tv series</Link>
                <Link href="/pages/bookmarks">bookmarks</Link>
            </ul>
        </div>
        <Image src="/assets/profile.svg"alt='' width={24} height={24}/>
    </div>
  )
}

export default Header