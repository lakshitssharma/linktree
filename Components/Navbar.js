"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from "next/navigation";



const Navbar = () => {
  const pathname = usePathname()
  const showNavbar = ["/","/generate"].includes(pathname)

  return ( <>{showNavbar && <nav className='bg-white flex justify-between w-[90vw] fixed top-10 right-[5vw] rounded-full p-4 px-7'>
    <div className="logo flex gap-20 items-center">
      <Link href='/'><img className='h-6 px-2 nav-desktop-logo' loading="eager" src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg" alt=""></img></Link>

      <ul className='flex gap-8 font-sans'>
       <Link href="https://linktr.ee/products/link-tools/link-in-bio" target='_blank'> <li>Products</li></Link>
       <Link href="https://linktr.ee/marketplace" target='_blank'> <li>MarketPlace</li></Link>
       <Link href="https://linktr.ee/s/templates" target='_blank'> <li>Templates</li></Link>
       <Link href="https://linktr.ee/blog" target='_blank'> <li>Learn</li></Link>
       <Link href="https://linktr.ee/s/pricing" target='_blank'> <li>Pricing</li></Link>
      </ul>
    </div>
    <div className='flex gap-2'>
    <button className="login bg-gray-300 p-4 rounded-lg">Log in</button>
    <button className="signup bg-gray-900 text-white p-4 rounded-full">Sign up free</button>
    </div>
   </nav>}</>
  )
}

export default Navbar
