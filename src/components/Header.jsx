import React from 'react'

export default function Header() {
  return (
    <header>
        <img src="logo.png" alt="My Store Logo"/>
        <span style={{fontSize: "1.5rem"}}>My Store</span>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/products" className="hover:underline">Products (SSG)</a></li>
            <li><a href="/ssr-page" className="hover:underline">SSR Page</a></li>
            <li><a href="/ssg-page" className="hover:underline">SSG Page</a></li>
          </ul>
        </nav>
    </header>
  )
}