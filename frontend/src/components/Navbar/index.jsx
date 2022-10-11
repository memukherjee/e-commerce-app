import React from 'react'

export default function Navbar({setMouseOverNavItem}) {
    

  return (
    <nav className='flex justify-between px-32 align-middle fixed top-0 w-full z-20'>
        <a className="nav-brand flex align-middle gap-x-3" href='/'>
            <span className="brand-logo flex align-middle">
              <i className="fa-solid fa-hat-cowboy-side fa-2x"></i>
            </span>
            <span className="brand-name font-pen text-2xl whitespace-nowrap font-semibold">Oracle Couture</span>
        </a>
        <ul className="nav-items flex justify-center align-middle gap-x-5">
            <li className="nav-item flex align-middle px-4" onMouseOver={()=>setMouseOverNavItem(true)} onMouseLeave={()=>setMouseOverNavItem(false)}>
                <a className='my-auto hover:text-white transition-all' href="/">Home</a>
            </li>
            <li className="nav-item flex align-middle px-4" onMouseOver={()=>setMouseOverNavItem(true)} onMouseLeave={()=>setMouseOverNavItem(false)}>
                <a className='my-auto hover:text-white transition-all' href="/">Category</a>
            </li>
            <li className="nav-item flex align-middle px-4" onMouseOver={()=>setMouseOverNavItem(true)} onMouseLeave={()=>setMouseOverNavItem(false)}>
                <a className='my-auto hover:text-white transition-all' href="/">About</a>
            </li>
            <li className="nav-item flex align-middle px-4" onMouseOver={()=>setMouseOverNavItem(true)} onMouseLeave={()=>setMouseOverNavItem(false)}>
                <a className='my-auto hover:text-white transition-all' href="/login">Log in</a>
            </li>
            <li className="nav-item flex align-middle px-4"  onMouseOver={()=>setMouseOverNavItem(true)} onMouseLeave={()=>setMouseOverNavItem(false)}>
                <a className='my-auto border px-3 border-black rounded-xl whitespace-nowrap hover:border-white hover:text-white transition-all' href="/">Contact Us</a>
            </li>
        </ul>
    </nav>
  )
}
